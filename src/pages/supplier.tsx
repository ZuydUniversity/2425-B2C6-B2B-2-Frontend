import { FC, useEffect, useState } from "react";
import { Button, Skeleton, Space, Table, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { Planning } from "../models/planning.model";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PlanningController } from "../controllers/planning.controller";
import { Order } from "../models/order.model";
import { OrderController } from "../controllers/order.controller";
import { queryClient } from "./_app";

interface PlanningDataDTO {
  key: number;
  order: Order;
  blueBlocks: number;
  redBlocks: number;
  greyBlocks: number;
  productionLineName: string;
}

const SupplierPage: FC = () => {
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
    .filter((planning) => planning.order.status === "WaitingForParts")
    // sort by date ascending
    .sort(
      (left, right) =>
        left.order.orderDate.getTime() - right.order.orderDate.getTime(),
    )
    .map((planning): PlanningDataDTO => {
      const quantity = planning.order.quantity;

      return {
        key: planning.id,
        order: planning.order,
        blueBlocks: planning.order.product.blueBlocks * quantity,
        redBlocks: planning.order.product.redBlocks * quantity,
        greyBlocks: planning.order.product.greyBlocks * quantity,
        productionLineName: planning.productionLine.name,
      };
    });

  const columns = [
    {
      title: "Blauwe blokken",
      dataIndex: "blueBlocks",
      key: "blueBlocks",
    },
    {
      title: "Rode blokken",
      dataIndex: "redBlocks",
      key: "redBlocks",
    },
    {
      title: "Grijze blokken",
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

          order.status = "InProduction";

          mutation.mutate(order);
        };

        if (isPending) return <Skeleton />;
        if (error)
          return (
            <Typography>
              Er was een fout bij het ophalen van de data.
            </Typography>
          );

        return (
          <Space>
            <Button type="primary" onClick={handleSubmit}>
              Geleverd
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Content>
      <Table dataSource={dataSource} columns={columns} />
    </Content>
  );
};

export default SupplierPage;
