import connectToDb from "@/configs/db";
import userModel from "@/models/user";
import { generateRefreshToken, generateToken } from "@/utils/authTools";
import CloudStoringFile from "@/utils/cloudStoringFile";
import { MeId } from "@/utils/me";
import { useRevalidatePage } from "@/utils/useRevalidatePage";

import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const file = formData.get("file");

    

    let fileAddress = null;
    if (!!file) {
      fileAddress = await CloudStoringFile(file);
    }

    connectToDb();
    const userId = await MeId();

    if (!userId) {
      return Response.json({ message: "همچین کاربری وجود ندارد", status: 404 });
    }

    const refreshToken = generateRefreshToken(
      { email },
      process.env.refreshPrivateKey
    );

    if (fileAddress) {
      await userModel.findOneAndUpdate(
        { _id: userId },
        {
          fullName,
          email,
          phone,
          refreshToken,
          profile: fileAddress,
        }
      );
    } else {
      await userModel.findOneAndUpdate(
        { _id: userId },
        {
          fullName,
          email,
          phone,
          refreshToken,
        }
      );
    }

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
      message: "با موفقیت حساب کاربریتان ویرایش شد",
      status: 200,
    });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
