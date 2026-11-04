const CLE_STOCKAGE = "notesCapturees";

export function formatNotesCapturees(count: number): string {
  if (count <= 0) {
    return "✦ Aucune note capturée pour l'instant";
  }
  const point = count === 1 ? "point clé repéré" : "points clés repérés";
  return `✦ Notes capturées : ${count} ${point} pendant l'échange`;
}

export function ajouterNote(notes: string[], texte: string): string[] {
  const texteNettoye = texte.trim();
  if (texteNettoye === "") return notes;
  return [...notes, texteNettoye];
}

export function lireNotes(): string[] {
  if (typeof window === "undefined") return [];
  const brut = window.localStorage.getItem(CLE_STOCKAGE);
  if (!brut) return [];
  try {
    const valeur = JSON.parse(brut);
    return Array.isArray(valeur) ? valeur : [];
  } catch {
    return [];
  }
}

export function enregistrerNote(texte: string): string[] {
  const notes = ajouterNote(lireNotes(), texte);
  window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(notes));
  return notes;
}
