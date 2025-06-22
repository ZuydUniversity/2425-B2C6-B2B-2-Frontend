import React, { useState } from "react";
import styles from "./inventory-management.module.scss";

const TableButton: React.FC<{ label: string; onClick?: () => void }> = ({
  label,
  onClick,
}) => (
  <button className={styles.tableButton} onClick={onClick} type="button">
    {label}
  </button>
);

// PieChart with green for percent and red for the remainder
const PieChart: React.FC<{ percent: number; label: string }> = ({
  percent,
  label,
}) => {
  // Helper to create arc path
  const describeArc = (startAngle: number, endAngle: number, color: string) => {
    const radius = 50;
    const start = {
      x: 50 + radius * Math.cos((Math.PI / 180) * (startAngle - 90)),
      y: 50 + radius * Math.sin((Math.PI / 180) * (startAngle - 90)),
    };
    const end = {
      x: 50 + radius * Math.cos((Math.PI / 180) * (endAngle - 90)),
      y: 50 + radius * Math.sin((Math.PI / 180) * (endAngle - 90)),
    };
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    return (
      <path
        d={`
          M 50 50
          L ${start.x} ${start.y}
          A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
          Z
        `}
        fill={color}
      />
    );
  };

  const goodAngle = (percent / 100) * 360;

  return (
    <svg width="120" height="120" viewBox="0 0 100 100" style={{ margin: 16 }}>
      {/* Remaining (red) */}
      {describeArc(goodAngle, 360, "#e53935")}
      {/* Good (green) */}
      {describeArc(0, goodAngle, "#4caf50")}
      <circle
        cx="50"
        cy="50"
        r="50"
        fill="none"
        stroke="#eee"
        strokeWidth="1"
      />
      <text x="50" y="55" textAnchor="middle" fontSize="16" fill="#222">
        {percent}%
      </text>
      <text x="50" y="90" textAnchor="middle" fontSize="10" fill="#555">
        {label}
      </text>
    </svg>
  );
};

const InventoryPage = () => {
  const [rows, setRows] = useState([
    {
      productId: "1001",
      leverancier: "Supplier A",
      producttype: "Type X",
      aantal: "50",
      kwaliteit: "8.5",
      frequentie: "Wekelijks",
      comment: "OK",
    },
    ...Array(9).fill({
      productId: "",
      leverancier: "",
      producttype: "",
      aantal: "",
      kwaliteit: "",
      frequentie: "",
      comment: "",
    }),
  ]);

  const [kwaliteitModalIdx, setKwaliteitModalIdx] = useState<number | null>(
    null,
  );

  const handleAantalChange = (idx: number, value: string) => {
    const num = Number(value);
    if (isNaN(num) || num < 0 || num > 9999) return;
    setRows((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, aantal: value } : row)),
    );
  };

  const handleCommentChange = (idx: number, value: string) => {
    setRows((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, comment: value } : row)),
    );
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>Overzicht Voorraadbeheer</div>

      {/* Page Title */}
      <div className={styles.pageTitle}>
        <div className={styles.titleText}>Voorraadbeheer</div>
        <div className={styles.separator} />
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>ProductID</th>
              <th className={styles.th}>Leverancier</th>
              <th className={styles.th}>Producttype</th>
              <th className={styles.th}>Aantal</th>
              <th className={styles.th}>Kwaliteitcheck score</th>
              <th className={styles.th}>Frequentie levering</th>
              <th className={styles.th}>Comment</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                style={{ background: idx % 2 === 0 ? "#f5f5f5" : "#fff" }}
              >
                <td className={styles.buttonCell}>
                  <TableButton label={row.productId || "ProductID"} />
                </td>
                <td className={styles.buttonCell}>
                  <TableButton label={row.leverancier || "Leverancier"} />
                </td>
                <td className={styles.buttonCell}>
                  {row.producttype || "Producttype"}
                </td>
                <td className={styles.buttonCell}>
                  <input
                    type="number"
                    min={0}
                    max={9999}
                    className={styles.tableButton}
                    value={row.aantal}
                    onChange={(e) => handleAantalChange(idx, e.target.value)}
                  />
                </td>
                <td className={styles.buttonCell}>
                  <TableButton
                    label={row.kwaliteit || "Kwaliteit"}
                    onClick={() => setKwaliteitModalIdx(idx)}
                  />
                </td>
                <td className={styles.buttonCell}>
                  <TableButton label={row.frequentie || "Frequentie"} />
                </td>
                <td className={styles.buttonCell}>
                  <input
                    type="text"
                    className={styles.tableButton}
                    value={row.comment}
                    onChange={(e) => handleCommentChange(idx, e.target.value)}
                    placeholder="Comment"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Kwaliteit Modal */}
      {kwaliteitModalIdx !== null && (
        <div
          className={styles.modalOverlay}
          onClick={() => setKwaliteitModalIdx(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setKwaliteitModalIdx(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h3>Kwaliteit Overzicht</h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PieChart percent={90} label="Laatste 50 leveringen" />
              <PieChart percent={85} label="All time" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
