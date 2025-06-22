import React from "react";
import styles from "./purchasing.module.scss";

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
            {[...Array(10)].map((_, idx) => (
              <tr
                key={idx}
                style={{ background: idx % 2 === 0 ? "#f5f5f5" : "#fff" }}
              >
                {tableHeaders.map((header, colIdx) => (
                  <td key={colIdx} className={styles.td}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchasingPage;
