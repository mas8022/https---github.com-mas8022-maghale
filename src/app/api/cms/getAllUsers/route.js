import connectToDb from "@/configs/db";
import userModel from "@/models/user";
import { useRevalidatePage } from "@/utils/useRevalidatePage";

export async function GET() {
  try {
    connectToDb();
    const users = await userModel
      .find({ roll: "USER" }, "fullName email profile")
      .sort({ _id: -1 })
      .lean();

      useRevalidatePage();

    return Response.json(users);
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
