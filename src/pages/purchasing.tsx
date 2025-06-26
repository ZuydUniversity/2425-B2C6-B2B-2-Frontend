import React, { useState, useEffect } from "react";
import styles from "./purchasing.module.scss";
import {
  apiCreateOrders,
  apiUpdatePurchaseOrder,
  apiGetOrders,
} from "../api/PurchaseOrders";
import { apiCreateEventLog } from "../api/eventLogs";
import { apiCreateApprovalForm } from "../api/approvalForms";
import { apiCreateRejectionForm } from "../api/rejectionForms";
import { apiCreatePicklist } from "../api/picklists";
import type {
  Picklist,
  PurchaseOrder as BackendPurchaseOrder,
  Supplier,
  Product,
} from "../types";

// UI types for form state
type UIPurchaseOrder = {
  id?: number;
  orderNumber: string;
  orderDate: string;
  customerName: string;
  status: string;
  product: Product | null;
  supplier: Supplier | null;
  quantity: number | "";
  comment: string;
};

const suppliers: Supplier[] = [
  { id: 1, name: "Supplier A" },
  { id: 2, name: "Supplier B" },
  { id: 3, name: "Supplier C" },
];
const products: Product[] = [
  {
    id: 1,
    name: "Type A",
    description: "",
    price: 0,
    costPrice: 0,
    stockQuantity: 0,
  },
  {
    id: 2,
    name: "Type B",
    description: "",
    price: 0,
    costPrice: 0,
    stockQuantity: 0,
  },
  {
    id: 3,
    name: "Type C",
    description: "",
    price: 0,
    costPrice: 0,
    stockQuantity: 0,
  },
];
const statuses = ["In behandeling", "Goedgekeurd", "Geweigerd"];

const emptyUIPurchaseOrder: UIPurchaseOrder = {
  orderNumber: "",
  orderDate: "",
  customerName: "",
  status: "",
  product: null,
  supplier: null,
  quantity: "",
  comment: "",
};

const tableHeaders = [
  "Ordernummer",
  "Orderdatum",
  "Klantnaam",
  "Status",
  "Product",
  "Leverancier",
  "Aantal",
  "Comment",
];

const emptyPicklist: Picklist = {
  id: 0,
  purchaseOrderId: 0,
  type: "",
  components: "",
  orderId: 0,
  productId: 0,
  quantity: 0,
};

const PurchasingPage = () => {
  // UI state for orders
  const [orders, setOrders] = useState<UIPurchaseOrder[]>([]);
  const [newOrders, setNewOrders] = useState<UIPurchaseOrder[]>([
    { ...emptyUIPurchaseOrder },
  ]);
  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  // Approval/rejection modal state
  const [showRejectModal, setShowRejectModal] = useState<null | number>(null);
  const [rejectComment, setRejectComment] = useState<string>("");

  // Picklist modal state
  const [showPicklistModal, setShowPicklistModal] = useState<null | number>(
    null,
  );
  const [picklistData, setPicklistData] = useState<Picklist>({
    ...emptyPicklist,
  });

  // Fetch all orders from backend on mount and after new orders are created
  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const fetchOrders = async () => {
    try {
      const backendOrders = await apiGetOrders();
      setOrders(
        backendOrders.map((o: BackendPurchaseOrder) => ({
          ...o,
          product: products.find((p) => p.id === o.productId) || null,
          supplier: suppliers.find((s) => s.id === o.supplierId) || null,
          comment: "",
        })),
      );
    } catch {
      setSubmitMessage("Fout bij ophalen van orders.");
    }
  };

  // Convert UI order to backend order
  const toBackendOrder = (order: UIPurchaseOrder): BackendPurchaseOrder => ({
    id: order.id || 0,
    orderNumber: order.orderNumber,
    orderDate: order.orderDate,
    customerName: order.customerName,
    status: order.status,
    productId: order.product?.id || 0,
    supplierId: order.supplier?.id || 0,
    quantity: Number(order.quantity) || 0,
  });

  // Handle changes for new order rows
  const handleNewOrderChange = (
    idx: number,
    field: keyof UIPurchaseOrder,
    value: string | number | Supplier | Product | null,
  ) => {
    setNewOrders((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, [field]: value } : row)),
    );
    // Simple validation for quantity
    if (field === "quantity") {
      const num = Number(value);
      if (value === "" || isNaN(num) || num < 0 || num > 9999) {
        setErrors((prev) => ({
          ...prev,
          [idx]: "Voer een getal in tussen 0 en 9999",
        }));
      } else {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy[idx];
          return copy;
        });
      }
    }
  };

  const addNewOrderRow = () => {
    setNewOrders((prev) => [...prev, { ...emptyUIPurchaseOrder }]);
  };

  const removeNewOrderRow = (idx: number) => {
    setNewOrders((prev) => prev.filter((_, i) => i !== idx));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });
  };

  // Submit new orders (to backend)
  const submitOrders = async () => {
    let hasError = false;
    newOrders.forEach((order, idx) => {
      if (
        !order.orderNumber ||
        !order.orderDate ||
        !order.customerName ||
        !order.status ||
        !order.product ||
        !order.supplier ||
        !order.quantity
      ) {
        setErrors((prev) => ({
          ...prev,
          [idx]: "Vul alle verplichte velden in",
        }));
        hasError = true;
      }
      if (errors[idx]) hasError = true;
    });
    if (hasError) {
      setSubmitMessage("Corrigeer de fouten voor het verzenden.");
      return;
    }

    try {
      const backendOrders = newOrders.map(toBackendOrder);
      await apiCreateOrders(backendOrders);
      await fetchOrders(); // Refresh orders with correct IDs
      setNewOrders([{ ...emptyUIPurchaseOrder }]);
      setErrors({});
      setSubmitMessage("Orders succesvol toegevoegd!");
    } catch {
      setSubmitMessage("Fout bij opslaan van orders.");
    }
  };

  // Approve order (API)
  const handleApprove = async (idx: number) => {
    const order = orders[idx];
    if (!order.id) {
      setSubmitMessage("Order heeft geen ID.");
      return;
    }
    try {
      await apiUpdatePurchaseOrder(order.id, {
        status: "Goedgekeurd",
      });
      await apiCreateApprovalForm({
        id: 0,
        purchaseOrderId: order.id,
        isApproved: true,
        comments: order.comment || "",
        orderId: order.id,
        dateApproved: new Date().toISOString(),
      });
      await apiCreateEventLog({
        id: 0,
        orderId: order.id,
        timestamp: new Date().toISOString(),
        activity: "Approved",
        details: "Order approved by manager",
      });
      await fetchOrders();
    } catch {
      setSubmitMessage("Fout bij goedkeuren van order.");
    }
  };

  // Open reject modal
  const handleOpenReject = (idx: number) => {
    setShowRejectModal(idx);
    setRejectComment("");
  };

  // Confirm rejection (API)
  const handleReject = async (idx: number) => {
    const order = orders[idx];
    if (!order.id) {
      setSubmitMessage("Order heeft geen ID.");
      return;
    }
    try {
      await apiUpdatePurchaseOrder(order.id, {
        status: "Geweigerd",
      });
      await apiCreateRejectionForm({
        id: 0,
        purchaseOrderId: order.id,
        reason: rejectComment,
        rejectionDate: new Date().toISOString(),
        orderId: order.id,
      });
      await apiCreateEventLog({
        id: 0,
        orderId: order.id,
        timestamp: new Date().toISOString(),
        activity: "Rejected",
        details: rejectComment,
      });
      await fetchOrders();
      setShowRejectModal(null);
      setRejectComment("");
    } catch {
      setSubmitMessage("Fout bij afwijzen van order.");
    }
  };

  // Open picklist modal for approved order
  const handleOpenPicklist = (idx: number) => {
    const order = orders[idx];
    setPicklistData({
      id: 0,
      purchaseOrderId: order.id || 0,
      type: "",
      components: "",
      orderId: order.id || 0,
      productId: order.product?.id || 0,
      quantity: Number(order.quantity) || 0,
    });
    setShowPicklistModal(idx);
  };

  // Confirm picklist creation
  const handleCreatePicklist = async () => {
    try {
      await apiCreatePicklist(picklistData);
      await apiCreateEventLog({
        id: 0,
        orderId: picklistData.orderId,
        timestamp: new Date().toISOString(),
        activity: "Picklist created",
        details: `Picklist created for order ${picklistData.orderId}`,
      });
      setShowPicklistModal(null);
      setSubmitMessage("Picklist succesvol aangemaakt!");
    } catch {
      setSubmitMessage("Fout bij aanmaken van picklist.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>
        <div className={styles.titleText}>Inkoop - Purchase Orders</div>
      </div>

      {/* Existing Purchase Orders Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.theadRow}>
              {tableHeaders.map((header) => (
                <th key={header} className={styles.th}>
                  {header}
                </th>
              ))}
              <th className={styles.th}>Actie</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={order.id ?? order.orderNumber}
                style={{ background: idx % 2 === 0 ? "#f5f5f5" : "#fff" }}
              >
                <td className={styles.td}>{order.orderNumber}</td>
                <td className={styles.td}>{order.orderDate}</td>
                <td className={styles.td}>{order.customerName}</td>
                <td className={styles.td}>{order.status}</td>
                <td className={styles.td}>{order.product?.name || ""}</td>
                <td className={styles.td}>{order.supplier?.name || ""}</td>
                <td className={styles.td}>{order.quantity}</td>
                <td className={styles.td}>{order.comment}</td>
                <td className={styles.td}>
                  {order.status === "In behandeling" && (
                    <>
                      <button
                        className={styles.addButton}
                        onClick={() => handleApprove(idx)}
                      >
                        Approve
                      </button>
                      <button
                        className={styles.removeButton}
                        onClick={() => handleOpenReject(idx)}
                        style={{ marginLeft: 8 }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {order.status === "Goedgekeurd" && (
                    <button
                      className={styles.addButton}
                      onClick={() => handleOpenPicklist(idx)}
                      style={{ marginLeft: 8 }}
                    >
                      Maak Picklist
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reject Modal */}
      {showRejectModal !== null && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Reden van afwijzing</h3>
            <textarea
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              rows={4}
              style={{ width: "100%", marginBottom: 16 }}
              placeholder="Voer een reden in..."
            />
            <div style={{ display: "flex", gap: 12 }}>
              <button
                className={styles.removeButton}
                onClick={() => handleReject(showRejectModal)}
                disabled={!rejectComment.trim()}
              >
                Bevestig afwijzing
              </button>
              <button
                className={styles.addButton}
                onClick={() => setShowRejectModal(null)}
              >
                Annuleer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Picklist Modal */}
      {showPicklistModal !== null && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Picklist aanmaken</h3>
            <input
              type="text"
              placeholder="Type"
              value={picklistData.type}
              onChange={(e) =>
                setPicklistData((prev) => ({ ...prev, type: e.target.value }))
              }
              style={{ marginBottom: 8, width: "100%" }}
            />
            <input
              type="text"
              placeholder="Components"
              value={picklistData.components}
              onChange={(e) =>
                setPicklistData((prev) => ({
                  ...prev,
                  components: e.target.value,
                }))
              }
              style={{ marginBottom: 8, width: "100%" }}
            />
            <button className={styles.addButton} onClick={handleCreatePicklist}>
              Bevestig Picklist
            </button>
            <button
              className={styles.removeButton}
              onClick={() => setShowPicklistModal(null)}
              style={{ marginLeft: 8 }}
            >
              Annuleer
            </button>
          </div>
        </div>
      )}

      {/* New Purchase Orders Table */}
      <div className={styles.tableWrapper}>
        <div className={styles.tableActions}>
          <button className={styles.addButton} onClick={addNewOrderRow}>
            + Voeg order toe
          </button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr className={styles.theadRow}>
              {tableHeaders.map((header) => (
                <th key={header} className={styles.th}>
                  {header}
                </th>
              ))}
              <th className={styles.th}>Actie</th>
            </tr>
          </thead>
          <tbody>
            {newOrders.map((order, idx) => (
              <tr
                key={idx}
                style={{ background: idx % 2 === 0 ? "#f5f5f5" : "#fff" }}
              >
                <td className={styles.td}>
                  <input
                    type="text"
                    className={styles.tableButton}
                    value={order.orderNumber}
                    onChange={(e) =>
                      handleNewOrderChange(idx, "orderNumber", e.target.value)
                    }
                    placeholder="Ordernummer"
                  />
                </td>
                <td className={styles.td}>
                  <input
                    type="date"
                    className={styles.tableButton}
                    value={order.orderDate}
                    onChange={(e) =>
                      handleNewOrderChange(idx, "orderDate", e.target.value)
                    }
                  />
                </td>
                <td className={styles.td}>
                  <input
                    type="text"
                    className={styles.tableButton}
                    value={order.customerName}
                    onChange={(e) =>
                      handleNewOrderChange(idx, "customerName", e.target.value)
                    }
                    placeholder="Klantnaam"
                  />
                </td>
                <td className={styles.td}>
                  <select
                    className={styles.tableButton}
                    value={order.status}
                    onChange={(e) =>
                      handleNewOrderChange(idx, "status", e.target.value)
                    }
                  >
                    <option value="">Status</option>
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className={styles.td}>
                  <select
                    className={styles.tableButton}
                    value={order.product?.id || ""}
                    onChange={(e) => {
                      const prod =
                        products.find((p) => p.id === Number(e.target.value)) ||
                        null;
                      handleNewOrderChange(idx, "product", prod);
                    }}
                  >
                    <option value="">Product</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className={styles.td}>
                  <select
                    className={styles.tableButton}
                    value={order.supplier?.id || ""}
                    onChange={(e) => {
                      const sup =
                        suppliers.find(
                          (s) => s.id === Number(e.target.value),
                        ) || null;
                      handleNewOrderChange(idx, "supplier", sup);
                    }}
                  >
                    <option value="">Leverancier</option>
                    {suppliers.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className={styles.td}>
                  <input
                    type="number"
                    min={0}
                    max={9999}
                    className={`${styles.tableButton} ${errors[idx] ? styles.inputError : ""}`}
                    value={order.quantity}
                    onChange={(e) =>
                      handleNewOrderChange(idx, "quantity", e.target.value)
                    }
                    placeholder="Aantal"
                  />
                  {errors[idx] && (
                    <div className={styles.errorTooltip}>{errors[idx]}</div>
                  )}
                </td>
                <td className={styles.td}>
                  <input
                    type="text"
                    className={styles.tableButton}
                    value={order.comment}
                    onChange={(e) =>
                      handleNewOrderChange(idx, "comment", e.target.value)
                    }
                    placeholder="Comment"
                  />
                </td>
                <td className={styles.td}>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeNewOrderRow(idx)}
                    disabled={newOrders.length === 1}
                  >
                    Verwijder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.tableActions}>
          <button className={styles.submitButton} onClick={submitOrders}>
            Orders opslaan / versturen
          </button>
          {submitMessage && (
            <div className={styles.submitMessage}>{submitMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchasingPage;
