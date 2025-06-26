interface ProductConstructor {
  id: number;
  name: string;
  price: number;
  costPrice: number;
  blueBlocks: number;
  redBlocks: number;
  greyBlocks: number;
  productionTime: number;
}

export default class Product {
  public id: number;
  public name: string;
  public price: number;
  public costPrice: number;
  public blueBlocks: number;
  public redBlocks: number;
  public greyBlocks: number;
  public productionTime: number;

  constructor({
    id,
    name,
    price,
    costPrice,
    blueBlocks,
    redBlocks,
    greyBlocks,
    productionTime
  }: ProductConstructor) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.costPrice = costPrice;
    this.blueBlocks = blueBlocks;
    this.redBlocks = redBlocks;
    this.greyBlocks = greyBlocks;
    this.productionTime = productionTime
  }
}
