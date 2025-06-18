import React, { useState } from "react";
import styles from "./accountmanager.module.scss";
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
};

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

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const updateStatus = (orderId: string, newStatus: AccountStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  return (
    <div>
      <div className={styles.title}>
        <h1>Account management</h1>
        <hr className={styles.separator} />
      </div>

      <div className={styles.page}>
        <div className={styles.title}>
          <h1>Klantorders</h1>
        </div>

        <div className={styles.tablesContainer}>
          <div className={styles.tableWrapper}>
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
                {orders.map((order) => (
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
      </div>
    </div>
  );
};

export default AccountManagementPage;
