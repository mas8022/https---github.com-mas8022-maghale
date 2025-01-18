import { cookies } from "next/headers";
import connectToDb from "../../../../configs/db";
import userModel from "../../../../models/user";
import {
  generateRefreshToken,
  generateToken,
  hashPassword,
} from "../../../../utils/authTools";
import { useRevalidatePage } from "@/utils/useRevalidatePage";
import { revalidatePath } from "next/cache";

const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

export async function POST(req) {
  try {
    connectToDb();
    const { fullName, email, password, phone, check } = await req.json();

    const userEmail = await userModel.findOne({ email });

    if (userEmail) {
      return Response.json(
        { message: "این ادرس ایمیل قبلا ثبت نام شده است" },
        { status: 403 }
      );
    }

    if (!fullName.trim() || !isNaN(fullName)) {
      return Response.json(
        { message: "نام تان را به درستی وارد کنید" },
        { status: 403 }
      );
    } else if (!emailRegex.test(email)) {
      return Response.json(
        { message: "ایمیل تان را به درستی وارد کنید" },
        { status: 403 }
      );
    } else if (password.length > 15 || password.length < 8) {
      return Response.json({
        message: "رمز عبور شما باید بین 8 تا 15 کاراکتر داشته باشد",
        status: 403,
      });
    } else if (isNaN(phone)) {
      return Response.json({
        message: "شماره موبایل تان را به درستی وارد کنید",
        status: 403,
      });
    } else if (!check) {
      return Response.json({
        message: "تیک تایید قوانین سایت را بزنید",
        status: 403,
      });
    }

    const hashedPassword = await hashPassword(password);
    const token = generateToken({ email }, process.env.privateKey);
    const refreshToken = generateRefreshToken(
      { email },
      process.env.refreshPrivateKey
    );

    const admin = await userModel.findOne({ roll: "ADMIN" }, "_id");

    await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      check,
      refreshToken,
      roll: !!admin ? "USER" : "ADMIN",
    });

    cookies().set("token", token, {
      httpOnly: true,
      path: "/",
    });
    cookies().set("refresh-token", refreshToken, {
      httpOnly: true,
      path: "/",
      expires: new Date().getTime() + 15 * 24 * 60 * 60 * 1000,
    });

    useRevalidatePage();
    revalidatePath("/cms/users");

    return Response.json({
      message: "ثبت نام شما با موفقیت انجام شد",
      status: 201,
    });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
