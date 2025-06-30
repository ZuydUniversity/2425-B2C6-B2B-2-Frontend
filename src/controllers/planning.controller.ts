import axios from "axios";
import Order from "../models/order.model";
import Planning from "../models/planning.model";
import ProductionLine from "models/productionLine.model";
import * as EitherModule from "fp-ts/Either";
import { createBackendRoute } from "../global/constants/env";
import { Controller } from "../global/abstracts/controller";

export class PlanningController extends Controller<Planning> {
  protected static BASE_URL = "Planning";

  public static getAll(): EitherModule.Either<string, Planning[]> {
    axios
      .get<any[]>(createBackendRoute(this.BASE_URL))
      .then((response) => {
        const result: Planning[] = [];
        const data = response.data;

        data.forEach((item) => {
          result.push(
            new Planning({
              id: item["id"] as number,
              plannedDate: item["plannedDate"] as Date,
              orderId: item["orderId"] as number,
              order: item["order"] as Order,
              productionLineId: item["productionLineId"] as number,
              productionLine: item["productionLine"] as ProductionLine,
            }),
          );
        });
        return EitherModule.right(result);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to fetch planning data");
  }

  public static getOneById(id: number): EitherModule.Either<string, Planning> {
    axios
      .get<any>(createBackendRoute([this.BASE_URL, id.toString()]))
      .then((response) => {
        const item = response.data;
        const planning = new Planning({
          id: item["id"] as number,
          plannedDate: item["plannedDate"] as Date,
          orderId: item["orderId"] as number,
          order: item["order"] as Order,
          productionLineId: item["productionLineId"] as number,
          productionLine: item["productionLine"] as ProductionLine,
        });
        return EitherModule.right(planning);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to fetch planning by ID");
  }

  public static create(model: Planning): EitherModule.Either<string, Planning> {
    axios
      .post<any>(createBackendRoute(this.BASE_URL), {
        id: model.id,
        plannedDate: model.plannedDate,
        orderId: model.orderId,
        order: model.order,
        productionLineId: model.productionLineId,
        productionLine: model.productionLine,
      })
      .then((response) => {
        const created = new Planning({
          id: response.data.id,
          plannedDate: response.data.plannedDate,
          orderId: response.data.orderId,
          order: response.data.order,
          productionLineId: response.data.productionLineId,
          productionLine: response.data.productionLine,
        });
        return EitherModule.right(created);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to create planning");
  }

  public static update(model: Planning): EitherModule.Either<string, Planning> {
    axios
      .put<any>(createBackendRoute([this.BASE_URL, model.id.toString()]), {
        id: model.id,
        plannedDate: model.plannedDate,
        orderId: model.orderId,
        order: model.order,
        productionLineId: model.productionLineId,
        productionLine: model.productionLine,
      })
      .then((response) => {
        const updated = new Planning({
          id: response.data.id,
          plannedDate: response.data.plannedDate,
          orderId: response.data.orderId,
          order: response.data.order,
          productionLineId: response.data.productionLineId,
          productionLine: response.data.productionLine,
        });
        return EitherModule.right(updated);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to update planning");
  }

  public static delete(id: number): EitherModule.Either<string, string> {
    axios
      .delete(createBackendRoute([this.BASE_URL, id.toString()]))
      .then(() => {
        return EitherModule.right(
          `Planning met ID ${id} succesvol verwijderd.`,
        );
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to delete planning");
  }
}
