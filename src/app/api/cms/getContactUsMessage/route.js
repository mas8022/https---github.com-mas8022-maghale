import connectToDb from "@/configs/db";
import contactUsMessage from "@/models/contactUsMessage";
import { useRevalidatePage } from "@/utils/useRevalidatePage";

export async function GET() {
  try {
    connectToDb();
    const messages = await contactUsMessage.find({ isAnswer: false }, "_id").lean();
    const messagesLength = messages.length;

    useRevalidatePage();


    return Response.json(messagesLength);
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
