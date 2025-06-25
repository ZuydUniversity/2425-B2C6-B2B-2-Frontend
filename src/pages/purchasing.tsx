import React, { useState } from "react";
import styles from "./purchasing.module.scss";

// Supplier and Product types
type Supplier = { id: number; name: string };
type Product = { id: number; name: string };

// Example supplier and product lists with IDs
const suppliers: Supplier[] = [
  { id: 1, name: "Supplier A" },
  { id: 2, name: "Supplier B" },
  { id: 3, name: "Supplier C" },
];
const products: Product[] = [
  { id: 1, name: "Type A" },
  { id: 2, name: "Type B" },
  { id: 3, name: "Type C" },
];
const statuses = ["In behandeling", "Goedgekeurd", "Geweigerd"];

// PurchaseOrder now uses Product and Supplier objects
type PurchaseOrder = {
  orderNumber: string;
  orderDate: string;
  status: string;
  product: Product | null;
  supplier: Supplier | null;
  quantity: number | "";
  comment: string;
};

const emptyPurchaseOrder: PurchaseOrder = {
  orderNumber: "",
  orderDate: "",
  status: "",
  product: null,
  supplier: null,
  quantity: "",
  comment: "",
};

const tableHeaders = [
  "Ordernummer",
  "Orderdatum",
  "Status",
  "Product",
  "Leverancier",
  "Aantal",
  "Comment",
];

const PurchasingPage = () => {
  // Example initial data
  const [orders, setOrders] = useState<PurchaseOrder[]>([
    {
      orderNumber: "PO001",
      orderDate: "2025-06-25",
      status: "In behandeling",
      product: products[0],
      supplier: suppliers[1],
      quantity: 20,
      comment: "Spoed",
    },
  ]);
  const [newOrders, setNewOrders] = useState<PurchaseOrder[]>([
    { ...emptyPurchaseOrder },
  ]);
  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  // Handle changes for new order rows
  const handleNewOrderChange = (
    idx: number,
    field: keyof PurchaseOrder,
    value: any,
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
    setNewOrders((prev) => [...prev, { ...emptyPurchaseOrder }]);
  };

  const removeNewOrderRow = (idx: number) => {
    setNewOrders((prev) => prev.filter((_, i) => i !== idx));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });
  };

  const submitOrders = async () => {
    let hasError = false;
    newOrders.forEach((order, idx) => {
      if (
        !order.orderNumber ||
        !order.orderDate ||
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

    // Here you would POST to your backend
    setOrders((prev) => [...prev, ...newOrders]);
    setNewOrders([{ ...emptyPurchaseOrder }]);
    setErrors({});
    setSubmitMessage("Orders succesvol toegevoegd!");
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
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={idx}
                style={{ background: idx % 2 === 0 ? "#f5f5f5" : "#fff" }}
              >
                <td className={styles.td}>{order.orderNumber}</td>
                <td className={styles.td}>{order.orderDate}</td>
                <td className={styles.td}>{order.status}</td>
                <td className={styles.td}>{order.product?.name || ""}</td>
                <td className={styles.td}>{order.supplier?.name || ""}</td>
                <td className={styles.td}>{order.quantity}</td>
                <td className={styles.td}>{order.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
