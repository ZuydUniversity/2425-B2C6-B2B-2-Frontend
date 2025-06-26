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

    return EitherModule.left("Failed to fetch products");
  }

  public static getById(id: number): EitherModule.Either<string, Product> {
    axios
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
    return EitherModule.left("Failed to fetch product by ID");
  }

  public static createProduct(
    product: Product,
  ): EitherModule.Either<string, Product> {
    axios
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
          id: response.data["id"] as number,
          name: response.data["name"] as string,
          description: response.data["description"] as string,
          price: response.data["price"] as number,
          costPrice: response.data["costPrice"] as number,
          stockQuantity: response.data["stockQuantity"] as number,
        });
        return EitherModule.right(created);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to create product");
  }

  public static updateProduct(
    product: Product,
  ): EitherModule.Either<string, Product> {
    axios
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
    return EitherModule.left("Failed to update product");
  }

  public static deleteProduct(id: number): EitherModule.Either<string, string> {
    axios
      .delete(`https://10.0.2.4:8080/api/Products/${id}`)
      .then(() => {
        return EitherModule.right(`Product met ID ${id} succesvol verwijderd.`);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to delete product");
  }
}
