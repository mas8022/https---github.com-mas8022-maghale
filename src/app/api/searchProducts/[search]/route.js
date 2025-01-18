import productModel from "@/models/product";
import { useRevalidatePage } from "@/utils/useRevalidatePage";

export async function GET(req, { params }) {
  try {
    const textSearch = params.search;

    const products = await productModel.find({
      title: { $regex: textSearch, $options: "i" },
    }).populate("author", "name")
    
    useRevalidatePage();

    return new Response(JSON.stringify(products));
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "اینترنت خود را چک کنید",
        status: 500,
      })
    );
  }
}
