import { ServiceLog } from "../models/servicelog.model";
import { createBackendRoute } from "../global/env";

export class ServiceLogController {
  public static async readAll(): Promise<ServiceLog[]> {
    const response = await fetch(createBackendRoute("ProcessMining/log"));
    const data = await response.json();
    return data.map((item: any) => ServiceLog.fromJSON(item));
  }

  public static async readOneByTimeStamp(timeStamp: Date): Promise<ServiceLog> {
    const response = await fetch(
      createBackendRoute(["ProcessMining/log", timeStamp.toString()]),
    );
    const data = await response.json();
    return ServiceLog.fromJSON(data);
  }
}
