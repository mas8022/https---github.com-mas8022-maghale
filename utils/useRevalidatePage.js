import { revalidatePath } from "next/cache";

const useRevalidatePage = () => {
  revalidatePath("/", "layout");
};

export { useRevalidatePage };
