interface ApprovalFormConstructor {
  id: number;
  plannedDate: Date;
  description: string;
}

export default class Planning {
  public id: number;
  public plannedDate: Date;
  public description: string;

  constructor({ id, plannedDate, description }: ApprovalFormConstructor) {
    this.id = id;
    this.plannedDate = plannedDate;
    this.description = description;
  }
}
