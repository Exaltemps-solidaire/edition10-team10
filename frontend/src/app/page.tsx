"use client";

import { useState } from "react";
import Link from "next/link";
import { enregistrerNote, lireNotes } from "../lib/notes";
import styles from "./page.module.css";

export default function Home() {
  const [notes, setNotes] = useState<string[]>(() =>
    typeof window === "undefined" ? [] : lireNotes(),
  );
  const [captureOuverte, setCaptureOuverte] = useState(false);
  const [texteNote, setTexteNote] = useState("");

  function validerNote() {
    const majour = enregistrerNote(texteNote);
    if (majour.length !== notes.length) {
      setNotes(majour);
      setTexteNote("");
      setCaptureOuverte(false);
    }
  }

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
            onClick={() => setCaptureOuverte(true)}
          >
            <span className={styles.actionItemText}>
              Capturer ce que j&apos;entends
              {notes.length > 0 && <span className={styles.badge}>{notes.length}</span>}
            </span>
            <span className={styles.actionItemArrow}>›</span>
          </button>

          {captureOuverte && (
            <div className={styles.captureForm}>
              <textarea
                className={styles.captureInput}
                value={texteNote}
                onChange={(e) => setTexteNote(e.target.value)}
                placeholder="Ce que je retiens de l'échange..."
                rows={3}
                autoFocus
              />
              <button type="button" className={styles.captureValider} onClick={validerNote}>
                Valider la note
              </button>
            </div>
          )}

          <Link href="/rapport" className={styles.actionItem}>
            <span className={styles.actionItemText}>Rédiger le rapport d&apos;intervention</span>
            <span className={styles.actionItemArrow}>›</span>
          </Link>
          <Link href="/rapport" className={styles.actionItem}>
            <span className={styles.actionItemText}>Envoyer au magistrat</span>
            <span className={styles.actionItemArrow}>›</span>
          </Link>
        </div>

        {notes.length > 0 && (
          <div className={styles.notesListe}>
            <div className={styles.sectionTitle}>Notes capturées</div>
            <ul className={styles.notesItems}>
              {notes.map((note, i) => (
                <li key={i} className={styles.noteItem}>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
