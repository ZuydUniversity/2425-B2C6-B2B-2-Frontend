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

  public static getById(
    id: number,
  ): Promise<EitherModule.Either<string, Product>> {
    return axios
      .get<any>(`https://10.0.2.4:8080/api/Products/${id}`)
      .then((response) => {
        const item = response.data;

        const product = new Product({
          id: item["id"] as number,
          name: item["name"] as string,
          description: item["description"] as string,
          price: item["price"] as number,
          costPrice: item["costPrice"] as number,
          stockQuantity: item["stockQuantity"] as number,
        });
        return EitherModule.right(product);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
  }

  public static createProduct(
    product: Product,
  ): Promise<EitherModule.Either<string, Product>> {
    return axios
      .post<any>("https://10.0.2.4:8080/api/Products", {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        costPrice: product.costPrice,
        stockQuantity: product.stockQuantity,
      })
      .then((response) => {
        const created = new Product({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          costPrice: response.data.costPrice,
          stockQuantity: response.data.stockQuantity,
        });
        return EitherModule.right(created);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
  }

  public static updateProduct(
    product: Product,
  ): Promise<EitherModule.Either<string, Product>> {
    return axios
      .put<any>(`https://10.0.2.4:8080/api/Products/${product.id}`, {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        costPrice: product.costPrice,
        stockQuantity: product.stockQuantity,
      })
      .then((response) => {
        const updated = new Product({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          costPrice: response.data.costPrice,
          stockQuantity: response.data.stockQuantity,
        });
        return EitherModule.right(updated);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
  }

  public static deleteProduct(
    id: number,
  ): Promise<EitherModule.Either<string, string>> {
    return axios
      .delete(`https://10.0.2.4:8080/api/Products/${id}`)
      .then(() => {
        return EitherModule.right(`Product met ID ${id} succesvol verwijderd.`);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
  }
}
