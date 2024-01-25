import { List_Product_Images } from "./list_product_image";

export class List_Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdDate: Date;
  updatedDate: Date;
  images: List_Product_Images[];
  showcaseImage: string;
}
