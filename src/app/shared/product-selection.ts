import { Product } from './product.model';

/**
 * Represents a user's placement of a product in their cart, including that quantity of that product in the cart.
 */
export interface ProductSelection {
  product: Product;
  quantity: number;
}
