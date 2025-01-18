import connectToDb from "@/configs/db";
import productModel from "@/models/product";
import { useRevalidatePage } from "@/utils/useRevalidatePage";


export async function POST(req) {
  try {
    const { searchParam, filter } = await req.json();
    const search = decodeURIComponent(searchParam).trim();
    connectToDb();

    let productArray = [];

    const mainCategories = [
      "همه محصولات",
      "نرم افزار و فناوری اطلاعات",
      "اقتصاد و حسابداری",
      "کسب و کار",
      "کودک و نوجوان",
      "اموزش زبان",
      "هنر طراحی",
    ];

    if (mainCategories.includes(search)) {
      if (search === "همه محصولات") {
        productArray = await productModel.find({ status: "publish" });
      } else {
        productArray = await productModel.find({
          status: "publish",
          group: search,
        });
      }
    } else {
      productArray = await productModel
        .find({
          $or: [
            { tags: { $regex: new RegExp(search, "i") } },
            { title: { $regex: new RegExp(search, "i") } },
          ],
        })
        .populate("author", "name")
        .select("group title cover duration sellCount price discount author");
    }

    if (filter === "freeProducts") {
      productArray = productArray.filter((item) => item.price === 0);
    } else if (filter === "bestSellers") {
      productArray = productArray.sort((a, b) => b.sellCount - a.sellCount);
    } else if (filter === "cheapest") {
      productArray = productArray.sort((a, b) => a.price - b.price);
    } else if (filter === "expensive") {
      productArray = productArray.sort((a, b) => b.price - a.price);
    }

    useRevalidatePage()

    return new Response(JSON.stringify({ status: 200, data: productArray }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "اینترنت خود را چک کنید", status: 500 }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
