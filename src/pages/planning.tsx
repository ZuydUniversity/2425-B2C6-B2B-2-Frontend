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
  const [blauw, setBlauw] = useState("");
  const [rood, setRood] = useState("");
  const [grijs, setGrijs] = useState("");
  const [productieLijn, setProductieLijn] = useState(""); // Nieuwe state voor productielijn

  const planningDisplayItems: PlanningItem[] = [
    { type: "", periode: "", aantal: null, orderId: null },
    { type: "", periode: "", aantal: null, orderId: null },
    { type: "", periode: "", aantal: null, orderId: null },
  ];

  const productionLineStatuses: ProductionLineStatus[] = [
    { line: "Productielijn A", ordersInProgress: null },
    { line: "Productielijn B", ordersInProgress: null },
    { line: "Productielijn C", ordersInProgress: null },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const blauwAantal = Number(blauw);
    const roodAantal = Number(rood);
    const grijsAantal = Number(grijs);

    console.log("Blauw:", blauwAantal);
    console.log("Rood:", roodAantal);
    console.log("Grijs:", grijsAantal);
    console.log("Productielijn:", productieLijn); // Log de productielijn

    alert(
      `Aantallen ingevoerd: Blauw=${blauwAantal}, Rood=${roodAantal}, Grijs=${grijsAantal}, Productielijn=${productieLijn}`,
    );

    setBlauw("");
    setRood("");
    setGrijs("");
    setProductieLijn("");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Planningsoverzicht</h1>

      <div className={styles.contentWrapper}>
        {" "}
        {/* Nieuwe wrapper voor flex layout */}
        {/* Sectie voor Productielijn Status (links) */}
        <section className={styles.productionLineStatusSection}>
          <h2 className={styles.sectionTitle}>Productielijnen Status</h2>
          <div className={styles.statusList}>
            {productionLineStatuses.map((status, index) => (
              <div key={index} className={styles.statusItem}>
                <span className={styles.statusLineName}>{status.line}:</span>
                <span className={styles.statusOrders}>
                  Benodigde tijd:{" "}
                  {status.ordersInProgress !== null
                    ? status.ordersInProgress
                    : "____"}
                </span>
              </div>
            ))}
          </div>
        </section>
        <div className={styles.mainContent}>
          {" "}
          {/* Wrapper voor planning en formulier */}
          {/* Huidige Planning Sectie (rechtsboven) */}
          <section className={styles.planningSection}>
            <h2 className={styles.sectionTitle}>Huidige Planning</h2>
            <div className={styles.grid}>
              {planningDisplayItems.map((_, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardTypePlaceholder}>
                      Type: ____
                    </span>
                    <span className={styles.cardOrderId}>OrderID: ____</span>
                  </div>
                  <div className={styles.cardBody}>
                    <p>
                      <strong>Periode:</strong> ____
                    </p>
                    <p>
                      <strong>Aantal:</strong> ____
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Formulier Sectie (rechtsonder) */}
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Aantal blokjes invoeren</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="blauw" className={styles.inputLabel}>
                  Aantal blauwe blokjes:
                </label>
                <input
                  id="blauw"
                  type="number"
                  value={blauw}
                  onChange={(e) => setBlauw(e.target.value)}
                  className={styles.inputField}
                  min="0"
                  placeholder="Voer aantal in"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="rood" className={styles.inputLabel}>
                  Aantal rode blokjes:
                </label>
                <input
                  id="rood"
                  type="number"
                  value={rood}
                  onChange={(e) => setRood(e.target.value)}
                  className={styles.inputField}
                  min="0"
                  placeholder="Voer aantal in"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="grijs" className={styles.inputLabel}>
                  Aantal grijze blokjes:
                </label>
                <input
                  id="grijs"
                  type="number"
                  value={grijs}
                  onChange={(e) => setGrijs(e.target.value)}
                  className={styles.inputField}
                  min="0"
                  placeholder="Voer aantal in"
                />
              </div>

              {/* NIEUW: Productielijn Invoer Veld */}
              <div className={styles.inputGroup}>
                <label htmlFor="productielijn" className={styles.inputLabel}>
                  Productielijn:
                </label>
                <input
                  id="productielijn"
                  type="text"
                  value={productieLijn}
                  onChange={(e) => setProductieLijn(e.target.value)}
                  className={styles.inputField}
                  placeholder="Bijv. Lijn A, Lijn B"
                />
              </div>

              <button type="submit" className={styles.formButton}>
                Planning Bevestigen
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PlanningPage;
