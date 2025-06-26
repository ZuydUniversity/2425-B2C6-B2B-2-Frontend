interface SupplierConstructor {
  id: number;
  name: string;
}

export default class Supplier {
  public id: number;
  public name: string;

  constructor({ id, name }: SupplierConstructor) {
    this.id = id;
    this.name = name;
  }
}
