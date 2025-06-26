import axios from "axios";
import Product from "../models/product.model";
import * as EitherModule from "fp-ts/Either";

export default class ProductController {
  public static getAll(): EitherModule.Either<string, Product[]> {
    axios
      .get<any[]>("https://10.0.2.4:8080/api/Products")
      .then((response) => {
        const result: Product[] = [];
        const data = response.data;

        data.forEach((item) => {
          result.push(
            new Product({
              id: item["id"] as number,
              name: item["name"] as string,
              description: item["description"] as string,
              price: item["price"] as number,
              costPrice: item["costPrice"] as number,
              stockQuantity: item["stockQuantity"] as number,
            }),
          );
        });

        return EitherModule.right(result);
      })
      .catch((error) => {
        return EitherModule.left(error);
      });

    return EitherModule.right([]);
  }
}
