import React, { FC, useEffect, useState } from "react";
import styles from "./financial-admin.module.scss";

interface FinanceData {
  inkopen: number;
  fouten: number;
  leverkosten: number;
  aantalVerkopen: number;
  prijsPerVerkoop: number;
}

const FinancialAdminPage: FC = () => {
  const [financeData, setFinanceData] = useState<FinanceData | null>(null);

  useEffect(() => {
    const fetchFinance = async () => {
      try {
        const response = await fetch("http://10.0.2.4:8080/api/finance");
        if (!response.ok) throw new Error("Fout bij ophalen financiële data");
        const data = await response.json();
        setFinanceData(data);
      } catch {
        console.warn("API niet bereikbaar, gebruik dummydata");
        setFinanceData({
          inkopen: 50000,
          fouten: 15000,
          leverkosten: 10000,
          aantalVerkopen: 20,
          prijsPerVerkoop: 70000,
        });
      }
    };

    fetchFinance();
  }, []);

  if (!financeData) return <div>Bezig met laden...</div>;

  const { inkopen, fouten, leverkosten, aantalVerkopen, prijsPerVerkoop } =
    financeData;

  const totaleKosten = inkopen + fouten + leverkosten + 100000 + 300000;
  const totaleOmzet = aantalVerkopen * prijsPerVerkoop;
  const winst = totaleOmzet - totaleKosten;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Financieel Overzicht</h1>

      {/* Kosten Sectie */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Kosten</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Inkopen:</p>
            <p className={styles.cardValue}>€ {inkopen.toLocaleString()}</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Huisvesting:</p>
            <p className={styles.cardValue}>€ 100.000</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Personeel:</p>
            <p className={styles.cardValue}>€ 300.000</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Fouten:</p>
            <p className={styles.cardValue}>€ {fouten.toLocaleString()}</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Leverkosten:</p>
            <p className={styles.cardValue}>€ {leverkosten.toLocaleString()}</p>
          </div>
        </div>
      </section>

      {/* Opbrengsten Sectie */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Opbrengsten</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Aantal verkopen:</p>
            <p className={styles.cardValue}>{aantalVerkopen}</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Prijs per verkoop:</p>
            <p className={styles.cardValue}>
              € {prijsPerVerkoop.toLocaleString()}
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Totale omzet:</p>
            <p className={styles.cardValue}>€ {totaleOmzet.toLocaleString()}</p>
          </div>
        </div>
      </section>

      {/* Resultaat Sectie */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Resultaat</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Omzet:</p>
            <p className={styles.cardValue}>€ {totaleOmzet.toLocaleString()}</p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Kosten:</p>
            <p className={styles.cardValue}>
              € {totaleKosten.toLocaleString()}
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Winst/Verlies:</p>
            <p
              className={styles.cardValue}
              style={{
                fontWeight: "bold",
                color: winst >= 0 ? "#27ae60" : "#e74c3c",
              }}
            >
              € {winst.toLocaleString()}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancialAdminPage;
