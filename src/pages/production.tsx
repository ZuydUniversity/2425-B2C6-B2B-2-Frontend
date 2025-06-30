import Order from "../models/order.model";
import OrderController from "controllers/order.controller";
import PlanningController from "controllers/planning.controller";
import { Status } from "../global/constants/statuseslist";
import { motorImagesList } from "../global/constants/motorimageslist";
import styles from "./production.module.scss";
import React, { useState, useEffect } from "react";

const ProductionPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<EnrichedOrder | null>(
    null,
  );
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [problemText, setProblemText] = useState("");
  const [ordersData, setOrdersData] = useState<EnrichedOrder[]>([]);
  const [openDropdown, setOpenDropdown] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);
  const [filters, setFilters] = useState<{
    [key: number]: { status: string; leverdatum: string };
  }>({
    1: { status: "", leverdatum: "" },
    2: { status: "", leverdatum: "" },
    3: { status: "", leverdatum: "" },
  });

  type EnrichedOrder = Order & {
    productielijn: number;
    productType: string;
    aantal: number;
    leverdatum: string;
    productiePeriode?: {
      start: string;
      einde: string;
    };
  };

  useEffect(() => {
    async function fetchData() {
      const [orderRes, planningRes] = await Promise.all([
        OrderController.getAll(),
        PlanningController.getAll(),
      ]);

      if (orderRes._tag === "Right" && planningRes._tag === "Right") {
        const orders = orderRes.right;
        const planning = planningRes.right;

        const mappedOrders: EnrichedOrder[] = orders.map((order) => {
          const plan = planning.find((p) => p.orderId === order.id);
          return {
            ...order,
            productType: order.product.name,
            aantal: order.quantity,
            leverdatum: order.deliveredDate?.toString() ?? "Onbekend",
            productielijn: plan?.productionLineId ?? 0,
            productiePeriode: plan
              ? { start: plan.plannedDate.toString(), einde: "" }
              : undefined,
          };
        });

        setOrdersData(mappedOrders);
      } else {
        console.error("Fout bij ophalen data");
      }
    }

    fetchData();
  }, []);

  const groupedByLine = [1, 2, 3].map((lijn) => ({
    lijn,
    orders: ordersData.filter((o) => o.productielijn === lijn),
  }));

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
              (!leverdatum || order.deliveredDate?.toString() === leverdatum)
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
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.product.name}</td>
                        <td>{order.quantity}</td>
                        <td>{order.productielijn}</td>
                        <td>{order.deliveredDate?.toString()}</td>
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
                                id: order.id.toString(),
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
            <h3>Details voor Order {selectedOrder.id}</h3>
            <div className={styles.modalContent}>
              <div className={styles.details}>
                <p>
                  <strong>Producttype:</strong> {selectedOrder.product.name}
                </p>
                <p>
                  <strong>Aantal:</strong> {selectedOrder.quantity}
                </p>
                <p>
                  <strong>Productielijn:</strong> {selectedOrder.productielijn}
                </p>
                <p>
                  <strong>Leverdatum:</strong>{" "}
                  {selectedOrder.deliveredDate?.toString() ?? "Onbekend"}
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
                            order.id === selectedOrder.id
                              ? {
                                  ...order,
                                  productiePeriode: {
                                    einde: order.productiePeriode?.einde ?? "",
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
                                  einde: prev.productiePeriode?.einde ?? "",
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
                            order.id === selectedOrder.id
                              ? {
                                  ...order,
                                  productiePeriode: {
                                    start: order.productiePeriode?.start ?? "",
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
                                  start: prev.productiePeriode?.start ?? "",
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
                const orderToUpdate = ordersData.find(
                  (o) => o.id === Number(openDropdown.id),
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
