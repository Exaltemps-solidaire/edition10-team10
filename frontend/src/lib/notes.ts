const CLE_STOCKAGE = "notesCapturees";

export function formatNotesCapturees(count: number): string {
  if (count <= 0) {
    return "✦ Aucune note capturée pour l'instant";
  }
  const point = count === 1 ? "point clé repéré" : "points clés repérés";
  return `✦ Notes capturées : ${count} ${point} pendant l'échange`;
}

export function lireNotesCapturees(): number {
  if (typeof window === "undefined") return 0;
  const brut = window.localStorage.getItem(CLE_STOCKAGE);
  const valeur = brut ? parseInt(brut, 10) : 0;
  return Number.isNaN(valeur) ? 0 : valeur;
}

export function incrementerNotesCapturees(): number {
  const valeur = lireNotesCapturees() + 1;
  window.localStorage.setItem(CLE_STOCKAGE, String(valeur));
  return valeur;
}
