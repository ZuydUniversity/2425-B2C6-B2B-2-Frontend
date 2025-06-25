import React, { useState } from "react";
import styles from "./accountmanager.module.scss";
import {
  apiUpdateOrderStatus,
  apiCreateApprovalForm,
  /*apiGetAllOrders,
  apiGetOrder,
  apiGetCustomer,*/
  apiCreateEventLog as apiCreateAccountEventLog,
} from "../api/account";
//import { apiCreateEventLog } from "../api/eventLogs";
import { sampleData } from "../data/productionsampledata";
import { motorImagesList } from "../data/motorimageslist";
import { AccountStatus } from "../data/accountstatuslist";

type Order = {
  orderId: string;
  klantnaam: string;
  productType: "A" | "B" | "C";
  aantal: number;
  orderdatum: string;
  status: AccountStatus;
  accountmanagerPeriode?: { start: string; einde?: string };
  notificaties?: string[];
};

function generateNextOrderId(orders: Order[]): string {
  const maxNumber = orders.reduce((max, order) => {
    const num = parseInt(order.orderId.replace("ORD", ""), 10);
    return isNaN(num) ? max : Math.max(max, num);
  }, 0);

  const nextNumber = (maxNumber + 1).toString().padStart(3, "0");
  return `ORD${nextNumber}`;
}

const AccountManagementPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(
    sampleData.map((item, index) => ({
      orderId: item.orderId,
      klantnaam: `Klant ${index + 1}`,
      productType: item.productType as "A" | "B" | "C",
      aantal: item.aantal,
      orderdatum: "2025-06-01",
      status: AccountStatus.Pending,
    })),
  );

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [notificatieModalOpen, setNotificatieModalOpen] = useState(false);
  const [laatsteNotificaties, setLaatsteNotificaties] = useState<string[]>([]);

  const [createOrder, setCreateOrder] = useState({
    klantnaam: "",
    producttype: "Type A",
    aantal: 1,
    leverdatum: "",
  });

  const updateStatus = async (orderId: string, newStatus: AccountStatus) => {
    try {
      const now = new Date().toISOString().split("T")[0];
      const numericOrderId = Number(orderId.replace(/\D/g, ""));

      if (newStatus === AccountStatus.Approved) {
        await apiUpdateOrderStatus(
          Number(numericOrderId),
          "Approved",
          "Goedgekeurd door accountmanager",
        );
        await apiCreateApprovalForm(Number(numericOrderId));
      } else if (newStatus === AccountStatus.Rejected) {
        await apiUpdateOrderStatus(
          Number(numericOrderId),
          "Rejected",
          "Afgekeurd door accountmanager",
        );
      }

      const notificatie =
        newStatus === AccountStatus.Rejected
          ? `Klant geïnformeerd: order ${orderId} is afgekeurd op ${now}`
          : newStatus === AccountStatus.Approved
            ? `Planning geïnformeerd: order ${orderId} is goedgekeurd op ${now}`
            : "";

      await apiCreateAccountEventLog({
        orderId: Number(orderId),
        message: notificatie,
        role: newStatus === AccountStatus.Approved ? "Planning" : "Klant",
      });

      setOrders((prev) =>
        prev.map((order) => {
          if (order.orderId !== orderId) return order;

          const wasHandledBefore = !!order.accountmanagerPeriode?.start;
          const updatedPeriode = wasHandledBefore
            ? {
                start: order.accountmanagerPeriode!.start,
                einde: now,
              }
            : { start: now };

          const nieuweNotificaties = [
            ...(order.notificaties || []),
            notificatie,
          ];

          setLaatsteNotificaties([notificatie]);
          setNotificatieModalOpen(true);

          return {
            ...order,
            status: newStatus,
            accountmanagerPeriode: updatedPeriode,
            notificaties: nieuweNotificaties,
          };
        }),
      );
    } catch (error) {
      console.error("Fout bij statusupdate:", error);
      alert("Er is iets misgegaan bij het verwerken van deze order.");
    }
  };

  const [filters, setFilters] = useState({
    searchTerm: "",
    orderdatum: "",
    status: "",
  });

  return (
    <div>
      <div className={styles.title}>
        <h1>Account management</h1>
        <hr className={styles.separator} />
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
                Orderdatum:
                <input
                  type="date"
                  value={filters.orderdatum}
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
                <th className={styles.normalColumn}>Orderdatum</th>
                <th className={styles.normalColumn}>Status</th>
                <th className={styles.buttonColumn}>Acties</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((order) => {
                  const matchesSearchTerm =
                    filters.searchTerm === "" ||
                    order.orderId
                      .toLowerCase()
                      .includes(filters.searchTerm.toLowerCase()) ||
                    order.productType
                      .toLowerCase()
                      .includes(filters.searchTerm.toLowerCase());

                  const matchesStatus =
                    filters.status === "" || order.status === filters.status;

                  const matchesDate =
                    filters.orderdatum === "" ||
                    order.orderdatum === filters.orderdatum;

                  return matchesSearchTerm && matchesStatus && matchesDate;
                })
                .map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.klantnaam}</td>
                    <td>{order.productType}</td>
                    <td>{order.aantal}</td>
                    <td>{order.orderdatum}</td>
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
                            updateStatus(order.orderId, AccountStatus.Approved)
                          }
                        >
                          Goedkeuren
                        </button>
                        <button
                          className={styles.button}
                          onClick={() =>
                            updateStatus(order.orderId, AccountStatus.Rejected)
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
              <h3>Details voor Order {selectedOrder.orderId}</h3>
              <div className={styles.modalContent}>
                <div className={styles.details}>
                  <p>
                    <strong>Klant:</strong> {selectedOrder.klantnaam}
                  </p>
                  <p>
                    <strong>Producttype:</strong> {selectedOrder.productType}
                  </p>
                  <p>
                    <strong>Aantal:</strong> {selectedOrder.aantal}
                  </p>
                  <p>
                    <strong>Orderdatum:</strong> {selectedOrder.orderdatum}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedOrder.status}
                  </p>
                </div>
                <div className={styles.imageContainer}>
                  <img
                    src={
                      motorImagesList[selectedOrder.productType] ||
                      motorImagesList["A"]
                    }
                    alt={`Motor ${selectedOrder.productType}`}
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
                  <input
                    type="text"
                    value={createOrder.klantnaam}
                    onChange={(e) =>
                      setCreateOrder((prev) => ({
                        ...prev,
                        klantnaam: e.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  Producttype:
                  <select
                    value={createOrder.producttype}
                    onChange={(e) =>
                      setCreateOrder((prev) => ({
                        ...prev,
                        producttype: e.target.value,
                      }))
                    }
                  >
                    <option value="Type A">Type A</option>
                    <option value="Type B">Type B</option>
                    <option value="Type C">Type C</option>
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
                    value={createOrder.leverdatum}
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
                    const nextId = generateNextOrderId(orders);

                    const newOrder: Order = {
                      orderId: nextId,
                      klantnaam: createOrder.klantnaam,
                      productType: createOrder.producttype.split(" ")[1] as
                        | "A"
                        | "B"
                        | "C",
                      aantal: createOrder.aantal,
                      orderdatum: new Date().toISOString().split("T")[0],
                      status: AccountStatus.Pending,
                    };

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
