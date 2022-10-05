// import { Ingredient } from '../shared/ingredient.model';

export class CartItem {
  public product_id: number;
  public product_name: string;
  public product_quantity: number;
  public product_price: number;
  public product_total: number;
//   public ingredients: Ingredient[];

  constructor(product_id: number, product_name: string, product_quantity: number, product_price: number) {
  // constructor(public name: string, public quantity: number, public price: number) {
    this.product_id = product_id;
    this.product_name = product_name;
    this.product_quantity = product_quantity;
    this.product_price = product_price;
    this.product_total = this.product_quantity * this.product_price;
  }
}
