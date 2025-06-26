import Order from "./order.model";

interface CustomerConstructor {
  id: number;
  username: string;
  name: string;
  password: string;
  orders?: Order[];
}

export default class Customer {
  public id: number;
  public username: string;
  public name: string;
  public password: string;
  public orders: Order[];

  constructor({
    id,
    username,
    name,
    password,
    orders = [],
  }: CustomerConstructor) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.password = password;
    this.orders = orders.map((order) => new Order(order));
  }
}
