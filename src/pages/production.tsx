import { FC, useEffect, useState } from "react";
import {
  Button,
  Divider,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Skeleton,
  Space,
  Table,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { ProductionLine } from "../models/productionline.model";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProductionLineController } from "../controllers/productionline.controller";
import { Order } from "../models/order.model";
import { OrderController } from "../controllers/order.controller";
import { PlanningController } from "../controllers/planning.controller";
import { Planning } from "models/planning.model";
import { queryClient } from "./_app";

const ProductionPage: FC = () => {
  const [productionLines, setProductionLines] = useState<ProductionLine[]>([]);
  const { isPending, error, data } = useQuery({
    queryKey: ["production_lines"],
    queryFn: ProductionLineController.readAll,
  });
  useEffect(() => setProductionLines(data || []), [data]);

  const [selectedProductionLineId, setSelectedProductionLineId] = useState<
    number | null
  >(null);

  useEffect(() => {}, []);

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    setSelectedProductionLineId(Number(info.key));
  };

  const menuItems: MenuProps["items"] = productionLines.map(
    (productionLine) => ({
      key: productionLine.id, // this is the customer ID
      label: productionLine.name,
    }),
  );

  const selectedProductionLine = productionLines.find(
    (productionLine) => productionLine.id === selectedProductionLineId,
  );

  if (isPending) return <Skeleton />;
  if (error)
    return (
      <Typography>Er was een fout bij het ophalen van de data.</Typography>
    );

  return (
    <Content style={{ padding: 24 }}>
      <Dropdown
        menu={{
          items: menuItems,
          onClick: handleMenuClick,
        }}
      >
        <Button>
          {selectedProductionLine
            ? selectedProductionLine.name
            : "Kies de productielijn waarin u werkt ↓"}
        </Button>
      </Dropdown>
      {selectedProductionLineId && (
        <>
          <Divider />
          <ProductionLineView
            selectedProductionLineId={selectedProductionLineId}
          />
        </>
      )}
    </Content>
  );
};

interface ProductionLineViewProps {
  selectedProductionLineId: number;
}

interface OrderDataDTO {
  key: number;
  orderId: number;
  productName: string;
  productQuantity: number;
  blueBlocks: string;
  redBlocks: string;
  greyBlocks: string;
}

const ProductionLineView: FC<ProductionLineViewProps> = ({
  selectedProductionLineId,
}) => {
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

  useEffect(() => {}, [selectedProductionLineId]);

  const dataSource: OrderDataDTO[] = plannings
    .filter(
      (planning) => planning.productionLine.id === selectedProductionLineId,
    )
    .filter((planning) => planning.order.status === "InProduction")
    // sort by date ascending
    .sort(
      (left, right) =>
        left.order.orderDate.getTime() - right.order.orderDate.getTime(),
    )
    .map((planning): OrderDataDTO => {
      const order = planning.order;

      const quantity = order.quantity;
      const blueBlocks = order.product.blueBlocks;
      const blueBlocksTotal = blueBlocks * quantity;
      const redBlocks = order.product.redBlocks;
      const redBlocksTotal = redBlocks * quantity;
      const greyBlocks = order.product.greyBlocks;
      const greyBlocksTotal = greyBlocks * quantity;

      return {
        key: order.id,
        orderId: order.id,
        productName: order.product.name,
        productQuantity: quantity,
        blueBlocks: `P.P.: ${blueBlocks} | T: ${blueBlocksTotal}`,
        redBlocks: `P.P.: ${redBlocks} | T: ${redBlocksTotal}`,
        greyBlocks: `P.P.: ${greyBlocks} | T: ${greyBlocksTotal}`,
      };
    });

  if (isPending) return <Skeleton />;
  if (error)
    return (
      <Typography>Er was een fout bij het ophalen van de data.</Typography>
    );

  const handleReadyForDelivery = async (orderId: number) => {
    const planning = plannings.find(
      (planning) => planning.order.id === orderId,
    );

    if (planning === undefined) return;

    const order = planning.order;

    if (order === undefined) return;

    order.status = "ReadyForDelivery";

    mutation.mutate(order);
  };

  const handleRejected = async (orderId: number, rejectedReason: string) => {
    const planning = plannings.find(
      (planning) => planning.order.id === orderId,
    );

    if (planning === undefined) return;

    const order = planning.order;

    if (order === undefined) return;

    order.status = "Rejected";
    order.rejectedDate = new Date();
    order.rejectionReason = rejectedReason;

    mutation.mutate(order);
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Aantal",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
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
      title: "Acties",
      key: "actions",
      render: (_: any, record: OrderDataDTO) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => handleReadyForDelivery(record.orderId)}
            >
              Klaar
            </Button>
            <Form
              onFinish={(values) =>
                handleRejected(record.orderId, values["rejectedReason"])
              }
            >
              <Form.Item
                label="Rede voor afwijzing"
                name="rejectedReason"
                rules={[
                  {
                    required: true,
                    message: "Vul a.u.b de rede voor afwijzing in.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label={null}>
                <Button type="default" danger htmlType="submit">
                  Afwijzen
                </Button>
              </Form.Item>
            </Form>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default ProductionPage;
