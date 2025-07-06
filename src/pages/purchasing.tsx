import { FC, useEffect, useState } from "react";
import {
  Button,
  Form,
  InputNumber,
  Skeleton,
  Space,
  Table,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { Order } from "../models/order.model";
import { Planning } from "../models/planning.model";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PlanningController } from "../controllers/planning.controller";
import { OrderController } from "../controllers/order.controller";
import { queryClient } from "./_app";

interface PlanningDataDTO {
  key: number;
  order: Order;
  quantity: number;
  productName: string;
  blueBlocks: number;
  redBlocks: number;
  greyBlocks: number;
  productionLineName: string;
}

const PurchasingPage: FC = () => {
  const [plannings, setPlannings] = useState<Planning[]>([]);
  const { isPending, error, data } = useQuery({
    queryKey: ["refetch_global", "plannings"],
    queryFn: PlanningController.readAll,
  });
  useEffect(() => setPlannings(data || []), [data]);

  const mutation = useMutation({
    mutationFn: OrderController.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plannings"] });
    },
  });

  const dataSource: PlanningDataDTO[] = plannings
    .filter((planning) => planning.order.status === "WaitingForPurchasing")
    // sort by date ascending
    .sort(
      (left, right) =>
        left.order.orderDate.getTime() - right.order.orderDate.getTime(),
    )
    .map((planning): PlanningDataDTO => {
      const order = planning.order;
      const quantity: number = order.quantity;

      return {
        key: order.id,
        order: order,
        quantity: quantity,
        productName: order.product.name,
        blueBlocks: order.product.blueBlocks * quantity,
        redBlocks: order.product.redBlocks * quantity,
        greyBlocks: order.product.greyBlocks * quantity,
        productionLineName: planning.productionLine.name,
      };
    });

  const columns = [
    {
      title: "Type",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Aantal",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Blauwe blokken x aantal",
      dataIndex: "blueBlocks",
      key: "blueBlocks",
    },
    {
      title: "Rode blokken x aantal",
      dataIndex: "redBlocks",
      key: "redBlocks",
    },
    {
      title: "Grijze blokken x aantal",
      dataIndex: "greyBlocks",
      key: "greyBlocks",
    },
    {
      title: "Te leveren aan",
      dataIndex: "productionLineName",
      key: "productionLineName",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: PlanningDataDTO) => {
        const handleSubmit = () => {
          const order = record.order;

          order.status = "WaitingForParts";

          mutation.mutate(order);
        };

        return (
          <Space>
            <Button type="primary" onClick={handleSubmit}>
              Verzenden naar leverancier
            </Button>
          </Space>
        );
      },
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

export default PurchasingPage;
