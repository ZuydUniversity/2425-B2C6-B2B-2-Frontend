import { FC, useEffect, useState } from "react";
import { Button, Col, Row, Skeleton, Space, Statistic, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { Order } from "models/order.model";
import { useQuery } from "@tanstack/react-query";
import { OrderController } from "../controllers/order.controller";
import { queryClient } from "./_app";

const HomePage: FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { isPending, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: OrderController.readAll,
  });
  useEffect(() => setOrders(data || []), [data]);

  const totalOrders = orders.length;
  let totalOrdersFinished = 0;
  let totalBlocks = 0;
  let totalProducts = 0;

  for (const order of orders) {
    const quantity = order.quantity;
    const blueBlocksTotal = order.product.blueBlocks * quantity;
    const redBlocksTotal = order.product.redBlocks * quantity;
    const greyBlocksTotal = order.product.greyBlocks * quantity;

    if (order.status === "Delivered") totalOrdersFinished += 1;
    totalBlocks += blueBlocksTotal + redBlocksTotal + greyBlocksTotal;
    totalProducts += quantity;
  }

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  };

  if (isPending) return <Skeleton />;
  if (error)
    return (
      <Typography>Er was een fout bij het ophalen van de data.</Typography>
    );

  return (
    <Content>
      <Typography.Title>Dashboard</Typography.Title>
      <Button type="primary" onClick={handleRefresh}>
        Ververs data
      </Button>
      <Row>
        <Col span={6}>
          <Statistic title="Totaal aantal orders" value={totalOrders} />
        </Col>
        <Col span={6}>
          <Statistic
            title="Aantal orders succesvol geleverd"
            value={totalOrdersFinished}
          />
        </Col>
        <Col span={6}>
          <Statistic title="Aantal producten geleverd" value={totalProducts} />
        </Col>
        <Col span={6}>
          <Statistic
            title="Aantal blokjes geleverd aan ons totaal"
            value={totalBlocks}
          />
        </Col>
      </Row>
    </Content>
  );
};

export default HomePage;
