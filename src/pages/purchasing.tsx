import React, { useState } from "react";
import styles from "./purchasing.module.scss";

const leveranciers = ["Supplier A", "Supplier B", "Supplier C"];
const producttypes = ["Type A", "Type B", "Type C"];
const statuses = ["In behandeling", "Goedgekeurd", "Geweigerd"];
const frequenties = ["Wekelijks", "Maandelijks", "Jaarlijks"];

const DottedGraph: React.FC = () => (
  <svg
    className={styles.dottedGraphSvg}
    width="320"
    height="180"
    viewBox="0 0 320 180"
  >
    {/* Axes */}
    <line x1="40" y1="10" x2="40" y2="160" stroke="#888" strokeWidth="2" />
    <line x1="40" y1="160" x2="300" y2="160" stroke="#888" strokeWidth="2" />
    {/* Y axis label */}
    <text
      x="10"
      y="90"
      textAnchor="middle"
      fontSize="12"
      fill="#222"
      transform="rotate(-90 15,90)"
    >
      Aantal bestellingen
    </text>
    {/* X axis label */}
    <text x="170" y="175" textAnchor="middle" fontSize="12" fill="#222">
      Tijd
    </text>
    {/* Dots (placeholder data) */}
    <circle cx="60" cy="120" r="4" fill="#1976d2" />
    <circle cx="90" cy="100" r="4" fill="#1976d2" />
    <circle cx="120" cy="110" r="4" fill="#1976d2" />
    <circle cx="150" cy="80" r="4" fill="#1976d2" />
    <circle cx="180" cy="70" r="4" fill="#1976d2" />
    <circle cx="210" cy="60" r="4" fill="#1976d2" />
    <circle cx="240" cy="50" r="4" fill="#1976d2" />
    <circle cx="270" cy="40" r="4" fill="#1976d2" />
    {/* Trendline (placeholder) */}
    <line
      x1="60"
      y1="120"
      x2="270"
      y2="40"
      stroke="#e53935"
      strokeWidth="2"
      strokeDasharray="4"
    />
  </svg>
);

const tableHeaders = [
  "OrderId",
  "Leverancier",
  "Producttype",
  "Aantal",
  "Orderdatum",
  "Status",
  "Bestel frequentie",
  "Comment",
];

const PurchasingPage = () => {
  const [rows, setRows] = useState([
    {
      orderId: "STR02",
      leverancier: "Supplier B",
      producttype: "Type Y",
      aantal: "20",
      orderdatum: "2024-06-24",
      status: "In behandeling",
      frequentie: "Maandelijks",
      comment: "Spoed",
    },
    ...Array(9).fill({
      orderId: "",
      leverancier: "",
      producttype: "",
      aantal: "",
      orderdatum: "",
      status: "",
      frequentie: "",
      comment: "",
    }),
  ]);

  const [frequentieModalIdx, setFrequentieModalIdx] = useState<number | null>(
    null,
  );
  const [aantalErrors, setAantalErrors] = useState<{ [key: number]: string }>(
    {},
  );

  const handleChange = (idx: number, field: string, value: string) => {
    if (field === "aantal") {
      const num = Number(value);
      if (value === "" || isNaN(num) || num < 0 || num > 9999) {
        setAantalErrors((prev) => ({
          ...prev,
          [idx]: "Voer een getal in tussen 0 en 9999",
        }));
      } else {
        setAantalErrors((prev) => {
          const copy = { ...prev };
          delete copy[idx];
          return copy;
        });
      }
    }
    setRows((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, [field]: value } : row)),
    );
  };

  return (
    <div className={styles.container}>
      {/* Page Title */}
      <div className={styles.pageTitle}>
        <div className={styles.titleText}>Inkoop</div>
      </div>

      {/* Table */}
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
            {rows.map((row, idx) => (
              <tr
                key={idx}
                style={{ background: idx % 2 === 0 ? "#f5f5f5" : "#fff" }}
              >
                <td className={styles.td}>
                  <input
                    type="text"
                    className={styles.tableButton}
                    value={row.orderId}
                    onChange={(e) =>
                      handleChange(idx, "orderId", e.target.value)
                    }
                    placeholder="OrderId"
                  />
                </td>
                <td className={styles.td}>
                  <select
                    className={styles.tableButton}
                    value={row.leverancier}
                    onChange={(e) =>
                      handleChange(idx, "leverancier", e.target.value)
                    }
                  >
                    <option value="">Leverancier</option>
                    {leveranciers.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </td>
                <td className={styles.td}>
                  <select
                    className={styles.tableButton}
                    value={row.producttype}
                    onChange={(e) =>
                      handleChange(idx, "producttype", e.target.value)
                    }
                  >
                    <option value="">Producttype</option>
                    {producttypes.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </td>
                <td className={styles.td}>
                  <input
                    type="number"
                    min={0}
                    max={9999}
                    className={`${styles.tableButton} ${aantalErrors[idx] ? styles.inputError : ""}`}
                    value={row.aantal}
                    onChange={(e) =>
                      handleChange(idx, "aantal", e.target.value)
                    }
                    placeholder="Aantal"
                  />
                  {aantalErrors[idx] && (
                    <div className={styles.errorTooltip}>
                      {aantalErrors[idx]}
                    </div>
                  )}
                </td>
                <td className={styles.td}>
                  <input
                    type="date"
                    className={styles.tableButton}
                    value={row.orderdatum}
                    onChange={(e) =>
                      handleChange(idx, "orderdatum", e.target.value)
                    }
                  />
                </td>
                <td className={styles.td}>
                  <select
                    className={styles.tableButton}
                    value={row.status}
                    onChange={(e) =>
                      handleChange(idx, "status", e.target.value)
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
                    value={row.frequentie}
                    onChange={(e) =>
                      handleChange(idx, "frequentie", e.target.value)
                    }
                  >
                    <option value="">Bestel frequentie</option>
                    {frequenties.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </td>
                <td className={styles.td}>
                  <input
                    type="text"
                    className={styles.tableButton}
                    value={row.comment}
                    onChange={(e) =>
                      handleChange(idx, "comment", e.target.value)
                    }
                    placeholder="Comment"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Frequentie Modal */}
      {frequentieModalIdx !== null && (
        <div
          className={styles.modalOverlay}
          onClick={() => setFrequentieModalIdx(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setFrequentieModalIdx(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h3>Frequentie Bestelling Overzicht</h3>
            <div className={styles.modalChartsRow}>
              <DottedGraph />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchasingPage;
