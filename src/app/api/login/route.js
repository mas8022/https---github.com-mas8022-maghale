import { cookies } from "next/headers";
import connectToDb from "../../../../configs/db";
import userModel from "../../../../models/user";
import {
  generateRefreshToken,
  generateToken,
  verifyPassword,
} from "../../../../utils/authTools";
import { useRevalidatePage } from "@/utils/useRevalidatePage";


export async function POST(req) {
  try {
    connectToDb();
    const { email, password } = await req.json();

    const user = await userModel.findOne({ email });
    if (!user) {
      return Response.json({
        message: "شما از قبل ثبت نام نکردید",
        status: 401,
      });
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return Response.json({
        message: "رمز عبور شما نا معتبر است",
        status: 401,
      });
    }

    const refreshToken = generateRefreshToken(
      { email },
      process.env.refreshPrivateKey
    );

    await userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          refreshToken,
        },
      }
    );

    const newAccessToken = generateToken({ email }, process.env.privateKey);

    cookies().set("token", newAccessToken, {
      httpOnly: true,
      path: "/",
    });

    cookies().set("refresh-token", refreshToken, {
      httpOnly: true,
      path: "/",
      expires: new Date().getTime() + 15 * 24 * 60 * 60 * 1000,
    });

    useRevalidatePage()
    
    return Response.json({
      message: "با موفقیت وارد حساب قبل خود شدید",
      status: 200,
    });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
