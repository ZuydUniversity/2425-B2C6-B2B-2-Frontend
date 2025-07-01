import React, { FC, useState } from "react";
import styles from "./planning.module.scss"; // Controleer dit pad!

interface PlanningItem {
  type: string;
  periode: string;
  aantal: number | null;
  orderId: string | null;
}

interface ProductionLineStatus {
  line: string;
  ordersInProgress: number | null;
}

const PlanningPage: FC = () => {
  // Verwijderd: blue, red, gray states
  const [productionLine, setProductionLine] = useState(""); // State voor geselecteerde productielijn
  const [selectedOrder, setSelectedOrder] = useState<PlanningItem | null>(null); // State voor de geselecteerde order

  // Voorbeelddata voor het overzicht: ALLEMAAL LEEG, zoals eerder afgesproken.
  // Ik heb hier dummy data met orderId's toegevoegd zodat je orders kunt selecteren.
  // Deze orderId's zouden in een echt scenario van de backend komen.
  const planningDisplayItems: PlanningItem[] = [
    { type: "A", periode: "Week 28", aantal: null, orderId: "ORD-001" },
    { type: "B", periode: "Week 29", aantal: null, orderId: "ORD-002" },
    { type: "C", periode: "Week 30", aantal: null, orderId: "ORD-003" },
    { type: "A", periode: "Week 31", aantal: null, orderId: "ORD-004" },
  ];

  // Dummy data voor het overzicht van productielijnen (placeholders)
  const productionLineStatuses: ProductionLineStatus[] = [
    { line: "Productielijn A", ordersInProgress: null }, // ordersInProgress is hier tijd
    { line: "Productielijn B", ordersInProgress: null },
    { line: "Productielijn C", ordersInProgress: null },
  ];

  const handleOrderSelect = (order: PlanningItem) => {
    setSelectedOrder(order);
    // Optioneel: scroll naar het formulier na selectie
    document
      .getElementById("planningForm")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOrder) {
      alert("Selecteer eerst een order uit de planning.");
      return;
    }

    if (!productionLine) {
      alert("Selecteer een productielijn.");
      return;
    }

    console.log("Geselecteerde Order ID:", selectedOrder.orderId);
    console.log("Toegewezen aan Productielijn:", productionLine);

    // Hier zou je de logica toevoegen om de data naar een backend te sturen
    alert(
      `Order ${selectedOrder.orderId} is ingepland op Productielijn: ${productionLine}.`,
    );

    // Reset de formuliervelden en de geselecteerde order na verzending
    setProductionLine("");
    setSelectedOrder(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Planningsoverzicht</h1>

      <div className={styles.contentWrapper}>
        {/* Sectie voor Productielijn Status (links) */}
        <section className={styles.productionLineStatusSection}>
          <h2 className={styles.sectionTitle}>Productielijnen Status</h2>
          <div className={styles.statusList}>
            {productionLineStatuses.map((status, index) => (
              <div key={index} className={styles.statusItem}>
                <span className={styles.statusLineName}>{status.line}:</span>
                <span className={styles.statusOrders}>
                  Tijd bezig:{" "}
                  {status.ordersInProgress !== null
                    ? `${status.ordersInProgress} uur` // Voorbeeld: toon als uren
                    : "____"}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.mainContent}>
          {/* Huidige Planning Sectie (rechtsboven) */}
          <section className={styles.planningSection}>
            <h2 className={styles.sectionTitle}>Orders om in te plannen</h2>
            <div className={styles.grid}>
              {planningDisplayItems.map((item, index) => (
                <div
                  key={item.orderId || index} // Gebruik orderId als key indien aanwezig
                  className={`${styles.card} ${selectedOrder?.orderId === item.orderId ? styles.selectedCard : ""}`}
                  onClick={() => handleOrderSelect(item)}
                >
                  <div className={styles.cardHeader}>
                    <span className={styles.cardTypePlaceholder}>
                      Type: {item.type || "____"}
                    </span>
                    <span className={styles.cardOrderId}>
                      OrderID: {item.orderId || "____"}
                    </span>
                  </div>
                  <div className={styles.cardBody}>
                    <p>
                      <strong>Periode:</strong> {item.periode || "____"}
                    </p>
                    <p>
                      <strong>Aantal:</strong>{" "}
                      {item.aantal !== null ? item.aantal : "____"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Formulier Sectie (rechtsonder) */}
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Order Inplannen</h2>
            <form onSubmit={handleSubmit} id="planningForm">
              {selectedOrder ? (
                <p className={styles.selectionInfo}>
                  Geselecteerde order: <strong>{selectedOrder.orderId}</strong>{" "}
                  (Type: {selectedOrder.type})
                </p>
              ) : (
                <p className={styles.selectionInfo}>
                  Selecteer een order uit het overzicht hierboven.
                </p>
              )}

              {/* Productielijn Invoer Veld */}
              <div className={styles.inputGroup}>
                <label htmlFor="productielijn" className={styles.inputLabel}>
                  Toewijzen aan Productielijn:
                </label>
                <input
                  id="productielijn"
                  type="text"
                  value={productionLine}
                  onChange={(e) => setProductionLine(e.target.value)}
                  className={styles.inputField}
                  placeholder="Bijv. Lijn A, Lijn B"
                />
              </div>

              <button
                type="submit"
                className={styles.formButton}
                disabled={!selectedOrder}
              >
                Order Inplannen
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PlanningPage;
