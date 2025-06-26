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
              price: item["price"] as number,
              costPrice: item["costPrice"] as number,
              blueBlocks: item["blueBlocks"] as number,
              redBlocks: item["redBlocks"] as number,
              greyBlocks: item["greyBlocks"] as number,
              productionTime: item["productionTime"] as number
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
          price: item["price"] as number,
          costPrice: item["costPrice"] as number,
          blueBlocks: item["blueBlocks"] as number,
          redBlocks: item["redBlocks"] as number,
          greyBlocks: item["greyBlocks"] as number,
          productionTime: item["productionTime"] as number
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
        price: product.price,
        costPrice: product.costPrice,
        blueBlocks: product.blueBlocks,
        redBlocks: product.redBlocks,
        greyBlocks: product.greyBlocks,
        productionTime: product.productionTime
      })
      .then((response) => {
        const created = new Product({
          id: response.data.id as number,
          name: response.data.name as string,
          price: response.data.price as number,
          costPrice: response.data.costPrice as number,
          blueBlocks: response.data.blueBlocks as number,
          redBlocks: response.data.redBlocks as number,
          greyBlocks: response.data.greyBlocks as number,
          productionTime: response.data.productionTime as number
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
        price: product.price,
        costPrice: product.costPrice,
        blueBlocks: product.blueBlocks,
        redBlocks: product.redBlocks,
        greyBlocks: product.greyBlocks,
        productionTime: product.productionTime
      })
      .then((response) => {
        const updated = new Product({
          id: response.data.id as number,
          name: response.data.name as string,
          price: response.data.price as number,
          costPrice: response.data.costPrice as number,
          blueBlocks: response.data.blueBlocks as number,
          redBlocks: response.data.redBlocks as number,
          greyBlocks: response.data.greyBlocks as number,
          productionTime: response.data.productionTime as number
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
