"use client";

import { useState } from "react";
import Link from "next/link";
import { incrementerNotesCapturees, lireNotesCapturees } from "../lib/notes";
import styles from "./page.module.css";

export default function Home() {
  const [notesCapturees, setNotesCapturees] = useState(() =>
    typeof window === "undefined" ? 0 : lireNotesCapturees(),
  );

  return (
    <div className={styles.page}>
      <div className={styles.phone}>
        <div className={styles.header}>
          <div className={styles.labelService}>Intervention en cours</div>
          <h1>Famille Martin</h1>
          <div className={styles.subtitle}>Mesure AEMO · depuis le 14 mars 2025</div>
        </div>

        <div className={styles.relationsArea}>
          <div className={styles.areaLabel}>Acteurs de la situation</div>
          <div className={styles.relationsDiagram}>
            <div className={styles.actorBubble}>
              Enfant
              <br />
              <span className={styles.actorMeta}>Léa, 9 ans</span>
            </div>
            <div className={styles.actorBubble}>
              Juge
              <br />
              <span className={styles.actorMeta}>Mme Perrin</span>
            </div>
            <div className={`${styles.actorBubble} ${styles.central}`}>
              Assistant social
              <br />
              <span className={styles.actorMeta}>Moi</span>
            </div>
          </div>
          <div className={styles.parentRow}>→ Parent · M. Martin</div>
        </div>

        <div className={styles.sectionTitle}>Que faire maintenant ?</div>
        <div className={styles.actionList}>
          <button
            type="button"
            className={styles.actionItem}
            onClick={() => setNotesCapturees(incrementerNotesCapturees())}
          >
            <span className={styles.actionItemText}>
              Capturer ce que j&apos;entends
              {notesCapturees > 0 && <span className={styles.badge}>{notesCapturees}</span>}
            </span>
            <span className={styles.actionItemArrow}>›</span>
          </button>
          <Link href="/rapport" className={styles.actionItem}>
            <span className={styles.actionItemText}>Rédiger le rapport d&apos;intervention</span>
            <span className={styles.actionItemArrow}>›</span>
          </Link>
          <Link href="/rapport" className={styles.actionItem}>
            <span className={styles.actionItemText}>Envoyer au magistrat</span>
            <span className={styles.actionItemArrow}>›</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
