import axios from "axios";
import Customer from "../models/customer.model";
import Order from "../models/order.model";
import * as EitherModule from "fp-ts/Either";

export default class CustomerController {
  public static getAll(): EitherModule.Either<string, Customer[]> {
    axios
      .get<any[]>("https://10.0.2.4:8080/api/Customers")
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

  public static createCustomer(
    customer: Customer,
  ): EitherModule.Either<string, Customer> {
    axios
      .post<any>("https://10.0.2.4:8080/api/Customers", {
        id: customer.id,
        username: customer.username,
        name: customer.name,
        password: customer.password,
        orders: customer.orders || [],
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

  public static getById(id: number): EitherModule.Either<string, Customer> {
    axios
      .get<any>("https://10.0.2.4:8080/api/Customers/${id}")
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

  public static updateCustomer(
    customer: Customer,
  ): EitherModule.Either<string, Customer> {
    axios
      .put<any>("https://10.0.2.4:8080/api/Customers/${customer.id}", {
        id: customer.id,
        username: customer.username,
        name: customer.name,
        password: customer.password,
        orders: customer.orders,
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

  public static deleteCustomer(
    id: number,
  ): EitherModule.Either<string, string> {
    axios
      .delete(`https://10.0.2.4:8080/api/Customers/${id}`)
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
