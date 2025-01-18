import connectToDb from "@/configs/db";
import AuthorReceiveMessageModel from "@/models/AuthorReceiveMessage";
import { GetAuthorId } from "@/utils/author";
import { useRevalidatePage } from "@/utils/useRevalidatePage";

export async function GET() {
  try {
    connectToDb();
    const authorId = await GetAuthorId();

    const messages = await AuthorReceiveMessageModel.find(
      {
        author: authorId,
        seen: false,
      },
      "_id"
    );

    const messageLength = messages.length;
    
    useRevalidatePage();

    return Response.json({ data: messageLength, status: 200 });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
