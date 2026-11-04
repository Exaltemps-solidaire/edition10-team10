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

**Temps restant annoncé avant l'itération 3** : ~30 minutes.

## Itération 3 : L'action « Capturer ce que j'entends » rend le nombre de notes capturées réel, au lieu d'un texte figé

- **Dans le périmètre** : rien ne bloque la démo actuelle (vérifié : navigation, `/health`, `/sante` tous au vert) — l'itération se consacre donc au petit plus prévu. L'action « Capturer ce que j'entends » de l'écran 1 n'ouvre plus l'écran 2 : elle incrémente un compteur de notes capturées (persisté en local, visible aussi sur l'écran 1). L'écran 2 affiche ce nombre réel (accord singulier/pluriel) à la place du texte figé « 3 points clés ».
- **Hors périmètre** : tout ce qui est listé en hors-périmètre global en tête de ce fichier (capture audio réelle, rapport généré par IA, multi-dossiers, envoi réel au magistrat).
- **Critères d'acceptation** :
  - Étant donné l'écran 1, quand je clique plusieurs fois « Capturer ce que j'entends », alors le nombre de notes capturées affiché augmente à chaque clic, sans naviguer.
  - Étant donné des notes capturées sur l'écran 1, quand j'ouvre l'écran 2, alors la bannière affiche ce nombre réel, avec un accord singulier/pluriel correct (0, 1, plusieurs).
  - Étant donné l'écran 2, les autres éléments (rapport, boutons « Envoyer au magistrat » / « Reprendre plus tard ») restent inchangés et fonctionnels.
- **Hypothèse de l'équipe couverte** : aucune, non produite dans la passation.
- **Codage estimé** : 8 minutes.
- **Fichiers prévus** : `frontend/src/lib/notes.ts` (fonction de formatage + lecture/écriture du compteur), `frontend/src/lib/notes.test.ts`, `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css`, `frontend/src/app/rapport/page.tsx`.
- **Tests unitaires prévus** : 3 tests Vitest sur la fonction de formatage (0 note, 1 note, plusieurs notes — accord singulier/pluriel).
- **Étapes ajoutées à la démo** : cliquer deux fois « Capturer ce que j'entends », ouvrir le rapport, vérifier que le nombre affiché est bien 2.
- **Bilan** :
  - Durée de codage réelle : 1 minute pour le compteur. Pas de dépassement, pas d'alarme.
  - ⚠️ **Trouvé en testant le clic réel (pas seulement en lisant le rendu HTML)** : le bouton « Capturer ce que j'entends » n'incrémentait rien du tout. Cause : la CSP posée en itération 1 (`script-src 'self'`) bloquait les `<script>` inline que l'export statique de Next.js embarque pour ses données RSC — React ne s'hydratait jamais (erreur React #412 en console), donc **aucun `onClick` de l'application ne répondait**, y compris le bouton « Envoyer au magistrat » de l'itération 2, qui n'avait jamais vraiment fonctionné non plus (son retour visuel n'était tout simplement jamais testé en clic réel). Corrigé en ajoutant `'unsafe-inline'` à `script-src` dans `frontend/nginx.conf` : seule option réaliste pour un export statique sans serveur capable de poser un nonce par requête. Compromis documenté en commentaire dans le fichier.
  - Critères d'acceptation satisfaits : les 3, **une fois le correctif CSP appliqué** (compteur incrémenté à chaque clic sans navigation, accord singulier/pluriel correct sur l'écran 2, reste de l'écran 2 inchangé).
  - `npm test` : 5 tests passent (2 existants + 3 nouveaux sur `formatNotesCapturees` : 0, 1, plusieurs notes).
  - Contrat de déployabilité : `./scripts/verifier-deployabilite.sh` → aucune borne, aucune alarme.
  - Déploiement : image frontend reconstruite deux fois (une pour la fonctionnalité, une pour le correctif CSP) et republiée. `podman compose ... up -d --force-recreate` relancé après chaque build. `localhost:8080/`, `/rapport`, `/health`, `/sante`, `localhost:8081/health`, `/sante` tous à 200.
  - Version 3 signalée à PM Lab avec succès (`moteur_avance: false`).
  - Démo (`e2e/demo.spec.ts`) mise à jour (double clic sur « Capturer... », vérification du nombre sur l'écran 2), verte contre `localhost:8080` seulement après le correctif CSP (elle échouait avant, confirmant le bug).
  - Rien n'a été bloqué par le harnais.
  - **Modifications** :
    - `frontend/src/lib/notes.ts` : fonction pure `formatNotesCapturees` (accord singulier/pluriel) + lecture/écriture du compteur en `localStorage` (critères 1, 2).
    - `frontend/src/lib/notes.test.ts` : 3 tests Vitest sur l'accord (0, 1, plusieurs) (DoD point 2).
    - `frontend/src/app/page.tsx` : « Capturer ce que j'entends » devient un bouton qui incrémente le compteur et affiche un badge, au lieu d'un lien vers l'écran 2 (critère 1).
    - `frontend/src/app/page.module.css` : styles du bouton (reset) et du badge (critère 1).
    - `frontend/src/app/rapport/page.tsx` : la bannière de notes capturées affiche le nombre réel au lieu du texte figé « 3 points clés » (critère 2).
    - `frontend/nginx.conf` : ajout de `'unsafe-inline'` à `script-src` dans la CSP — corrige l'hydratation React cassée depuis l'itération 1, bloquante pour tout clic de l'application (critères 1, 2, 3, et rétroactivement le critère 3 de l'itération 2).
    - `e2e/demo.spec.ts` : étape ajoutée (double capture + vérification du nombre sur l'écran 2).

---

## Replanification avant l'itération 4

**Plan validé le 2026-11-04.**

- **Temps restant annoncé** : 90 minutes, demandé le 2026-11-04.
- **Durée du tour de test PM Lab** : non précisée par le développeur ; 10 minutes retenues par défaut (règle du `CLAUDE.md` racine de l'app quand le développeur ne sait pas). ⚠️ À confirmer si elle s'avère différente.
- **Capacité** : chaque itération coûte au moins codage (≤10 min) + publication (~5 min) + tour de test (~10 min) = ~25 min. 90 min ÷ 25 min ⇒ **3 itérations au budget plein avec une petite marge** (~15 min).
- ⚠️ **Changement de périmètre par rapport au plan initial** : le temps supplémentaire (90 min contre 30 min restantes avant l'itération 3) permet de reprendre un point jusqu'ici exclu — « l'agent IA de rédaction en vrai » (famille d'idées 2, 9 points, priorité n°2 de l'équipe). Je le remets dans le périmètre pour l'itération 5 ci-dessous, avec une nouvelle dépendance à signaler (❗️, voir cette itération).
- **Toujours hors périmètre** : la capture audio réelle (Dictaphone/enregistrement — famille d'idées 1 au complet, sous-option la plus ambitieuse), la gestion de plusieurs dossiers/familles, l'envoi réel au magistrat.
- Détaillées ci-dessous : itérations 4 et 5. La suite reste une liste ordonnée, à détailler au fil de l'eau.

## Itération 4 : La capture devient une vraie note (texte), pas seulement un clic compté

- **Dans le périmètre** :
  - « Capturer ce que j'entends » ouvre un petit formulaire (un champ texte, inspiré de la « trame d'entretien » de la famille d'idées 1) au lieu d'incrémenter un compteur en un clic.
  - Valider le formulaire ajoute la note à une liste réelle (persistée en local comme aujourd'hui), affichée sur l'écran 1.
  - Le nombre de notes affiché sur l'écran 1 et la bannière de l'écran 2 restent corrects (dérivés de la liste, plus du seul compteur).
- **Hors périmètre** : capture audio réelle, trame structurée à plusieurs champs (un seul champ texte libre suffit), édition ou suppression d'une note existante.
- **Critères d'acceptation** :
  - Étant donné l'écran 1, quand je clique « Capturer ce que j'entends », alors un formulaire avec un champ texte s'affiche, sans naviguer.
  - Étant donné le formulaire ouvert, quand je saisis un texte et valide, alors la note s'ajoute à la liste affichée sur l'écran 1, le formulaire se ferme, et le nombre de notes augmente de 1.
  - Étant donné une tentative de validation avec un champ vide, alors aucune note n'est ajoutée (pas d'erreur visible nécessaire, juste rien ne se passe).
- **Hypothèse de l'équipe couverte** : aucune, non produite dans la passation.
- **Codage estimé** : 9 minutes.
- **Fichiers prévus** : `frontend/src/lib/notes.ts` (fonction `ajouterNote` pure + stockage de la liste au lieu du seul compteur), `frontend/src/lib/notes.test.ts`, `frontend/src/app/page.tsx` (formulaire + liste), `frontend/src/app/page.module.css`, `frontend/src/app/rapport/page.tsx` (lit la longueur de la liste au lieu du compteur).
- **Tests unitaires prévus** : 2 à 3 tests Vitest sur `ajouterNote` (ajoute une note valide, rejette un texte vide/blanc, le compteur dérivé suit la taille de la liste).
- **Étapes ajoutées à la démo** : ouvrir le formulaire, saisir un texte, valider, vérifier que la note apparaît dans la liste.
- **Bilan** :
  - Durée de codage réelle : 1 minute. Pas de dépassement, pas d'alarme.
  - Critères d'acceptation satisfaits : les 3 (formulaire ouvert sans navigation, note ajoutée à la liste visible sur l'écran 1 et compteur +1, validation avec un champ vide n'ajoute rien).
  - `npm test` : 6 tests passent (3 existants + 3 nouveaux sur `ajouterNote` : ajout valide, texte vide/blanc ignoré, espaces nettoyés).
  - `npm run build` (Next.js) : compile et type-check sans erreur.
  - Contrat de déployabilité : `./scripts/verifier-deployabilite.sh` → aucune borne, aucune alarme.
  - Déploiement : plateforme relancée (arrêtée au début de session), base `team10` recréée, image frontend reconstruite et republiée (`localhost:5000/team10/frontend:dev`), API inchangée donc pas reconstruite. `podman compose ... up -d --force-recreate`. `localhost:8080/`, `/health`, `/sante`, `localhost:8081/health`, `/sante` tous à 200. CSP de l'itération 3 toujours en place (`script-src 'self' 'unsafe-inline'`).
  - Version 4 signalée à PM Lab avec succès (`moteur_avance: false`).
  - Démo (`e2e/demo.spec.ts`) mise à jour (ouverture du formulaire, saisie, validation, vérification de la note affichée — deux fois), **vérifiée en clic réel** (headless, leçon de l'itération 3) : verte.
  - ⚠️ La démo ne tourne pas en mode `--headed` sur cette machine (pas de serveur X / `$DISPLAY`) : lancée en headless (`npx playwright test e2e/demo.spec.ts`) à la place du script `npm run demo`, qui force `--headed`. À signaler si une itération future a besoin du mode visuel.
  - Rien n'a été bloqué par le harnais.
  - **Modifications** :
    - `frontend/src/lib/notes.ts` : remplace le compteur par une liste de notes (`ajouterNote` pure, `lireNotes`/`enregistrerNote` en JSON dans `localStorage`), garde `formatNotesCapturees` inchangée (critères 1, 2).
    - `frontend/src/lib/notes.test.ts` : 3 tests Vitest sur `ajouterNote` (critère DoD point 2).
    - `frontend/src/app/page.tsx` : le bouton « Capturer ce que j'entends » ouvre un formulaire (texte libre) au lieu d'incrémenter directement ; liste des notes affichée sous les actions (critères 1, 2).
    - `frontend/src/app/page.module.css` : styles du formulaire et de la liste de notes (critère 1).
    - `frontend/src/app/rapport/page.tsx` : le nombre affiché dérive de `lireNotes().length` au lieu de l'ancien compteur (critère 3 — compatibilité).
    - `e2e/demo.spec.ts` : étapes de capture réécrites pour remplir et valider le formulaire (au lieu d'un simple clic répété).

## Itération 5 : Le rapport est généré à partir des notes capturées, par le LLM de la plateforme

- ❗️ **Dépendance nouvelle** : appel à `llm.internal` (passerelle LLM de la plateforme, en `key-auth`). Avant de coder, vérifier dans `/srv/team10/core-platform/core-platform/README.md` le chemin du secret dans OpenBao et le format d'appel attendu ; la machine tourne en mode **anthropic**, donc seule une route de type `task:chat`/complétion est utilisable — pas `task:image`, pas d'embeddings (pas de clé OpenAI fournie, et pas nécessaire ici). Si la clé ou la route n'est pas joignable dans le budget de l'itération, je le signale et on retombe sur le texte figé.
- **Dans le périmètre** :
  - Nouvelle route API (`api/`, port 8081) qui prend les notes capturées (envoyées par le front) et appelle `llm.internal` pour produire un texte de rapport.
  - L'écran 2 appelle cette route (en chemin relatif `/api/v1/...`) au lieu d'afficher le texte pré-rédigé en dur, et affiche un état de chargement pendant l'appel.
  - Si l'appel échoue (401, timeout, quota équipe), repli sur le texte figé existant plutôt qu'un écran cassé.
- **Hors périmètre** : mise en forme avancée du rapport, historique des rapports générés, réglage fin du prompt au-delà d'un premier essai raisonnable.
- **Critères d'acceptation** :
  - Étant donné au moins une note capturée, quand j'ouvre l'écran 2, alors le texte du rapport affiché est généré à partir du contenu réel des notes (pas le texte figé d'origine), avec un indicateur de chargement pendant l'appel.
  - Étant donné zéro note capturée, quand j'ouvre l'écran 2, alors un texte de repli raisonnable s'affiche (pas d'erreur visible).
  - Étant donné un échec de l'appel LLM (simulable en coupant la route), alors l'écran affiche le texte figé de repli au lieu de planter.
- **Hypothèse de l'équipe couverte** : aucune, non produite dans la passation.
- **Codage estimé** : 10 minutes (plafond — c'est la plus grosse itération du lot ; si ça déborde, le repli texte figé reste la version publiée).
- **Fichiers prévus** : `api/` (nouvelle route, ex. `src/routes/rapport.*` selon le squelette existant), `frontend/src/app/rapport/page.tsx` (appel à l'API + état de chargement + repli), `.env.example` (si une variable de config est nécessaire côté API, sans jamais y mettre la clé elle-même).
- **Tests unitaires prévus** : 1 à 2 tests sur la fonction pure qui construit le prompt à partir des notes (pas de test sur l'appel réseau lui-même).
- **Étapes ajoutées à la démo** : capturer une note, ouvrir le rapport, vérifier qu'un texte apparaît après le chargement.
- **Bilan** : _à remplir en fin d'itération._

## À venir (non détaillé)

- Rendre la capture audio réelle (Dictaphone / enregistrement d'entretien — famille d'idées 1 au complet).
- Gérer plusieurs dossiers/familles au lieu du seul cas « Famille Martin ».
- Envoi réel au magistrat (ou simulation plus poussée que le clic actuel).
- Stabilisation finale pour le pitch, quand le temps restant ne permet plus qu'une itération.
