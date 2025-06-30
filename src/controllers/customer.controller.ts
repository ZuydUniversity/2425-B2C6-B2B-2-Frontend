import axios from "axios";
import Customer from "../models/customer.model";
import Order from "../models/order.model";
import * as EitherModule from "fp-ts/Either";
import { createBackendRoute } from "../global/constants/env";
import { Controller } from "../global/abstracts/controller";

export class CustomerController implements Controller<Customer> {
  protected static BASE_URL = "Customers";

  public static getAll(): EitherModule.Either<string, Customer[]> {
    axios
      .get<any[]>(createBackendRoute(this.BASE_URL))
      .then((response) => {
        const customers: Customer[] = response.data.map(
          (item) =>
            new Customer({
              id: item["id"] as number,
              username: item["username"] as string,
              name: item["name"] as string,
              password: item["password"] as string,
              orders: item["orders"] || ([] as Order[]),
            }),
        );
        return EitherModule.right(customers);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to fetch customers");
  }

  public static getOneById(id: number): EitherModule.Either<string, Customer> {
    axios
      .get<any>(createBackendRoute([this.BASE_URL, id.toString()]))
      .then((response) => {
        const item = response.data;
        const customer = new Customer({
          id: item["id"] as number,
          username: item["username"] as string,
          name: item["name"] as string,
          password: item["password"] as string,
          orders: item["orders"] || ([] as Order[]),
        });
        return EitherModule.right(customer);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to fetch customer by ID");
  }

  public static create(model: Customer): EitherModule.Either<string, Customer> {
    axios
      .post<any>(createBackendRoute(this.BASE_URL), {
        id: model.id,
        username: model.username,
        name: model.name,
        password: model.password,
        orders: model.orders || [],
      })
      .then((response) => {
        const created = new Customer({
          id: response.data.id,
          username: response.data.username,
          name: response.data.name,
          password: response.data.password,
          orders: response.data.orders || [],
        });
        return EitherModule.right(created);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to create customer");
  }

  public static update(model: Customer): EitherModule.Either<string, Customer> {
    axios
      .put<any>(createBackendRoute([this.BASE_URL, model.id.toString()]), {
        id: model.id,
        username: model.username,
        name: model.name,
        password: model.password,
        orders: model.orders,
      })
      .then((response) => {
        const updatedCustomer = new Customer({
          id: response.data.id,
          username: response.data.username,
          name: response.data.name,
          password: response.data.password,
          orders: response.data.orders || [],
        });
        return EitherModule.right(updatedCustomer);
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to update customer");
  }

  public static delete(id: number): EitherModule.Either<string, string> {
    axios
      .delete(createBackendRoute([this.BASE_URL, id.toString()]))
      .then(() => {
        return EitherModule.right(
          "Customer met ID ${id} succesvol verwijderd.",
        );
      })
      .catch((error) => {
        return EitherModule.left(error.toString());
      });
    return EitherModule.left("Failed to delete customer");
  }
}
