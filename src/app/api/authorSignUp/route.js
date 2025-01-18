import {
  generateRefreshToken,
  generateToken,
  hashPassword,
} from "../../../../utils/authTools";
import CloudStoringFile from "../../../../utils/cloudStoringFile";
import { cookies } from "next/headers";
import connectToDb from "../../../../configs/db";
import authorModel from "@/models/author";
import { useRevalidatePage } from "@/utils/useRevalidatePage";

const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const password = formData.get("password");
    const job = formData.get("job");
    const ruleImage = formData.get("ruleImage");

    connectToDb();
    const authorEmail = await authorModel.findOne({ email }, "_id");

    if (authorEmail) {
      return Response.json(
        { message: "این ادرس ایمیل قبلا ثبت نام شده است" },
        { status: 403 }
      );
    }

    if (!emailRegex.test(email)) {
      return Response.json(
        { message: "لطفا ایمیل صحیح وارد نمایید" },
        { status: 403 }
      );
    } else if (password.length > 15 || password.length < 8) {
      return Response.json(
        { message: "رمز عبور شما باید بین 8 تا 15 کاراکتر داشته باشد" },
        { status: 403 }
      );
    } else if (!ruleImage) {
      return Response.json(
        { message: "عکس قوانین تایید شده را بارگذاری کنید" },
        { status: 403 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const fileAddress = await CloudStoringFile(ruleImage);

    const token = generateToken({ email }, process.env.authorPrivateKey);
    const refreshToken = generateRefreshToken(
      { email },
      process.env.authorRefreshPrivateKey
    );

    cookies().set("author-token", token, {
      httpOnly: true,
      path: "/",
    });
    cookies().set("author-refresh-token", refreshToken, {
      httpOnly: true,
      path: "/",
      expires: new Date().getTime() + 15 * 24 * 60 * 60 * 1000,
    });

    await authorModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      ruleImage: fileAddress,
      job,
      bio: " ",
      profile: " ",
      permission: false,
      refreshToken,
    });

    useRevalidatePage()

    return Response.json({
      message: "author signup successfully",
      status: 201,
    });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
