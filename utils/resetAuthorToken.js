import { cookies } from "next/headers";
import { generateToken, verifyRefreshToken, verifyToken } from "./authTools";
import { redirect } from "next/navigation";
import connectToDb from "../configs/db";
import authorModel from "../models/author";

async function ResetAuthorToken() {
  const token = cookies().get("author-token")?.value;
  if (token) {
    const validationToken = verifyToken(token, process.env.authorPrivateKey);
    if (validationToken) {
      return true
    }
  }



  const refreshToken = cookies().get("author-refresh-token")?.value;
  if (!refreshToken) {
    return redirect("coWorker/employment");
  }

  const refreshTokenPayLoad = verifyRefreshToken(refreshToken, process.env.authorRefreshPrivateKey);
  if (!refreshTokenPayLoad) {
    return redirect("coWorker/employment");
  }

  await connectToDb();
  const email = await authorModel.findOne({ refreshToken }, "email");

  if (!email) {
    return redirect("coWorker/employment");
  }

  const newToken = generateToken({ email }, process.env.authorPrivateKey);

  cookies().set("author-token", newToken, {
    httpOnly: true,
    path: "/",
  });
}

export default ResetAuthorToken;
