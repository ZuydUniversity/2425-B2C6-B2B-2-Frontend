import { sampleData } from "../data/productionsampledata";
import { statuses } from "../data/statuseslist";
import { motorImagesList } from "../data/motorimageslist";
import styles from "./production.module.scss";
import React, { useState } from "react";

type Order = {
  orderId: string;
  productType: string;
  aantal: number;
  productielijn: number;
  leverdatum: string;
  status: string;
};

const ProductionPage = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const groupedByLine = [1, 2, 3].map((lijn) => ({
    lijn,
    orders: sampleData.filter((o) => o.productielijn === lijn),
  }));

  return (
    <div>
      <div className={styles.title}>
        <h1>Productie</h1>
        <hr className={styles.separator} />
      </div>
      <div>
        {groupedByLine.map(({ lijn, orders }) => (
          <div key={lijn}>
            <h2>Productielijn {lijn}</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Producttype</th>
                  <th>Aantal</th>
                  <th>Productielijn</th>
                  <th>Leverdatum</th>
                  <th>Status</th>
                  <th>Wijzig status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.productType}</td>
                    <td>{order.aantal}</td>
                    <td>{order.productielijn}</td>
                    <td>{order.leverdatum}</td>
                    <td>
                      <span
                        className={`${styles.status} ${styles[order.status.replace(/\s/g, "").toLowerCase()]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className={styles.dropdownContainer}>
                      <div
                        className={styles.dropdown}
                        onMouseEnter={() => setOpenDropdown(order.orderId)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <button className={styles.button}>
                          Wijzig status ▼
                        </button>
                        {openDropdown === order.orderId && (
                          <ul className={styles.dropdownMenu}>
                            {statuses.map((status) => (
                              <li
                                key={status}
                                className={styles.dropdownLink}
                                onClick={() => {
                                  // TODO: update de status in backend
                                  order.status = status;
                                  setOpenDropdown(null);
                                }}
                              >
                                {status}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </td>
                    <td>
                      <button
                        className={styles.button}
                        onClick={() => setSelectedOrder(order)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
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
                  <strong>Producttype:</strong> {selectedOrder.productType}
                </p>
                <p>
                  <strong>Aantal:</strong> {selectedOrder.aantal}
                </p>
                <p>
                  <strong>Productielijn:</strong> {selectedOrder.productielijn}
                </p>
                <p>
                  <strong>Leverdatum:</strong> {selectedOrder.leverdatum}
                </p>
                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
              </div>

              <div className={styles.imageContainer}>
                {/*product image*/}
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
  );
};

export default ProductionPage;
