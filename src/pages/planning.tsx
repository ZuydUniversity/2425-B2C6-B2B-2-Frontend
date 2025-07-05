import { FC, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  InputNumber,
  MenuProps,
  Modal,
  Skeleton,
  Space,
  Table,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { Order } from "../models/order.model";
import { useMutation, useQuery } from "@tanstack/react-query";
import { OrderController } from "../controllers/order.controller";
import { Planning } from "../models/planning.model";
import { PlanningController } from "../controllers/planning.controller";
import { ProductionLine } from "../models/productionline.model";
import { ProductionLineController } from "../controllers/productionline.controller";
import { queryClient } from "./_app";

interface OrderDataDTO {
  key: number;
  orderId: number;
  status: string;
  customerName: string;
  productName: string;
  quantity: number;
  orderPeriod: number;
}

const PlanningPage: FC = () => {
  const [form] = Form.useForm();
  const [orders, setOrders] = useState<Order[]>([]);
  const {
    isPending: ordersIsPending,
    error: ordersError,
    data: ordersData,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: OrderController.readAll,
  });
  useEffect(() => setOrders(ordersData || []), [ordersData]);
  const orderMutation = useMutation({
    mutationFn: OrderController.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const [plannings, setPlannings] = useState<Planning[]>([]);
  const {
    isPending: planningsIsPending,
    error: planningsError,
    data: planningsData,
  } = useQuery({
    queryKey: ["plannings"],
    queryFn: PlanningController.readAll,
  });
  useEffect(() => setPlannings(planningsData || []), [planningsData]);
  const planningMutation = useMutation({
    mutationFn: PlanningController.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plannings"] });
    },
  });

  const [productionLines, setProductionLines] = useState<ProductionLine[]>([]);
  const {
    isPending: productionLineIsPending,
    error: productionLineError,
    data: productionLineData,
  } = useQuery({
    queryKey: ["production_lines"],
    queryFn: ProductionLineController.readAll,
  });
  useEffect(
    () => setProductionLines(productionLineData || []),
    [productionLineData],
  );

  const [statusFilter, setStatusFilter] = useState<string>("Planning");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDataDTO | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  const [selectedProductionLineId, setSelectedProductionLineId] = useState<
    number | null
  >();

  useEffect(() => {}, []);

  const filteredOrders = orders.filter((order) => {
    if (statusFilter === "All") return true;
    return order.status === statusFilter;
  });

  const dataSource: OrderDataDTO[] = filteredOrders.map(
    (order): OrderDataDTO => ({
      key: order.id,
      orderId: order.id,
      status: order.status,
      customerName: order.customer.name,
      productName: order.product.name,
      quantity: order.quantity,
      orderPeriod: 1,
    }),
  );

  const showModal = async (order: OrderDataDTO) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleSubmit = (values: any) => {
    (async () => {
      /*const { error: updateOrderError } = await supabase
        .from("Orders")
        .update({
          status: "WaitingForPurchasing",
        })
        .eq("id", selectedOrder.key);

      const { data, error: workOrderError } = await supabase
        .from("WorkOrders")
        .insert([
          {
            orderId: selectedOrder.key,
            plannedPeriod: values.period,
            productionLineId: selectedProductionLineId,
          },
        ])
        .select();*/
      /*if (!data || data.length <= 0) {
        console.error("Data length is", data.length);
        return;
      }*/

      if (
        selectedProductionLineId === null ||
        selectedProductionLineId === undefined
      )
        return;
      if (selectedOrder === null) return;

      const order = orders.find((order) => order.id === selectedOrder.key);

      if (order === undefined) return;

      order.status = "WaitingForPurchasing";

      orderMutation.mutate(order);

      planningMutation.mutate({
        plannedDate: new Date(),
        orderId: order.id,
        productionLineId: selectedProductionLineId,
      });
    })();

    console.table(values);
    form.resetFields();
    setSelectedProductionLineId(null);
    handleModalClose();
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
    setSelectedLine(null);
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
      title: "Acties",
      key: "actions",
      render: (_: any, record: OrderDataDTO) => {
        const isPlanning = record.status === "Planning";
        const isRejected = record.status === "Rejected";

        return (
          <Space>
            <Button
              type={isPlanning ? "primary" : "default"}
              onClick={() => showModal(record)}
            >
              Plannen
            </Button>
          </Space>
        );
      },
    },
  ];

  const getProductionBacklog = (productionLineId: number): number => {
    let total = 0;
    const filteredPlannings = plannings.filter(
      (planning) => planning.productionLine.id === productionLineId,
    );

    filteredPlannings.forEach((planning) => {
      total += planning.order.quantity;
    });

    return total;
  };

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    setSelectedProductionLineId(Number(info.key));
    form.setFieldsValue({ productionLine: info.key });
  };

  const menuItems: MenuProps["items"] = productionLines.map(
    (productionLine) => ({
      key: productionLine.id,
      label:
        productionLine.name +
        " Backlog: " +
        getProductionBacklog(productionLine.id),
    }),
  );

  const selectedProductionLine = productionLines.find(
    (productionLine) => productionLine.id === selectedProductionLineId,
  );

  if (ordersIsPending || productionLineIsPending || planningsIsPending)
    return <Skeleton />;

  if (ordersError || productionLineError || planningsError)
    return (
      <Typography>Er was een fout bij het ophalen van de data.</Typography>
    );

  return (
    <Content>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Order plannen"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalClose}
      >
        {selectedOrder && (
          <>
            <p>
              <strong>Klant:</strong> {selectedOrder.customerName}
            </p>
            <p>
              <strong>Product:</strong> {selectedOrder.productName}
            </p>
            <p>
              <strong>Aantal:</strong> {selectedOrder.quantity}
            </p>
            <p>
              <strong>Periode:</strong> {selectedOrder.orderPeriod}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <div>
              <p>
                <strong>Verder benodigde informatie:</strong>
              </p>
              <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                  label="Productielijn"
                  name="productionLine"
                  rules={[
                    {
                      required: true,
                      message: "Kies a.u.b. een productielijn",
                    },
                  ]}
                >
                  <Dropdown
                    menu={{
                      items: menuItems,
                      onClick: handleMenuClick,
                    }}
                  >
                    <Button>
                      {selectedProductionLine
                        ? selectedProductionLine.name
                        : "Kies uw gewenste productielijn ↓"}
                    </Button>
                  </Dropdown>
                </Form.Item>
              </Form>
            </div>
          </>
        )}
      </Modal>
    </Content>
  );
};

export default PlanningPage;
