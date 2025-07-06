import { FC, useEffect, useState } from "react";
import {
  Space,
  Typography,
  List,
  Collapse,
  Table,
  Button,
  Skeleton,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { ServiceLog } from "../models/servicelog.model";
import { ServiceLogController } from "../controllers/servicelog.controller";
import { useQuery } from "@tanstack/react-query";

interface ServiceLogDataDTO {
  key: number;
  timeStamp: string;
  activity: string;
  event: string;
}

const ServiceLogPage: FC = () => {
  const [serviceLogs, setServiceLogs] = useState<ServiceLog[]>([]);
  const { isPending, error, data } = useQuery({
    queryKey: ["refetch_global", "ProcessMining/log"],
    queryFn: ServiceLogController.readAll,
  });

  useEffect(() => setServiceLogs(data || []), [data]);

  const dataSource: ServiceLogDataDTO[] = serviceLogs
    .sort((left, right) => right.timeStamp.getTime() - left.timeStamp.getTime())
    .map(
      (serviceLog): ServiceLogDataDTO => ({
        key: serviceLog.caseId,
        timeStamp: new Date(serviceLog.timeStamp).toLocaleString("nl-NL"),
        activity: serviceLog.activity,
        event: serviceLog.event,
      }),
    );

  const columns = [
    {
      title: "Tijd",
      dataIndex: "timeStamp",
      key: "timeStamp",
    },
    {
      title: "Activiteit",
      dataIndex: "activity",
      key: "activity",
    },
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
    },
  ];

  if (isPending) return <Skeleton />;
  if (error)
    return (
      <Typography>Er was een fout bij het ophalen van de data.</Typography>
    );

  return (
    <Content>
      <Table dataSource={dataSource} columns={columns} />
    </Content>
  );
};

export default ServiceLogPage;
