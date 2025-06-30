import axios from "axios";
import PurchaseOrder from "../models/purchaseOrder.model";
import * as EitherModule from "fp-ts/Either";
import { Controller } from "../global/abstracts/controller";
import { createBackendRoute } from "../global/constants/env";
import { ProductionLineController } from "./productionLine.controller";

export class PurchaseOrderController extends Controller<PurchaseOrder> {
  protected static BASE_URL = "PurchaseOrders";

  public getAll(): EitherModule.Either<string, PurchaseOrder[]> {
    axios
      .get<any[]>(createBackendRoute(PurchaseOrderController.BASE_URL))
      .then((response) => {
        const result: PurchaseOrder[] = response.data.map(
          (item) =>
            new PurchaseOrder({
              id: item["id"] as number,
              orderNumber: item["orderNumber"] as string,
              orderDate: new Date(item["orderDate"]),
              status: item["status"] as string,
              productId: item["productId"] as number,
              supplierId: item["supplierId"] as number,
              quantity: item["quantity"] as number,
            }),
        );
        return EitherModule.right(result);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to fetch purchase orders");
  }

  public getOneById(id: number): EitherModule.Either<string, PurchaseOrder> {
    axios
      .get<any>(
        createBackendRoute([PurchaseOrderController.BASE_URL, id.toString()]),
      )
      .then((response) => {
        const item = response.data;
        const purchaseOrder = new PurchaseOrder({
          id: item["id"],
          orderNumber: item["orderNumber"],
          orderDate: new Date(item["orderDate"]),
          status: item["status"],
          productId: item["productId"],
          supplierId: item["supplierId"],
          quantity: item["quantity"],
        });
        return EitherModule.right(purchaseOrder);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to fetch purchase order by ID");
  }

  public create(
    model: PurchaseOrder,
  ): EitherModule.Either<string, PurchaseOrder> {
    axios
      .post<any>(
        createBackendRoute([
          PurchaseOrderController.BASE_URL,
          model.id.toString(),
        ]),
        {
          id: model.id,
          orderNumber: model.orderNumber,
          orderDate: model.orderDate,
          status: model.status,
          productId: model.productId,
          supplierId: model.supplierId,
          quantity: model.quantity,
        },
      )
      .then((response) => {
        const created = new PurchaseOrder({
          id: response.data["id"],
          orderNumber: response.data["orderNumber"],
          orderDate: new Date(response.data["orderDate"]),
          status: response.data["status"],
          productId: response.data["productId"],
          supplierId: response.data["supplierId"],
          quantity: response.data["quantity"],
        });
        return EitherModule.right(created);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to create purchase order");
  }

  public update(
    model: PurchaseOrder,
  ): EitherModule.Either<string, PurchaseOrder> {
    axios
      .put<any>(
        createBackendRoute([
          PurchaseOrderController.BASE_URL,
          model.id.toString(),
        ]),
        {
          id: model.id,
          orderNumber: model.orderNumber,
          orderDate: model.orderDate,
          status: model.status,
          productId: model.productId,
          supplierId: model.supplierId,
          quantity: model.quantity,
        },
      )
      .then((response) => {
        const updated = new PurchaseOrder({
          id: response.data["id"],
          orderNumber: response.data["orderNumber"],
          orderDate: new Date(response.data["orderDate"]),
          status: response.data["status"],
          productId: response.data["productId"],
          supplierId: response.data["supplierId"],
          quantity: response.data["quantity"],
        });
        return EitherModule.right(updated);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to update purchase order");
  }

  public delete(
    model: PurchaseOrder,
  ): EitherModule.Either<string, PurchaseOrder> {
    axios
      .delete(
        createBackendRoute([
          PurchaseOrderController.BASE_URL,
          model.id.toString(),
        ]),
      )
      .then(() => {
        return EitherModule.right(
          `Purchase order met ID ${model.id} succesvol verwijderd.`,
        );
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to delete purchase order");
  }
}
