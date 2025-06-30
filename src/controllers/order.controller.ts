import axios from "axios";
import Order from "../models/order.model";
import Customer from "../models/customer.model";
import Product from "../models/product.model";
import EventLog from "../models/eventLog.model";
import * as EitherModule from "fp-ts/Either";
import { createBackendRoute } from "../global/constants/env";
import { Controller } from "../global/abstracts/controller";

export class OrderController extends Controller<Order> {
  protected static BASE_URL = "Orders";

  public getAll(): EitherModule.Either<string, Order[]> {
    axios
      .get<any[]>(createBackendRoute(OrderController.BASE_URL))
      .then((response) => {
        const result: Order[] = [];
        const data = response.data;

        data.forEach((item) => {
          result.push(
            new Order({
              id: item["id"] as number,
              customerId: item["customerId"] as number,
              productId: item["productId"] as number,
              quantity: item["quantity"] as number,
              totalPrice: item["totalPrice"] as number,
              status: item["status"] as string,
              orderDate: item["orderDate"] as Date,
              approvedDate: item["approvedDate"] as Date,
              rejectedDate: item["rejectedDate"] as Date,
              deliveredDate: item["deliveredDate"] as Date,
              comment: item["comment"] as string,
              forwardedToSupplier: item["forwardedToSupplier"] as boolean,
              rejectionReason: item["rejectionReason"] as string,
              customer: item["customer"] as Customer,
              product: item["product"] as Product,
              eventLogs: item["eventLogs"] || ([] as EventLog[]),
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

  public getOneById(id: number): EitherModule.Either<string, Order> {
    axios
      .get<any>(createBackendRoute([OrderController.BASE_URL, id.toString()]))
      .then((response) => {
        const item = response.data;

        const order = new Order({
          id: item["id"] as number,
          customerId: item["customerId"] as number,
          productId: item["productId"] as number,
          quantity: item["quantity"] as number,
          totalPrice: item["totalPrice"] as number,
          status: item["status"] as string,
          orderDate: item["orderDate"] as Date,
          approvedDate: item["approvedDate"] as Date,
          rejectedDate: item["rejectedDate"] as Date,
          deliveredDate: item["deliveredDate"] as Date,
          comment: item["comment"] as string,
          forwardedToSupplier: item["forwardedToSupplier"] as boolean,
          rejectionReason: item["rejectionReason"] as string,
          customer: item["customer"] as Customer,
          product: item["product"] as Product,
          eventLogs: item["eventLogs"] || ([] as EventLog[]),
        });

        return EitherModule.right(order);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });

    return EitherModule.left("No Order found with that id");
  }

  public create(model: Order): EitherModule.Either<string, Order> {
    axios
      .post<any>(createBackendRoute(OrderController.BASE_URL), {
        id: model.id,
        customerId: model.customerId,
        productId: model.productId,
        quantity: model.quantity,
        totalPrice: model.totalPrice,
        status: model.status,
        orderDate: model.orderDate,
        approvedDate: model.approvedDate,
        rejectedDate: model.rejectedDate,
        deliveredDate: model.deliveredDate,
        comment: model.comment,
        forwardedToSupplier: model.forwardedToSupplier,
        rejectionReason: model.rejectionReason,
        customer: model.customer,
        product: model.product,
        eventLogs: model.eventLogs || [],
      })
      .then((response) => {
        const created = new Order({
          id: response.data.id,
          customerId: response.data.customerId,
          productId: response.data.productId,
          quantity: response.data.quantity,
          totalPrice: response.data.totalPrice,
          status: response.data.status,
          orderDate: response.data.orderDate,
          approvedDate: response.data.approvedDate,
          rejectedDate: response.data.rejectedDate,
          deliveredDate: response.data.deliveredDate,
          comment: response.data.comment,
          forwardedToSupplier: response.data.forwardedToSupplier,
          rejectionReason: response.data.rejectionReason,
          customer: response.data.customer as Customer,
          product: response.data.product as Product,
          eventLogs: response.data.eventLogs || [],
        });
        return EitherModule.right(created);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to create order");
  }

  public update(model: Order): EitherModule.Either<string, Order> {
    axios
      .put<any>(
        createBackendRoute([OrderController.BASE_URL, model.id.toString()]),
        {
          id: model.id,
          customerId: model.customerId,
          productId: model.productId,
          quantity: model.quantity,
          totalPrice: model.totalPrice,
          status: model.status,
          orderDate: model.orderDate,
          approvedDate: model.approvedDate,
          rejectedDate: model.rejectedDate,
          deliveredDate: model.deliveredDate,
          comment: model.comment,
          forwardedToSupplier: model.forwardedToSupplier,
          rejectionReason: model.rejectionReason,
          customer: model.customer,
          product: model.product,
          eventLogs: model.eventLogs || [],
        },
      )
      .then((response) => {
        const updatedOrder = new Order({
          id: response.data.id,
          customerId: response.data.customerId,
          productId: response.data.productId,
          quantity: response.data.quantity,
          totalPrice: response.data.totalPrice,
          status: response.data.status,
          orderDate: response.data.orderDate,
          approvedDate: response.data.approvedDate,
          rejectedDate: response.data.rejectedDate,
          deliveredDate: response.data.deliveredDate,
          comment: response.data.comment,
          forwardedToSupplier: response.data.forwardedToSupplier,
          rejectionReason: response.data.rejectionReason,
          customer: response.data.customer as Customer,
          product: response.data.product as Product,
          eventLogs: response.data.eventLogs || [],
        });
        return EitherModule.right(updatedOrder);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to update order");
  }

  public delete(model: Order): EitherModule.Either<string, Order> {
    axios
      .delete<any>(
        createBackendRoute([OrderController.BASE_URL, model.id.toString()]),
      )
      .then(() => {
        return EitherModule.right(model);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to delete order");
  }
}
