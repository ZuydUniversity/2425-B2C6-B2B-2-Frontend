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
    <svg
      className={styles.pieChartSvg}
      width="120"
      height="120"
      viewBox="0 0 100 100"
    >
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
      Aantal leveringen
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
  const [frequentieModalIdx, setFrequentieModalIdx] = useState<number | null>(
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
                  <TableButton
                    label={row.frequentie || "Frequentie"}
                    onClick={() => setFrequentieModalIdx(idx)}
                  />
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
            <div className={styles.modalChartsRow}>
              <PieChart percent={90} label="Laatste 50 leveringen" />
              <PieChart percent={85} label="All time" />
            </div>
          </div>
        </div>
      )}

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
            <h3>Frequentie Levering Overzicht</h3>
            <div className={styles.modalChartsRow}>
              <DottedGraph />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default InventoryPage;
