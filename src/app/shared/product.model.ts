/**
 * Represents a product available for purchase.
 */
export interface Image {
  img_pro_id: any;
  img_product: any;
}

export interface Product {
  product_id: number;
  img_product: any;
  product_name: string;
  category_name: string;
  product_price: number;
  product_discount: number;
  product_quantity: number;
  product_description: string;
  images: Image[];
}
