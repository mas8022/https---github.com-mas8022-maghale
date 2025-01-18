import { useRevalidatePage } from "@/utils/useRevalidatePage";
import ResetToken from "../../../../utils/resetToken";

export async function GET() {
  try {
    const userRoll = await ResetToken();
    
    useRevalidatePage();

    return Response.json({
      message: "reset token success",
      status: 200,
      roll: userRoll,
    });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
