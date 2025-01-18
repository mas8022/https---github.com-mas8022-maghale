import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import userModel from "../models/user";
import {
  generateToken,
  verifyRefreshToken,
  verifyToken,
} from "@/utils/authTools";
import connectToDb from "@/configs/db";

async function VerifyManager() {
  const refreshToken = cookies().get("refresh-token")?.value;
  if (!refreshToken) {
    return redirect("/login");
  }

  const refreshTokenPayLoad = verifyRefreshToken(
    refreshToken,
    process.env.refreshPrivateKey
  );
  if (!refreshTokenPayLoad) {
    return redirect("/login");
  }

  await connectToDb();
  const user = await userModel.findOne({ refreshToken }, "email roll");
  const userRoll = user?.roll;
  if (userRoll !== "ADMIN") {
    return notFound();
  }

  const token = cookies().get("token")?.value;
  if (token) {
    const validationToken = verifyToken(token, process.env.privateKey);
    if (validationToken) {
      return userRoll ? userRoll : false;
    }
  }

  const userEmail = user?.email;
  if (!userEmail) {
    return redirect("/login");
  }

  const newToken = generateToken({ userEmail }, process.env.privateKey);
  cookies().set("token", newToken, {
    httpOnly: true,
    path: "/",
  });
}

export default VerifyManager;
