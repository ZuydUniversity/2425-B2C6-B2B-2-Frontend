interface ApprovalFormConstructor {
  id: number;
  lineName: string;
  isActive: boolean;
}

export default class ProductionLine {
  public id: number;
  public lineName: string;
  public isActive: boolean;

  constructor({ id, lineName, isActive }: ApprovalFormConstructor) {
    this.id = id;
    this.lineName = lineName;
    this.isActive = isActive;
  }
}
