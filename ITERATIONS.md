# Itérations — Équipe 10 (La Sauvegarde du Nord, `G9QV8W`)

**Plan validé le 2026-10-30.**

- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans la passation).
- **Temps restant annoncé** : ~60 minutes, demandé le 2026-10-30.
- **Durée du tour de test PM Lab** : ~5 minutes.
- **Capacité** : chaque itération coûte au moins codage (≤10 min) + publication (~5 min) + tour de test (~5 min) = ~20 min. 60 min ÷ 20 min ⇒ **3 itérations au budget plein**, sans marge de dépassement.
- **Hors périmètre pour l'instant** : tout ce qui rend la capture audio réelle (Dictaphone/enregistrement — famille d'idées 1, sous-option la plus ambitieuse), l'agent IA de rédaction en vrai (famille d'idées 2 au-delà d'un texte pré-rédigé figé), la gestion de plusieurs dossiers/familles, l'envoi réel au magistrat.

⚠️ Budget tendu : 3 itérations à 20 min chacune remplissent exactement les 60 minutes, sans marge. Je m'arrête à 8 minutes de codage sur chaque itération pour te poser la question du dépassement, comme prévu par CLAUDE.md.

⚠️ Les hypothèses de version (`5-hypotheses.md`) et le plan de livraison (`6-plan-de-livraison.md`) sont « Pas encore produit » dans la passation : aucune itération ci-dessous ne peut donc cocher une hypothèse d'équipe. Je le note à chaque itération comme « aucune, non produite ».

---

## Itération 1 : Le parcours démarre sur l'écran « Vue de la situation », avec les données du prototype en dur

- **Dans le périmètre** :
  - Squelette publié selon le contrat de déployabilité (`.env.example`, `DEPLOIEMENT.md`, les deux services déjà posés restent inchangés).
  - Page d'accueil du front reproduisant l'écran 1 du prototype (`passation/prototype/index.html#screen-1`) : fiche « Famille Martin », schéma des acteurs (Enfant / Juge / Assistant / Parent), liste d'actions (« Capturer ce que j'entends », « Rédiger le rapport d'intervention », « Envoyer au magistrat »). Données en dur.
- **Hors périmètre** : navigation réelle vers l'écran 2, capture audio, génération IA.
- **Critères d'acceptation** :
  - Étant donné l'URL publique, quand on ouvre `/`, alors la fiche « Famille Martin » et le schéma des 3 acteurs s'affichent comme dans le prototype.
  - Étant donné l'écran affiché, quand on clique une des 3 actions, alors rien ne casse (lien inactif ou page statique, pas d'erreur visible).
  - Étant donné le déploiement, quand on appelle `/health` et `/sante`, alors les deux répondent 200.
- **Hypothèse de l'équipe couverte** : aucune, non produite dans la passation.
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** : `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css` (ou CSS associé), `.env.example`, `DEPLOIEMENT.md`.
- **Tests unitaires prévus** : aucun calcul métier dans cette itération (balisage pur) → pas de test Vitest obligatoire ici ; si une petite fonction de formatage apparaît (ex. formatage de date), 1 test dessus.
- **Étapes ajoutées à la démo** (`e2e/demo.spec.ts`) : ouvrir `/`, vérifier le texte « Famille Martin ».
- **Bilan** :
  - Durée de codage réelle : 2 minutes (bien en dessous des 10 minutes, pas de dépassement).
  - Critères d'acceptation satisfaits : les 3 (fiche + schéma affichés, clic sur une action sans erreur, `/health` et `/sante` à 200).
  - `npm test` : 2 tests passent (aucun test unitaire ajouté : balisage pur, pas de logique métier dans cette itération).
  - Contrat de déployabilité : `./scripts/verifier-deployabilite.sh` → aucune borne, aucune alarme (`.env.example` et `DEPLOIEMENT.md` posés, Dockerfiles déjà conformes).
  - Déploiement : plateforme démarrée, images construites et poussées (`localhost:5000/team10/api:dev`, `localhost:5000/team10/frontend:dev`), `podman-compose.yml` écrit, conteneurs `team10_api_1` et `team10_frontend_1` up. `localhost:8080/` sert l'écran, `/health` et `/sante` à 200 sur les deux ports.
  - Version 1 signalée à PM Lab avec succès (`moteur_avance: false` — enregistrée quand même).
  - Démo (`e2e/demo.spec.ts`) mise à jour et verte (Playwright + Chromium installés, absents au départ du dépôt).
  - Rien n'a été bloqué par le harnais.
  - **Modifications** :
    - `frontend/src/app/page.tsx` : remplace le template par défaut par l'écran « Vue de la situation » (critère 1).
    - `frontend/src/app/page.module.css` : styles de l'écran, repris du prototype (critère 1).
    - `frontend/nginx.conf` : en-têtes de sécurité + repli SPA, CSP adaptée (retrait de `localhost:8501`/`:9000`, ajout de `script-src 'self'`) (critère 3 — contrat de déployabilité).
    - `frontend/Dockerfile`, `api/Dockerfile` : image de base qualifiée en `docker.io/library/...` (sinon résolution de nom échoue hors terminal interactif, bloquant le déploiement).
    - `.env.example`, `DEPLOIEMENT.md` : posés pour le contrat de déployabilité (critère 3).
    - `podman-compose.yml` : écrit à la racine, suit la recette du `/CLAUDE.md` du serveur (critère 4 — déploiement).
    - `e2e/demo.spec.ts` : étape ajoutée (vérifie la fiche famille affichée).

**Temps restant annoncé avant l'itération 2** : ~60 minutes ou plus (temps rallongé depuis la planification initiale).

## Itération 2 : Le parcours va jusqu'au rapport pré-rédigé, écran par écran

- **Dans le périmètre** :
  - Écran 2 du prototype (« Rédiger le rapport ») : bannière de notes capturées, tag « Rédigé par l'assistant », texte du rapport (en dur, repris du prototype), boutons « Envoyer au magistrat » / « Reprendre plus tard ».
  - Navigation réelle entre écran 1 et écran 2 (clic sur une action de l'écran 1 → écran 2 ; bouton « Reprendre plus tard » → retour écran 1).
- **Hors périmètre** : rapport réellement généré (reste un texte figé), capture audio réelle, envoi réel au magistrat (le bouton ne fait que naviguer ou rester sur place).
- **Critères d'acceptation** :
  - Étant donné l'écran 1, quand on clique « Rédiger le rapport d'intervention », alors l'écran 2 s'affiche avec le texte du rapport pré-rédigé.
  - Étant donné l'écran 2, quand on clique « Reprendre plus tard », alors on revient à l'écran 1.
  - Étant donné l'écran 2, quand on clique « Envoyer au magistrat », alors rien ne casse (pas d'erreur, retour visuel minimal).
- **Hypothèse de l'équipe couverte** : aucune, non produite dans la passation.
- **Codage estimé** : 9 minutes.
- **Fichiers prévus** : nouvelle route `frontend/src/app/rapport/page.tsx` (ou composant de bascule d'écran dans `page.tsx` selon ce qui va plus vite), styles associés, éventuel composant partagé pour la fiche famille.
- **Tests unitaires prévus** : si la navigation s'appuie sur une fonction pure (ex. résolveur d'état d'écran), 1 test dessus ; sinon aucun (balisage pur).
- **Étapes ajoutées à la démo** : cliquer « Rédiger le rapport d'intervention », vérifier le texte du rapport, cliquer « Reprendre plus tard », vérifier le retour écran 1.
- **Bilan** :
  - Durée de codage réelle : 4 minutes (bien en dessous des 10 minutes, pas de dépassement, pas d'alarme déclenchée).
  - Critères d'acceptation satisfaits : les 3 (navigation écran 1 → écran 2 avec le rapport affiché, « Reprendre plus tard » ramène à l'écran 1, « Envoyer au magistrat » ne casse rien — retour visuel minimal : le libellé du bouton passe à « Envoyé ✓ »).
  - `npm test` : 2 tests passent (aucun test unitaire ajouté : navigation et balisage purs, pas de nouvelle logique métier — conforme à ce qui était prévu).
  - Contrat de déployabilité : `./scripts/verifier-deployabilite.sh` → aucune borne, aucune alarme.
  - Déploiement : image frontend reconstruite et republiée (`localhost:5000/team10/frontend:dev`), l'API n'a pas changé donc pas reconstruite. `podman compose ... up -d --force-recreate` relancé. `localhost:8080/`, `/rapport`, `/health`, `/sante` à 200 ; `localhost:8081/health` et `/sante` à 200.
  - Version 2 signalée à PM Lab avec succès (`moteur_avance: false`).
  - Démo (`e2e/demo.spec.ts`) mise à jour avec les 2 nouvelles étapes (rédaction du rapport, retour écran 1), verte contre `localhost:8080`.
  - Rien n'a été bloqué par le harnais.
  - **Modifications** :
    - `frontend/src/app/page.tsx` : les 3 actions de l'écran 1 deviennent des `next/link` vers `/rapport` (critère 1).
    - `frontend/src/app/page.module.css` : `text-decoration: none` et `color: inherit` sur `.actionItem`, devenu un lien (critère 1 — rendu inchangé).
    - `frontend/src/app/rapport/page.tsx` : nouvel écran 2 (« Rédiger le rapport »), composant client pour le retour visuel minimal du bouton « Envoyer au magistrat », lien « Reprendre plus tard » vers `/` (critères 1, 2, 3).
    - `frontend/src/app/rapport/page.module.css` : styles de l'écran 2, repris du prototype.
    - `e2e/demo.spec.ts` : 2 étapes ajoutées (rédaction du rapport, retour à l'écran 1).

## Itération 3 : Stabilisation avant le pitch

- **Dans le périmètre** : selon le temps réellement restant après l'itération 2 (à redemander), corriger ce qui bloque la démo (affichage, liens morts, routes `/health` `/sante`), et seulement si le temps le permet, rendre la capture perceptible (ex. l'action « Capturer ce que j'entends » incrémente le nombre de « notes capturées » affiché en écran 2).
- **Hors périmètre** : tout ce qui est listé en hors-périmètre global ci-dessus.
- **Critères d'acceptation** : à préciser au moment de l'itération, selon ce qui reste à stabiliser.
- **Hypothèse de l'équipe couverte** : aucune, non produite dans la passation.
- **Codage estimé** : à redéfinir selon le temps restant réel (≤10 minutes).
- **Fichiers prévus** : à déterminer selon ce qui casse.
- **Tests unitaires prévus** : à déterminer.
- **Étapes ajoutées à la démo** : à déterminer.
- **Bilan** : _à remplir en fin d'itération._

## À venir (non détaillé)

- Rendre le texte du rapport réellement généré (dépendance nouvelle : accès LLM via `llm.internal` — à signaler ❗️ le moment venu).
- Rendre la capture audio réelle (Dictaphone / enregistrement d'entretien — famille d'idées 1 au complet).
- Gérer plusieurs dossiers/familles au lieu du seul cas « Famille Martin ».
- Envoi réel au magistrat (ou simulation plus poussée que le clic actuel).
