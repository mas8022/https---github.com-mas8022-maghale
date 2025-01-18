import { useRevalidatePage } from "@/utils/useRevalidatePage";


const { cookies } = require("next/headers");

export async function POST() {
  try {

    cookies().delete("author-token");

    cookies().delete("author-refresh-token");

    useRevalidatePage()

    return Response.json({
      message: "با موفقیت از حساب تان خارج شدید",
      status: 200,
    });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
