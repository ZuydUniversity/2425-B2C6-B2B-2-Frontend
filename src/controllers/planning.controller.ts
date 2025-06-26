import axios from "axios";
import Order from "../models/order.model";
import Planning from "../models/planning.model";
import ProductionLine from "models/productionLine.model";
import * as EitherModule from "fp-ts/Either";

export default class PlanningController {
  public static getAll(): EitherModule.Either<string, Planning[]> {
    axios
      .get<any[]>("https://10.0.2.4:8080/api/Planning")
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

  public static getById(id: number): EitherModule.Either<string, Planning> {
    axios
      .get<any>(`https://10.0.2.4:8080/api/Planning/${id}`)
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

  public static createPlanning(
    planning: Planning,
  ): EitherModule.Either<string, Planning> {
    axios
      .post<any>("https://10.0.2.4:8080/api/Planning", {
        id: planning.id,
        plannedDate: planning.plannedDate,
        orderId: planning.orderId,
        order: planning.order,
        productionLineId: planning.productionLineId,
        productionLine: planning.productionLine,
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

  public static updatePlanning(
    planning: Planning,
  ): EitherModule.Either<string, Planning> {
    axios
      .put<any>(`https://10.0.2.4:8080/api/Planning/${planning.id}`, {
        id: planning.id,
        plannedDate: planning.plannedDate,
        orderId: planning.orderId,
        order: planning.order,
        productionLineId: planning.productionLineId,
        productionLine: planning.productionLine,
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

  public static deletePlanning(
    id: number,
  ): EitherModule.Either<string, string> {
    axios
      .delete(`https://10.0.2.4:8080/api/Planning/${id}`)
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
