import axios from "axios";
import Order from "../models/order.model";
import Customer from "../models/customer.model";
import Product from "../models/product.model";
import EventLog from "../models/eventLog.model";
import * as EitherModule from "fp-ts/Either";

export default class OrderController {
  public static getAll(): EitherModule.Either<string, Order[]> {
    axios
      .get<any[]>("https://10.0.2.4:8080/api/Orders")
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

  public static CreateOrder(order: Order): EitherModule.Either<string, Order> {
    axios
      .post<any>("https://10.0.2.4:8080/api/Orders", {
        id: order.id,
        customerId: order.customerId,
        productId: order.productId,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        status: order.status,
        orderDate: order.orderDate,
        approvedDate: order.approvedDate,
        rejectedDate: order.rejectedDate,
        deliveredDate: order.deliveredDate,
        comment: order.comment,
        forwardedToSupplier: order.forwardedToSupplier,
        rejectionReason: order.rejectionReason,
        customer: order.customer,
        product: order.product,
        eventLogs: order.eventLogs || [],
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

  public static async getOneById(
    idToGet: number,
  ): Promise<EitherModule.Either<string, Order>> {
    try {
      const response = await axios.get<any>(
        "https://10.0.2.4:8080/api/Orders/" + idToGet,
      );
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
    } catch (error: any) {
      return EitherModule.left(error.toString());
    }
  }

  public static updateOrder(order: Order): EitherModule.Either<string, Order> {
    axios
      .put<any>("https://10.0.2.4:8080/api/Orders/" + order.id, {
        id: order.id,
        customerId: order.customerId,
        productId: order.productId,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        status: order.status,
        orderDate: order.orderDate,
        approvedDate: order.approvedDate,
        rejectedDate: order.rejectedDate,
        deliveredDate: order.deliveredDate,
        comment: order.comment,
        forwardedToSupplier: order.forwardedToSupplier,
        rejectionReason: order.rejectionReason,
        customer: order.customer,
        product: order.product,
        eventLogs: order.eventLogs || [],
      })
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

  public static deleteOrder(id: number): EitherModule.Either<string, boolean> {
    axios
      .delete<any>("https://10.0.2.4:8080/api/Orders/" + id)
      .then(() => {
        return EitherModule.right(
          "Customer met ID ${id} succesvol verwijderd.",
        );
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to delete order");
  }

  public static async updateStatus(
    id: number,
    newStatus: string,
  ): Promise<EitherModule.Either<string, Order>> {
    const orderEither = await this.getOneById(id);
    if (EitherModule.isRight(orderEither)) {
      const order = orderEither.right;
      order.status = newStatus;

      return this.updateOrder(order);
    } else {
      return EitherModule.left("Order not found");
    }
  }

  public static async addEventLog(
    orderId: number,
    eventLog: EventLog,
  ): Promise<EitherModule.Either<string, Order>> {
    const orderEither = await this.getOneById(orderId);
    if (EitherModule.isLeft(orderEither)) {
      return EitherModule.left("Order niet gevonden");
    }
    const order = orderEither.right;

    const highestId = (order.eventLogs ?? []).reduce((maxId, log) => {
      return log.id > maxId ? log.id : maxId;
    }, 0);

    const newEventLog = eventLog;
    newEventLog.id = highestId + 1;

    if (!order.eventLogs) {
      order.eventLogs = [];
    }
    order.eventLogs.push(newEventLog);

    return await this.updateOrder(order);
  }
}
