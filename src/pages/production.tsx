import { sampleData } from "../data/productionsampledata";
import { Status } from "../data/statuseslist";
import { motorImagesList } from "../data/motorimageslist";
import styles from "./production.module.scss";
import React, { useState } from "react";

type Order = {
  orderId: string;
  productType: string;
  aantal: number;
  productielijn: number;
  leverdatum: string;
  status: Status;
  productiePeriode?: {
    start?: string;
    einde?: string;
  };
};

const ProductionPage = () => {
  const [openDropdown, setOpenDropdown] = useState<{
    orderId: string;
    x: number;
    y: number;
  } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [problemText, setProblemText] = useState("");
  const [ordersData, setOrdersData] = useState(sampleData);

  const groupedByLine = [1, 2, 3].map((lijn) => ({
    lijn,
    orders: ordersData.filter((o) => o.productielijn === lijn),
  }));

  const [filters, setFilters] = useState<{
    [key: number]: { status: string; leverdatum: string };
  }>({
    1: { status: "", leverdatum: "" },
    2: { status: "", leverdatum: "" },
    3: { status: "", leverdatum: "" },
  });

  const handleProblemSubmit = () => {
    console.log("Gemeld probleem:", problemText);
    setProblemText("");
    setShowProblemModal(false);
  };

  return (
    <div>
      <div className={styles.title}>
        <button
          onClick={() => setShowProblemModal(true)}
          className={styles.problemButton}
        >
          Meld probleem
        </button>
        <h1>Productie</h1>
        <hr className={styles.separator} />
      </div>

      <div className={styles.tablesContainer}>
        {groupedByLine.map(({ lijn, orders }) => {
          const filteredOrders = orders.filter((order) => {
            const { status, leverdatum } = filters[lijn];
            return (
              (!status || order.status === status) &&
              (!leverdatum || order.leverdatum === leverdatum)
            );
          });

          return (
            <div key={lijn}>
              <h2>Productielijn {lijn}</h2>

              {/* Filters */}
              <div className={styles.filters}>
                <label>
                  Status:
                  <select
                    value={filters[lijn].status}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        [lijn]: { ...prev[lijn], status: e.target.value },
                      }))
                    }
                  >
                    <option value="">Alle</option>
                    {Object.values(Status).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Leverdatum:
                  <input
                    type="date"
                    value={filters[lijn].leverdatum}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        [lijn]: { ...prev[lijn], leverdatum: e.target.value },
                      }))
                    }
                  />
                </label>
              </div>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead className={styles.tableHeader}>
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
                    {filteredOrders.map((order) => (
                      <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>{order.productType}</td>
                        <td>{order.aantal}</td>
                        <td>{order.productielijn}</td>
                        <td>{order.leverdatum}</td>
                        <td>
                          <span
                            className={`${styles.status} ${
                              styles[
                                order.status.replace(/\s/g, "").toLowerCase()
                              ]
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className={styles.dropdownContainer}>
                          <button
                            className={styles.button}
                            onClick={(e) => {
                              const rect = (
                                e.target as HTMLElement
                              ).getBoundingClientRect();
                              setOpenDropdown({
                                orderId: order.orderId,
                                x: rect.left,
                                y: rect.bottom,
                              });
                            }}
                          >
                            Wijzig status ▼
                          </button>
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
            </div>
          );
        })}
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
                <div>
                  <label>
                    Start productie:
                    <input
                      type="date"
                      value={selectedOrder.productiePeriode?.start || ""}
                      onChange={(e) => {
                        const newStart = e.target.value;
                        setOrdersData((prev) =>
                          prev.map((order) =>
                            order.orderId === selectedOrder.orderId
                              ? {
                                  ...order,
                                  productiePeriode: {
                                    ...order.productiePeriode,
                                    start: newStart,
                                  },
                                }
                              : order,
                          ),
                        );
                        setSelectedOrder((prev) =>
                          prev
                            ? {
                                ...prev,
                                productiePeriode: {
                                  ...prev.productiePeriode,
                                  start: newStart,
                                },
                              }
                            : null,
                        );
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Einde productie:
                    <input
                      type="date"
                      value={selectedOrder.productiePeriode?.einde || ""}
                      onChange={(e) => {
                        const newEnd = e.target.value;
                        setOrdersData((prev) =>
                          prev.map((order) =>
                            order.orderId === selectedOrder.orderId
                              ? {
                                  ...order,
                                  productiePeriode: {
                                    ...order.productiePeriode,
                                    einde: newEnd,
                                  },
                                }
                              : order,
                          ),
                        );
                        setSelectedOrder((prev) =>
                          prev
                            ? {
                                ...prev,
                                productiePeriode: {
                                  ...prev.productiePeriode,
                                  einde: newEnd,
                                },
                              }
                            : null,
                        );
                      }}
                    />
                  </label>
                </div>
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

      {showProblemModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowProblemModal(false)}
        >
          <div
            className={styles.problemModal}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Probleem melden</h3>
            <textarea
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              className={styles.textArea}
              placeholder="Beschrijf het probleem..."
            />
            <div className={styles.modalButtons}>
              <button onClick={handleProblemSubmit} className={styles.button}>
                Verstuur
              </button>
              <button
                onClick={() => setShowProblemModal(false)}
                className={styles.button}
              >
                Annuleer
              </button>
            </div>
          </div>
        </div>
      )}

      {openDropdown && (
        <ul
          className={styles.dropdownMenu}
          style={{
            position: "fixed",
            top: openDropdown.y,
            left: openDropdown.x,
            zIndex: 1000,
          }}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          {Object.values(Status).map((status) => (
            <li
              key={status}
              className={styles.dropdownLink}
              onClick={() => {
                // update status in backend/locaal
                // hier moet je je state update doen, vb:
                const orderToUpdate = sampleData.find(
                  (o) => o.orderId === openDropdown.orderId,
                );
                if (orderToUpdate) orderToUpdate.status = status;
                setOpenDropdown(null);
              }}
            >
              {status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductionPage;
