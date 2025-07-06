import { Order } from "./order.model";

export interface ServiceLogProperties {
  caseId: number;
  timeStamp: Date;
  activity: string;
  event: string;
}

export class ServiceLog implements ServiceLogProperties {
  public caseId;
  public timeStamp: Date;
  public activity: string;
  public event: string;

  public constructor(properties: ServiceLogProperties) {
    this.caseId = properties.caseId;
    this.timeStamp = properties.timeStamp;
    this.activity = properties.activity;
    this.event = properties.event;
  }

  public static fromJSON(json: any): ServiceLog {
    return new ServiceLog({
      caseId: json.caseId,
      timeStamp: json.timestamp ? new Date(json.timestamp) : new Date(),
      activity: json.activity,
      event: json.event,
    });
  }

  public toJSON(): any {
    return {
      caseId: this.caseId,
      timestamp: this.timeStamp,
      activity: this.activity,
      event: this.event,
    };
  }
}
