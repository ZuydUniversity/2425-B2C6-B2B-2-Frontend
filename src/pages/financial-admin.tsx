import React, { FC } from "react";
import styles from "./financial-admin.module.scss";

const FinancialAdminPage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Financieel Overzicht</h1>

      {/* Kosten Sectie */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Kosten</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Inkopen:</p>
            <p className={styles.cardValue}>€ ____</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Huisvesting:</p>
            <p className={styles.cardValue}>€ ____</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Personeel:</p>
            <p className={styles.cardValue}>€ ____</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Fouten:</p>
            <p className={styles.cardValue}>€ ____</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Leverkosten:</p>
            <p className={styles.cardValue}>€ ____</p>
          </div>
        </div>
      </section>

      {/* Opbrengsten Sectie */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Opbrengsten</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Aantal verkopen:</p>
            <p className={styles.cardValue}>____</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Prijs per verkoop:</p>
            <p className={styles.cardValue}>€ ____</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Totale omzet:</p>
            <p className={styles.cardValue}>€ ____</p>
          </div>
        </div>
      </section>

      {/* Resultaat Sectie */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Resultaat</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Omzet:</p>
            <p className={styles.cardValue}>€ ____</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Kosten:</p>
            <p className={styles.cardValue}>€ ____</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Winst/Verlies:</p>
            <p
              className={styles.cardValue}
              style={{ fontWeight: "bold", color: "#27ae60" }}
            >
              € ____
            </p>{" "}
            {/* Winst extra benadrukt */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancialAdminPage;
