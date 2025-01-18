export default function useDiscountPrice(price, discount) {
  const discountPrice = (price * (100 - discount)) / 100;
  return discountPrice;
}
