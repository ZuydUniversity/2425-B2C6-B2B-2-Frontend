﻿import { FC, useEffect, useState } from "react";
import { Space, Typography, List, Collapse, Table, Button } from "antd";
import { Content } from "antd/lib/layout/layout";

const AccountManagementPage: FC = () => {
  const [orders, setOrders] = useState<any[] | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string>("PendingApproval");

  useEffect(() => {}, []);

  const filteredOrders = orders?.filter((order) => {
    if (statusFilter === "All") return true;
    return order.status === statusFilter;
  });

  const handleStatusUpdate = async (
    orderId: string,
    currentStatus: string,
    selectedStatus: string,
  ) => {
    const newStatus =
      currentStatus === selectedStatus ? "PendingApproval" : selectedStatus;

    /*const { error } = await supabase
      .from("Orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      console.error("Failed to update status:", error);
      return;
    }*/

    // Update local state
    setOrders((prev) =>
      prev?.map((order) =>
        order.key === orderId ? { ...order, status: newStatus } : order,
      ),
    );
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
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Orderperiode",
      dataIndex: "orderPeriod",
      key: "orderPeriod",
    },
    {
      title: "Order status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Acties",
      key: "actions",
      render: (_: any, record: any) => {
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
          type={statusFilter === "All" ? "primary" : "default"}
          onClick={() => setStatusFilter("All")}
        >
          Alles
        </Button>
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
      <Table dataSource={filteredOrders} columns={columns} />
    </Content>
  );
};

export default AccountManagementPage;
