import connectToDb from '@/configs/db'
import { memo } from 'react'
import productModel from '@/models/product'
const useGetProduct = memo(async(productId) => {
  connectToDb()
  const product = await productModel.findOne({_id: productId}, "-__v").populate("author")
  return product
})

export default useGetProduct