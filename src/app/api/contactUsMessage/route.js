
import { useRevalidatePage } from "@/utils/useRevalidatePage";
import connectToDb from "../../../../configs/db";
import ContactUsMessageModel from "../../../../models/contactUsMessage";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const group = formData.get("group");
    const phone = formData.get("phone");
    const message = formData.get("message");

    connectToDb();
    await ContactUsMessageModel.create({
      fullName,
      email,
      group,
      phone,
      message,
      isAnswer: false,
    });

    useRevalidatePage()
    
    return Response.json({
      message:
        "پیامتان فرستاده شد پاسخ پیام نهایتا تا فردا از طریق پیامک به شما داده خواهد شد با تشکر",
      status: 201,
    });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
