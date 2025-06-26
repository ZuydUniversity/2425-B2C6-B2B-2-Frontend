interface ProductConstructor {
  id: number;
  name: string;
  description: string;
  price: number;
  costPrice: number;
  stockQuantity: number;
}

export default class Product {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public costPrice: number;
  public stockQuantity: number;

  constructor({
    id,
    name,
    description,
    price,
    costPrice,
    stockQuantity,
  }: ProductConstructor) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.costPrice = costPrice;
    this.stockQuantity = stockQuantity;
  }
}
