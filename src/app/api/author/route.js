import authorModel from "@/models/author";
import { Author, GetAuthorId } from "@/utils/author";
import CloudStoringFile from "@/utils/cloudStoringFile";
import { useRevalidatePage } from "@/utils/useRevalidatePage";


export async function GET() {
  try {
    let author = await Author();
    author = {
      profile: author?.profile,
      name: author.name,
      email: author.email,
      phone: author.phone,
    };

    useRevalidatePage();


    return Response.json({ status: 200, data: author });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}

export async function POST(req) {
  try {
    let authorId = await GetAuthorId();

    const formData = await req.formData();

    const name = formData?.get("name");
    const email = formData?.get("email");
    const phone = formData?.get("phone");
    const file = formData?.get("file");

    const profile = await CloudStoringFile(file);

    await authorModel.findOneAndUpdate(
      { _id: authorId },
      {
        name,
        email,
        phone,
        profile,
      }
    );

    useRevalidatePage()
    return Response.json({ message: "با موفقیت انجام شد", status: 200 });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
