import Link from "next/link";
import { useState } from "react";
import styles from "./navbar.module.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pages = [
    { name: "Productie", href: "/productie" },
    { name: "Accountmanagement", href: "/accountmanagement" },
    { name: "Planning", href: "/planning" },
    { name: "Inkoop", href: "/inkoop" },
    { name: "Voorraadbeheer", href: "/voorraadbeheer" },
    { name: "Expeditie", href: "/expeditie" },
    { name: "FinanciëleAdministratie", href: "/financieleadministratie" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftGroup}>
        <span className={styles.logo}>Logo</span>
        <Link href="/" className={styles.linkButton}>
          Startpagina
        </Link>
        <div className={styles.separator}></div>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setOpen(!open)}
            className={styles.dropdownButton}
            aria-haspopup="true"
            aria-expanded={open}
          >
            Overzichten <span className={styles.arrow}>▼</span>
          </button>
          {open && (
            <ul className={styles.dropdownMenu}>
              {pages.map((p) => (
                <li key={p.name}>
                  <Link href={p.href} className={styles.dropdownLink}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Link href="/login" className={styles.loginLink}>
        Inloggen
      </Link>
    </nav>
  );
};

export default Navbar;
