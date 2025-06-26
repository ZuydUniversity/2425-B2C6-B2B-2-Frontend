import Product from "./product.model";

interface QualityControlConstructor {
  id: number;
  productId: number;
  isApproved: boolean;
  comment: string;
  product: Product;
}

export default class QualityControl {
  public id: number;
  public productId: number;
  public isApproved: boolean;
  public comment: string;
  public product: Product;

  constructor({
    id,
    productId,
    isApproved,
    comment,
    product,
  }: QualityControlConstructor) {
    this.id = id;
    this.productId = productId;
    this.isApproved = isApproved;
    this.comment = comment;
    this.product = product instanceof Product ? product : new Product(product);
  }
}
