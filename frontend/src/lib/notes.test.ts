import { describe, expect, it } from "vitest";
import { ajouterNote, formatNotesCapturees } from "./notes";

describe("formatNotesCapturees", () => {
  it("indique l'absence de note quand le compteur est à 0", () => {
    expect(formatNotesCapturees(0)).toBe("✦ Aucune note capturée pour l'instant");
  });

  it("accorde au singulier pour une seule note", () => {
    expect(formatNotesCapturees(1)).toBe("✦ Notes capturées : 1 point clé repéré pendant l'échange");
  });

  it("accorde au pluriel pour plusieurs notes", () => {
    expect(formatNotesCapturees(3)).toBe(
      "✦ Notes capturées : 3 points clés repérés pendant l'échange",
    );
  });
});

describe("ajouterNote", () => {
  it("ajoute un texte non vide à la liste", () => {
    expect(ajouterNote([], "L'enfant semble serein")).toEqual(["L'enfant semble serein"]);
  });

  it("ignore un texte vide ou composé uniquement d'espaces", () => {
    expect(ajouterNote(["existante"], "   ")).toEqual(["existante"]);
  });

  it("nettoie les espaces en début et fin avant d'ajouter", () => {
    expect(ajouterNote([], "  une note  ")).toEqual(["une note"]);
  });
});
