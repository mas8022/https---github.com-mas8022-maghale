const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
import {
  generateRefreshToken,
  generateToken,
  verifyPassword,
} from "../../../../utils/authTools";
import authorModel from "../../../../models/author";
import connectToDb from "../../../../configs/db";
import { cookies } from "next/headers";
import { useRevalidatePage } from "@/utils/useRevalidatePage";


export async function POST(req) {
  try {
    const formData = await req.formData();

    const email = formData.get("email");
    const password = formData.get("password");

    if (!emailRegex.test(email)) {
      return Response.json(
        { message: "لطفا ایمیل صحیح وارد نمایید" },
        { status: 401 }
      );
    } else if (password.length > 15 || password.length < 8) {
      return Response.json({
        message: "رمز عبور شما باید بین 8 تا 15 کاراکتر داشته باشد",
        status: 401,
      });
    }

    const author = await authorModel.findOne({ email }, "email password");
    if (!author) {
      return Response.json({
        message: "شما از قبل ثبت نام نکردید",
        status: 401,
      });
    }

    const isValidPassword = await verifyPassword(password, author.password);
    if (!isValidPassword) {
      return Response.json({
        message: "رمز عبور شما نا معتبر است",
        status: 401,
      });
    }

    const refreshToken = generateRefreshToken(
      { email },
      process.env.authorRefreshPrivateKey
    );

    connectToDb();
    await authorModel.findOneAndUpdate(
      { email },
      {
        $set: {
          refreshToken,
        },
      }
    );

    const newAccessToken = generateToken(
      { email },
      process.env.authorPrivateKey
    );

    await cookies().delete("author-token");
    cookies().set("author-token", newAccessToken, {
      httpOnly: true,
      path: "/",
    });

    await cookies().delete("author-refresh-token");
    cookies().set("author-refresh-token", refreshToken, {
      httpOnly: true,
      path: "/",
      expires: new Date().getTime() + 15 * 24 * 60 * 60 * 1000,
    });

    useRevalidatePage()

    return Response.json({ message: "با موفقیت وارد شدید", status: 200 });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
