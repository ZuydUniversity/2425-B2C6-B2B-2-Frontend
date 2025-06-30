import React, { useState, useEffect } from "react";
import styles from "./accountmanager.module.scss";
import Order from "../models/order.model";
import Customer from "../models/customer.model";
import Product from "../models/product.model";
import OrderController from "controllers/order.controller";
import ProductController from "controllers/product.controller";
import CustomerController from "controllers/customer.controller";
import { motorImagesList } from "../global/constants/motorimageslist";
import { AccountStatus } from "../global/constants/accountstatuslist";
import EventLog from "models/eventLog.model";

function generateNextOrderId(orders: Order[]): number {
  if (orders.length === 0) return 1;
  const maxNumber = Math.max(...orders.map((o) => o.id));
  return maxNumber + 1;
}

const AccountManagementPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [createOrder, setCreateOrder] = useState<{
    klantId?: number;
    productId?: number;
    aantal: number;
    leverdatum?: string;
  }>({
    aantal: 1,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const orderResult = await OrderController.getAll();
        if (orderResult._tag === "Right") {
          console.log("Orders opgehaald:", orderResult.right);
          setOrders(orderResult.right);
        } else {
          setError("Fout bij het ophalen van orders: " + orderResult.left);
          return;
        }

        const customerResult = await CustomerController.getAll();
        if (customerResult._tag === "Right") {
          console.log("customers opgehaald:", customerResult.right);
          setCustomers(customerResult.right);
        } else {
          setError("Fout bij het ophalen van klanten: " + customerResult.left);
          return;
        }

        const productResult = await ProductController.getAll();
        if (productResult._tag === "Right") {
          console.log("products opgehaald:", productResult.right);
          setProducts(productResult.right);
        } else {
          setError("Fout bij het ophalen van producten: " + productResult.left);
          return;
        }

        setError(null);
      } catch (e) {
        setError(
          "Er is een onverwachte fout opgetreden: " + (e as Error).message,
        );
      }
    }
    fetchData();
  }, []);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [notificatieModalOpen, setNotificatieModalOpen] = useState(false);
  const [laatsteNotificaties, setLaatsteNotificaties] = useState<string[]>([]);

  const updateStatus = async (
    currentorderId: number,
    newStatus: AccountStatus,
  ) => {
    try {
      const now = new Date().toISOString().split("T")[0];
      const eitherCurrentOrder =
        await OrderController.getOneById(currentorderId);

      if (eitherCurrentOrder._tag === "Left") {
        throw new Error(eitherCurrentOrder.left);
      }

      const currentOrder = eitherCurrentOrder.right;
      currentOrder.status = newStatus.toString();

      const updateResult = await OrderController.updateOrder(currentOrder);

      if (updateResult._tag === "Left") {
        throw new Error(updateResult.left);
      }

      const notificatie =
        newStatus === AccountStatus.Rejected
          ? `Klant geïnformeerd: order ${currentorderId} is afgekeurd op ${now}`
          : `Planning geïnformeerd: order ${currentorderId} is goedgekeurd op ${now}`;

      const newEventLog = new EventLog({
        id: 1,
        orderId: currentorderId,
        timestamp: new Date(),
        activity: "Statuswijziging",
        details: notificatie,
        order: updateResult.right,
      });

      const eventLogResult = await OrderController.addEventLog(
        currentorderId,
        newEventLog,
      );

      if (eventLogResult._tag === "Left") {
        throw new Error(eventLogResult.left);
      }

      setLaatsteNotificaties([notificatie]);
      setNotificatieModalOpen(true);
    } catch (error) {
      console.error("Fout bij statusupdate:", error);
      alert("Er is iets misgegaan bij het verwerken van deze order.");
    }
  };

  const [filters, setFilters] = useState({
    searchTerm: "",
    orderdate: "",
    status: "",
  });

  return (
    <div>
      <div className={styles.title}>
        <h1>Account management</h1>
        <hr className={styles.separator} />
        {error && <div className={styles.error}>{error}</div>}
      </div>

      <div className={styles.page}>
        <div className={styles.title}>
          <h1>Klantorders</h1>

          <div className={styles.searchbar}>
            <input
              type="text"
              placeholder="Zoek op Order ID of Producttype"
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  searchTerm: e.target.value,
                }))
              }
            />
          </div>

          <div className={styles.filtersContainer}>
            <div className={styles.filters}>
              <label>
                Status:
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                >
                  <option value="">Alle</option>
                  {Object.values(AccountStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                orderdate:
                <input
                  type="date"
                  value={filters.orderdate}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      leverdatum: e.target.value,
                    }))
                  }
                />
              </label>
            </div>

            <div className={styles.createOrderButtonContainer}>
              <button
                className={styles.button}
                onClick={() => setShowCreateModal(true)}
              >
                Order aanmaken
              </button>
            </div>
          </div>
        </div>

        <div className={styles.tablesContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.normalColumn}>Order ID</th>
                <th className={styles.normalColumn}>Klant</th>
                <th className={styles.normalColumn}>Producttype</th>
                <th className={styles.normalColumn}>Aantal</th>
                <th className={styles.normalColumn}>orderdate</th>
                <th className={styles.normalColumn}>Status</th>
                <th className={styles.buttonColumn}>Acties</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((order) => {
                  const matchesSearchTerm =
                    filters.searchTerm === "" ||
                    order.id ||
                    order.product.name
                      .toLowerCase()
                      .includes(filters.searchTerm.toLowerCase());

                  const matchesStatus =
                    filters.status === "" || order.status === filters.status;

                  const matchesDate =
                    filters.orderdate === "" ||
                    order.orderDate.toString() === filters.orderdate;

                  return matchesSearchTerm && matchesStatus && matchesDate;
                })
                .map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer.name}</td>
                    <td>{order.product.name}</td>
                    <td>{order.quantity}</td>
                    <td>{order.orderDate.toString()}</td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          styles[
                            order.status.replace(/\s/g, "").toLowerCase()
                          ] || ""
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.buttonContainer}>
                        <button
                          className={styles.button}
                          onClick={() =>
                            updateStatus(order.id, AccountStatus.Approved)
                          }
                        >
                          Goedkeuren
                        </button>
                        <button
                          className={styles.button}
                          onClick={() =>
                            updateStatus(order.id, AccountStatus.Rejected)
                          }
                        >
                          Afkeuren
                        </button>
                        <button
                          className={styles.button}
                          onClick={() => setSelectedOrder(order)}
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {selectedOrder && (
          <div
            className={styles.modalOverlay}
            onClick={() => setSelectedOrder(null)}
          >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h3>Details voor Order {selectedOrder.id}</h3>
              <div className={styles.modalContent}>
                <div className={styles.details}>
                  <p>
                    <strong>Klant:</strong> {selectedOrder.customer.name}
                  </p>
                  <p>
                    <strong>Producttype:</strong> {selectedOrder.product.name}
                  </p>
                  <p>
                    <strong>Aantal:</strong> {selectedOrder.quantity}
                  </p>
                  <p>
                    <strong>orderdate:</strong>{" "}
                    {selectedOrder.orderDate.toString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedOrder.status}
                  </p>
                </div>
                <div className={styles.imageContainer}>
                  <img
                    src={
                      motorImagesList[selectedOrder.product.name] ||
                      motorImagesList["A"]
                    }
                    alt={`Motor ${selectedOrder.product.name}`}
                    className={styles.productImage}
                  />
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className={styles.button}
              >
                Sluiten
              </button>
            </div>
          </div>
        )}

        {showCreateModal && (
          <div
            className={styles.modalOverlay}
            onClick={() => setShowCreateModal(false)}
          >
            <div
              className={styles.createModal}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Nieuwe Order Aanmaken</h3>
              <div className={styles.modalContent}>
                <label>
                  Klantnaam:
                  <select
                    value={createOrder.klantId ?? ""}
                    onChange={(e) =>
                      setCreateOrder((prev) => ({
                        ...prev,
                        klantId: Number(e.target.value),
                      }))
                    }
                  >
                    <option value="" disabled>
                      Selecteer een klant
                    </option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Producttype:
                  <select
                    value={createOrder.productId ?? ""}
                    onChange={(e) =>
                      setCreateOrder((prev) => ({
                        ...prev,
                        productId: Number(e.target.value),
                      }))
                    }
                  >
                    <option value="" disabled>
                      Selecteer een product
                    </option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Aantal:
                  <input
                    type="number"
                    min="1"
                    value={createOrder.aantal}
                    onChange={(e) =>
                      setCreateOrder((prev) => ({
                        ...prev,
                        aantal: parseInt(e.target.value),
                      }))
                    }
                  />
                </label>
                <label>
                  Gewenste leverdatum:
                  <input
                    type="date"
                    value={createOrder.leverdatum ?? ""}
                    onChange={(e) =>
                      setCreateOrder((prev) => ({
                        ...prev,
                        leverdatum: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <div className={styles.modalActions}>
                <button
                  className={styles.button}
                  onClick={() => {
                    if (!createOrder.klantId || !createOrder.productId) {
                      alert("Selecteer een klant en product.");
                      return;
                    }

                    const nextId = generateNextOrderId(orders);

                    const selectedCustomer = customers.find(
                      (c) => c.id === createOrder.klantId,
                    );
                    const selectedProduct = products.find(
                      (p) => p.id === createOrder.productId,
                    );

                    if (!selectedCustomer || !selectedProduct) {
                      alert("Ongeldige klant of product.");
                      return;
                    }

                    const newOrder = new Order({
                      id: nextId,
                      customerId: selectedCustomer.id,
                      productId: selectedProduct.id,
                      quantity: createOrder.aantal,
                      totalPrice: 0,
                      status: AccountStatus.Pending,
                      orderDate: new Date(),
                      approvedDate: null,
                      rejectedDate: null,
                      deliveredDate: null,
                      comment: "",
                      forwardedToSupplier: false,
                      rejectionReason: "",
                      customer: selectedCustomer,
                      product: selectedProduct,
                      eventLogs: [],
                    });

                    setOrders((prev) => [...prev, newOrder]);
                    setShowCreateModal(false);
                  }}
                >
                  Bevestigen
                </button>
                <button
                  className={styles.button}
                  onClick={() => setShowCreateModal(false)}
                >
                  Annuleren
                </button>
              </div>
            </div>
          </div>
        )}

        {notificatieModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.notifModalContent}>
                <h3>Notificatie verzonden</h3>
                <ul>
                  {laatsteNotificaties.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
                <button
                  className={styles.button}
                  onClick={() => setNotificatieModalOpen(false)}
                >
                  Sluiten
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountManagementPage;
