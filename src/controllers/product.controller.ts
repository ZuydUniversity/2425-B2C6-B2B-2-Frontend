import axios from "axios";
import Product from "../models/product.model";
import * as EitherModule from "fp-ts/Either";
import { createBackendRoute } from "../global/constants/env";
import { Controller } from "../global/abstracts/controller";

export class ProductController extends Controller<Product> {
  protected static BASE_URL = "Products";

  public getAll(): EitherModule.Either<string, Product[]> {
    axios
      .get<any[]>(createBackendRoute(ProductController.BASE_URL))
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

  public getOneById(id: number): EitherModule.Either<string, Product> {
    axios
      .get<any>(createBackendRoute([ProductController.BASE_URL, id.toString()]))
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

  public create(model: Product): EitherModule.Either<string, Product> {
    axios
      .post<any>(
        createBackendRoute([ProductController.BASE_URL, model.id.toString()]),
        {
          id: model.id,
          name: model.name,
          description: model.description,
          price: model.price,
          costPrice: model.costPrice,
          stockQuantity: model.stockQuantity,
        },
      )
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

  public update(model: Product): EitherModule.Either<string, Product> {
    axios
      .put<any>(
        createBackendRoute([ProductController.BASE_URL, model.id.toString()]),
        {
          id: model.id,
          name: model.name,
          description: model.description,
          price: model.price,
          costPrice: model.costPrice,
          stockQuantity: model.stockQuantity,
        },
      )
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

  public delete(model: Product): EitherModule.Either<string, Product> {
    axios
      .delete(
        createBackendRoute([ProductController.BASE_URL, model.id.toString()]),
      )
      .then(() => {
        return EitherModule.right(model);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to delete product");
  }
}
