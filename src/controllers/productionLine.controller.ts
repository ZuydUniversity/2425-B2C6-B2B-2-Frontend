import axios from "axios";
import ProductionLine from "../models/productionLine.model";
import * as EitherModule from "fp-ts/Either";

export default class ProductionLineController {
  public static GetAll(): EitherModule.Either<string, ProductionLine[]> {
    axios
      .get<any[]>("https://10.0.2.4:8080/api/ProductLine")
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
    return EitherModule.right([]);
  }
}
