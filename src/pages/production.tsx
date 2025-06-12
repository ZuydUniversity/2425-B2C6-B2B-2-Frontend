import styles from "./production.module.scss";
import React from "react";

const sampleData = [
  {
    orderId: "ORD001",
    productType: "A",
    aantal: 10,
    productielijn: 1,
    leverdatum: "2025-06-15",
    status: "In productie",
  },
  {
    orderId: "ORD002",
    productType: "B",
    aantal: 5,
    productielijn: 2,
    leverdatum: "2025-06-16",
    status: "Wachten op onderdelen",
  },
  {
    orderId: "ORD003",
    productType: "C",
    aantal: 8,
    productielijn: 3,
    leverdatum: "2025-06-17",
    status: "Afgerond",
  },
];

const ProductionPage = () => {
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
                    <td>
                      <button className={styles.button}>Status wijzigen</button>
                    </td>
                    <td>
                      <button className={styles.button}>Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductionPage;
