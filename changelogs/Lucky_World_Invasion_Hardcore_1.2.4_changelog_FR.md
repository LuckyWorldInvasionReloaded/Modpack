# Lucky World Invasion Hardcore - Mise à jour 1.2.4 proposée

## Features spécifiques Hardcore

- Les objets des différents mods ne sont plus craftables, les armes/armures/etc sont à trouver dans les lucky blocks uniquement.
- Les lucky blocks ne sont plus craftables (hors Lucky World Invasion Lucky Block), il faut les trouver dans la nature.
- Les paliers de difficulté de Born in Chaos se déclenchent désormais automatiquement au jour 20 et au jour 30 (plus seulement en entrant dans d'autres dimensions).

## Lucky Blocks ajoutés (2)

- **Chaos Lucky Block** (`chaosluckyblock`) - Nouveau lucky block (créé par Laink) basé sur les items de Born in Chaos, taux de drop, d'apparition et gain de puissance similaires au Water Lucky Block. Peut spawn isolé ou de manière plus rare dans un puits du chaos (chance boostée). Infusable avec certaines ressources de Born in Chaos.
- **Tools Lucky Block** (`toolluckyblock`) - Nouveau lucky block (créé par Laink) avec 5 items exclusifs qui agrémentent le gameplay des Lucky Blocks : Lucky Radar (traque un type de lucky block), Lucky Spawner (scanne 3 blocs pour en faire spawn 1), Lucky Shield (dôme protecteur autour d'un lucky block + Slow Falling pour le lanceur en cas de chute brutale), Lucky Wand (pari sur un lucky block : coûte 1 niveau d'XP, tire une Luck aléatoire entre −50 et +100) et Lucky Totem (booste un lucky block pour un drop garanti du tier le plus haut, mais maudit le lanceur : 3 de ses 20 prochains drops tomberont au pire tier). Le bloc n'a que 1 % de chance de dropper un outil. Infusable avec de la redstone.

## Lucky Blocks mis à jour (3)

- **Water Lucky Block** - v1.5.0 → v1.7.5
- **Lucky Block Pink** - 8.3 [Slash 'n Swing] → 8.4 [Everlasting Expansions]
- **FIX** : Les lucky blocks peuvent maintenant être minés avec Toucher de soie puis être reposés, ils garderont leur stat de chance en mémoire
- **FIX** : La Luck d'un lucky block (infusion, Lucky Wand, puits firewell) influe désormais réellement sur la qualité des drops

## Stats & HUD personnalisables (nouveau)

- **Écran Lucky Stats** : accessible via Échap → bouton « Lucky Stats », ou directement avec la touche **L** (rebindable). Suivi par joueur et par monde de :
  - Lucky blocks cassés (total + détail par type, top 6 affichés avec leur icône)
  - **Average Luck %** : pourcentage calculé à partir du tier réel du drop tiré par le mod Lucky, normalisé par la distribution propre à chaque addon (un raté Tools LB ≈ 50 %, un jackpot ≈ 100 %, un mortel Chaos LB ≈ 1 %). Couvre tous les addons + le Lucky Blockling de Fuze Relics (cas spécial).
  - Legendary drops / Cursed drops counts
  - Stats de la Lucky Wand : rolls, somme et moyenne de Luck pariée
  - Jour actuel, palier Majrusz (Normal / Expert / Master), playtime, kills de mobs vanilla, invasions PureSuffering vécues
- **HUD personnalisable** (bouton « Edit HUD » depuis l'écran Lucky Stats, ou touche bind perso) : épingle n'importe quelle stat à l'écran en jeu.
  - Drag-and-drop pour positionner, snap à une grille 10 px (Shift = mode pixel-perfect)
  - 9 ancres (Top-Left, Top-Center, …, Bot-Right) qui maintiennent la position relative quand la fenêtre est redimensionnée
  - Personnalisation par stat : couleur (8 presets), échelle (75–200 %), ombre on/off, fond (None / Box / Outline)
  - Toggle global ON/OFF, bouton Reset All, snap-to-anchor automatique, anti-collision (les stats ne peuvent pas se superposer)
  - Sauvegardé localement dans `config/luckytools_hud.json` (per-client, pas partagé)

## Mods ajoutés (14)

- **LuckyTools** - set d'outils droppés par le Tools Lucky Block.
- **Waystones** - points de téléportation rapide.
- **Born in Chaos** - ajouté uniquement pour ses mobs. Ses objets/blocs/structures sont retirés et réservés au Chaos Lucky Block.
- **Majrusz's Progressive Difficulty** - difficulté qui augmente avec le temps.
- **Progressive Difficulty: Chaos Integration** - relie la difficulté Majrusz à Born in Chaos.
- **Let Me Despawn** - despawn des mobs plus intelligent (performance).
- **Mobtimizations** - performance des entités/mobs.
- **ImmediatelyFast** - rendu plus rapide (UI/texte).
- **Flerovium** - boost de FPS.
- **ClientSort** - boutons de tri d'inventaire côté client.
- **Quick Right Click** - ouvre une table de craft ou un lit d'un clic droit depuis l'inventaire.
- **Sophisticated Backpacks** - sacs à dos améliorables (filtres, ramassage auto, etc.).
- **OpenLoader** - pour charger les datapacks qui ajustent le contenu des mods.
- **Quark** - réintégré (la plupart des modules désactivés), conservé surtout pour **Attribute Tooltips** : indique directement dans les infobulles d'armure/outil si une pièce est meilleure ou moins bonne que l'équipement porté, plus quelques modules QoL (recherche dans les coffres, partage d'objet en jeu, échange rapide d'armure, infobulles de shulker).

**Dépendances tirées :** Almanac Lib (Let Me Despawn), Collective (Quick Right Click), CoroUtil (Mobtimizations), GeckoLib + compat GeckoLib × Oculus (Born in Chaos), Majrusz Library (Majrusz's Progressive Difficulty), Sophisticated Core (Sophisticated Backpacks), Zeta (Quark). Balm mis à jour 7.3.9 → 7.3.33 (Waystones requiert ≥ 7.3.28). Dépendance de ClientSort : JEI mis à jour. Déjà satisfait : Embeddium via Xenon 0.3.31 (Flerovium).

## Ajustements de config de mods (3)

- **Inventory HUD+** - `armView` : `DAMAGE_LEFT` → `PERCENTAGE` (durabilité de l'armure affichée en pourcentage). Fichier `config/inventoryhud-client.toml`, section `[armorhud]`.
- **Jade** - `displayEntities` & `displayBosses` : `true` → `false` (masque l'infobulle au survol des entités et boss). Fichier `config/jade/jade.json`.
- **TES (TslatEntityStatus)** - `inWorldBarsEnabled` : `true` → `false` (désactive les barres de statut affichées au-dessus des entités). Fichier `config/tslatentitystatus-common.toml`, section `[In-World Bars Settings]`.

Les ajustements Jade et TES désactivent tous deux les indicateurs d'entités/boss pour éviter d'afficher deux fois la même santé et le même statut à l'écran (infobulle Jade + barres TES).

## Mods retirés (39)

### Gameplay & contenu (6)

- **YDM's Weapon Master** - nouveaux types d'armes avec capacités actives.
- **Lootr** - coffres de loot instanciés par joueur (pas de loot partagé).
- **PlayerRevive** - agonie + réanimation par un allié au lieu de la mort instantanée.
- **Comforts** - sacs de couchage & hamacs (dormir sans lit fixe).
- **Better Burning** - mécaniques de feu/combustion plus dures.
- **MmmMmmMmmMmm** - mannequin d'entraînement plaçable pour tester les dégâts.

### Génération du monde / structures (4)

- **YUNG's Better Dungeons** - donjons vanilla revus, plus grands.
- **YUNG's Better Strongholds** - forteresses (strongholds) revues.
- **YUNG's Better Witch Huts** - huttes de sorcières étendues.
- **YUNG's Better Nether Fortresses** - forteresses du Nether revues.

### Cartes (3)

- **Xaero's Minimap** - minicarte en jeu.
- **Xaero's World Map** - carte du monde plein écran explorable.
- **XaeroPlus** - extension performance/fonctionnalités pour les cartes Xaero.

### Inventaire & contrôles (4)

- **Crafting Tweaks** - vidage rapide / rotation de la grille de craft.
- **Smooth Swapping** - déplacement animé des objets dans les inventaires.
- **Staaaaaaaaaaaack (Stxck)** - tailles de stack configurables.
- **L2 Backpack** - sac à dos de stockage portable.

### HUD, infobulles & infos (9)

- **Just Enough Professions (JEP)** - métiers des villageois affichés dans JEI.
- **Just Enough Resources (JER)** - drops des mobs & infos de world-gen dans JEI.
- **Just Enough Effect Descriptions (JEED)** - descriptions des effets de potion dans JEI.
- **AppleSkin** - HUD détaillé faim/saturation.
- **Legendary Tooltips** - cadres d'infobulles stylisés selon la rareté.
- **Item Borders** - bordures de slots colorées selon la rareté.
- **Pick Up Notifier** - notifications à l'écran des objets ramassés.
- **Durability Tooltip** - durabilité de l'objet affichée dans son infobulle.
- **Aggro Indicator** - icône au-dessus d'un mob quand il te cible.

### QoL divers & ajustements (6)

- **Passive SearchBar** - le champ de recherche ne capte plus le focus automatiquement.
- **Game Menu Remove GFARB** - retire les boutons Feedback/Report-Bugs du menu pause.
- **NetherPortalFix** - retour par le portail du Nether correspondant.
- **Extreme Sound Muffler** - couper des sons spécifiques à la demande.
- **Clean Swing Through Grass** - les attaques ne s'accrochent plus au feuillage.
- **Leaves Be Gone** - supprime les feuilles en décomposition / feuillage plus propre.

### Visuel & audio (4)

- **Not Enough Animations** - animations à la 3e personne (manger, boire…).
- **Physics Mod** - ragdolls, débris & effets physiques dynamiques.
- **Model Gap Fix** - supprime les coutures/interstices des modèles d'objets & blocs.
- **Sound Physics Remastered** - réverbération & occlusion réalistes du son.

### Multijoueur & technique (3)

- **My Server Is Compatible** - contourne les kicks pour mismatch de mod-list client/serveur.
- **LAN World Plug-n-Play (mcwifipnp)** - ouvre un monde LAN avec port-forwarding automatique.
- **Essential Mod** - cosmétiques + invitations multijoueur faciles.

## Resource packs retirés (1)

- **Torrezx - Better Boss Bar** - retexture de la barre de boss.

## Librairies orphelines (7)

- **YUNG's API** - API partagée ; utilisée uniquement par les 4 mods de structures YUNG's (retirés).
- **Moonlight Lib (Selene)** - librairie de MehVahdJukaar ; utilisée par Target Dummy / JEED / Model Gap Fix (retirés).
- **CreativeCore** - librairie de CreativeMD ; utilisée uniquement par PlayerRevive (retiré).
- **SuperMartijn642's Core Lib** - utilisée uniquement par Durability Tooltip (retiré).
- **SuperMartijn642's Config Lib** - utilisée uniquement par Durability Tooltip (retiré).
- **Prism** - librairie de couleurs de Grend_G ; utilisée par Legendary Tooltips & Item Borders (retirés).
- **L2 Library** - librairie partagée ; utilisée uniquement par L2 Backpack (retiré).
