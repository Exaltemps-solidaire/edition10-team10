"use client";

import { useState } from "react";
import Link from "next/link";
import { formatNotesCapturees, lireNotesCapturees } from "../../lib/notes";
import styles from "./page.module.css";

const RAPPORT =
  "Lors de la visite du 18 juin 2025, Léa était présente avec son père. L'enfant s'exprime librement et paraît sereine à domicile. Le père rapporte une amélioration de la situation scolaire. Aucun élément de préoccupation immédiate n'a été relevé. Une prochaine visite est envisagée avant la rentrée.";

export default function Rapport() {
  const [envoye, setEnvoye] = useState(false);
  const [notesCapturees] = useState(() =>
    typeof window === "undefined" ? 0 : lireNotesCapturees(),
  );

  return (
    <div className={styles.page}>
      <div className={styles.phone}>
        <div className={styles.header}>
          <div className={styles.labelService}>Rapport d&apos;intervention</div>
          <h1>Famille Martin</h1>
          <div className={styles.subtitle}>Visite du 18 juin 2025 · 14 h 30</div>
        </div>

        <div className={styles.feedbackBanner}>
          Cet écran est en cours de réflexion – son contenu reste à préciser.
        </div>

        <div className={styles.noteCapture}>{formatNotesCapturees(notesCapturees)}</div>

        <div className={styles.rapportBloc}>
          <span className={styles.tagIa}>Rédigé par l&apos;assistant</span>
          <p className={styles.rapportTexte}>{RAPPORT}</p>
        </div>

        <button type="button" className={styles.btnPrimary} onClick={() => setEnvoye(true)}>
          {envoye ? "Envoyé ✓" : "Envoyer au magistrat"}
        </button>
        <Link href="/" className={styles.btnSecondary}>
          Reprendre plus tard
        </Link>
      </div>
    </div>
  );
}
