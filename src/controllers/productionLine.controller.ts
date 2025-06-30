import axios from "axios";
import ProductionLine from "../models/productionLine.model";
import * as EitherModule from "fp-ts/Either";
import { Controller } from "../global/abstracts/controller";
import { createBackendRoute } from "../global/constants/env";

export class ProductionLineController extends Controller<ProductionLine> {
  protected static BASE_URL = "ProductLine";

  public static getAll(): EitherModule.Either<string, ProductionLine[]> {
    axios
      .get<any[]>(createBackendRoute(this.BASE_URL, id.toString()))
      .then((response) => {
        const result: ProductionLine[] = [];
        const data = response.data;

        data.forEach((item) => {
          result.push(
            new ProductionLine({
              id: item["id"] as number,
              lineName: item["lineName"] as string,
              isActive: item["isActive"] as boolean,
            }),
          );
        });

        return EitherModule.right(result);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to fetch production lines");
  }

  public static create(
    model: ProductionLine,
  ): EitherModule.Either<string, ProductionLine> {
    axios
      .post<any>(createBackendRoute(this.BASE_URL, model), {
        id: model.id,
        lineName: model.lineName,
        isActive: model.isActive,
      })
      .then((response) => {
        const item = response.data;

        const newProductionLine = new ProductionLine({
          id: response.data["id"] as number,
          lineName: response.data["lineName"] as string,
          isActive: response.data["isActive"] as boolean,
        });
        return EitherModule.right(newProductionLine);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to create production line");
  }
}
