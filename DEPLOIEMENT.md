# Déploiement

## L'application

Aide les travailleurs sociaux de **La Sauvegarde du Nord** (protection de l'enfance) à passer moins de temps sur la forme de leurs rapports (AEMO/MJIE) pour se concentrer sur l'analyse et la relecture par le chef de service. Itération 1 : écran de situation d'une famille suivie, données figées.

## Services

- `frontend/` — Next.js en export statique, servi par nginx, port 80 (conteneur) / 8080 (VM). **Service exposé au public.**
- `api/` — Node sans dépendance, port 8081. Routes `/health` et `/sante` seulement pour l'instant ; pas encore appelée par le front.

## Services externes

Aucun pour l'instant (pas de base de données, pas d'appel à un modèle d'IA, pas d'envoi d'e-mail). À ce stade, rien d'externe ne peut faire tomber l'application.

## Fragile ou inachevé

- Les 3 actions de l'écran (« Capturer ce que j'entends », « Rédiger le rapport d'intervention », « Envoyer au magistrat ») ne naviguent pas encore : prévu en itération 2.
- Les données affichées (famille Martin) sont en dur dans le front, pas de persistance.
- L'API ne sert encore que les routes de santé.

## Contacts

- Équipe : Équipe 10 (à compléter avec un nom si besoin pour la Forge).
- Association : La Sauvegarde du Nord — contact non communiqué dans le dossier de passation.
