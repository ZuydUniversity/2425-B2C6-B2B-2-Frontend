import { FC, useEffect, useState } from "react";
import { Space, Typography, List, Collapse, Table, Button } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CustomerController } from "../controllers/customer.controller";
import { OrderController } from "../controllers/order.controller";
import { Order } from "../models/order.model";
import { queryClient } from "./_app";

interface OrderDataDTO {
  key: number;
  orderId: number;
  productName: string;
  productQuantity: number;
  status: string;
  customerName: string;
  orderDate: date;
}

const AccountManagementPage: FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("PendingApproval");
  const { isPending, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: OrderController.readAll,
  });

  useEffect(() => setOrders(data || []), [data]);

  const dataSource: OrderDataDTO[] = orders
    .filter((order) => order.status === statusFilter)
    .map(
      (order): OrderDataDTO => ({
        key: order.id,
        orderId: order.id,
        productName: order.product.name,
        productQuantity: order.quantity,
        status: order.status,
        customerName: order.customer.name,
        orderDate: new Date(order.orderDate).toLocaleString("nl-NL", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }),
    );

  const mutation = useMutation({
    mutationFn: OrderController.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleStatusUpdate = async (
    orderId: number,
    currentStatus: string,
    selectedStatus: string,
  ) => {
    const newStatus =
      currentStatus === selectedStatus ? "PendingApproval" : selectedStatus;

    const order = orders.find((order) => order.id === orderId);

    if (order === undefined) return;

    order.status = newStatus;

    mutation.mutate(order);
  };

  const columns = [
    {
      title: "Klantnaam",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Aantal",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "Order datum",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Order status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Acties",
      key: "actions",
      render: (_: any, record: OrderDataDTO) => {
        const isPlanning = record.status === "Planning";
        const isRejected = record.status === "Rejected";

        return (
          <Space>
            <Button
              type={isPlanning ? "primary" : "default"}
              onClick={() =>
                handleStatusUpdate(record.key, record.status, "Planning")
              }
            >
              Accepteren
            </Button>
            <Button
              type={isRejected ? "primary" : "default"}
              danger
              onClick={() =>
                handleStatusUpdate(record.key, record.status, "Rejected")
              }
            >
              Afwijzen
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Content>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type={statusFilter === "PendingApproval" ? "primary" : "default"}
          onClick={() => setStatusFilter("PendingApproval")}
        >
          In afwachting
        </Button>
        <Button
          type={statusFilter === "Planning" ? "primary" : "default"}
          onClick={() => setStatusFilter("Planning")}
        >
          Geaccepteerd
        </Button>
        <Button
          type={statusFilter === "Rejected" ? "primary" : "default"}
          onClick={() => setStatusFilter("Rejected")}
        >
          Afgewezen
        </Button>
      </Space>
      <Table dataSource={dataSource} columns={columns} />
    </Content>
  );
};

export default AccountManagementPage;
