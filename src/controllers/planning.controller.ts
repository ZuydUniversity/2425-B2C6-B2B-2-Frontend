import axios from "axios";
import Order from "../models/order.model";
import Planning from "../models/planning.model";
import ProductionLine from "models/productionLine.model";
import * as EitherModule from "fp-ts/Either";
import { createBackendRoute } from "../global/constants/env";
import { Controller } from "../global/abstracts/controller";

export class PlanningController extends Controller<Planning> {
  protected static BASE_URL = "Planning";

  public getAll(): EitherModule.Either<string, Planning[]> {
    axios
      .get<any[]>(createBackendRoute(PlanningController.BASE_URL))
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

  public getOneById(id: number): EitherModule.Either<string, Planning> {
    axios
      .get<any>(
        createBackendRoute([PlanningController.BASE_URL, id.toString()]),
      )
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

  public create(model: Planning): EitherModule.Either<string, Planning> {
    axios
      .post<any>(createBackendRoute(PlanningController.BASE_URL), {
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

  public update(model: Planning): EitherModule.Either<string, Planning> {
    axios
      .put<any>(
        createBackendRoute([PlanningController.BASE_URL, model.id.toString()]),
        {
          id: model.id,
          plannedDate: model.plannedDate,
          orderId: model.orderId,
          order: model.order,
          productionLineId: model.productionLineId,
          productionLine: model.productionLine,
        },
      )
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

  public delete(model: Planning): EitherModule.Either<string, Planning> {
    axios
      .delete(
        createBackendRoute([PlanningController.BASE_URL, model.id.toString()]),
      )
      .then(() => {
        return EitherModule.right(model);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to delete planning");
  }
}
