# Lucky World Invasion Hardcore - Mise à jour 1.2.7

Ce changelog récapitule tous les changements depuis la 1.1.0.

## Features spécifiques Hardcore

- Les objets des différents mods ne sont plus craftables. Les armes, armures et autres sont à trouver dans les lucky blocks uniquement.
- Les lucky blocks ne sont plus craftables (hors Lucky World Invasion Lucky Block). Il faut les trouver dans la nature.
- Les paliers de difficulté de Born in Chaos se déclenchent désormais automatiquement au jour 20 et au jour 30.

## Lucky Blocks ajoutés (2)

- **Chaos Lucky Block** : nouveau lucky block basé sur les items de Born in Chaos. Peut spawn isolé ou, plus rarement, dans un puits du chaos (chance boostée). Infusable avec certaines ressources de Born in Chaos.
- **Tools Lucky Block** : nouveau lucky block qui droppe des outils exclusifs (voir ci-dessous). Le bloc n'a que 1 % de chance de dropper un outil. Infusable avec de la redstone.

## Set d'outils Lucky (8)

Le **Tools Lucky Block** droppe 8 outils :

- **Lucky Radar** : traque un type de lucky block.
- **Lucky Wand** : pari sur un lucky block. Coûte 1 niveau d'XP, tire une Luck aléatoire entre −50 et +100.
- **Lucky Shield** : dôme protecteur autour d'un lucky block, plus Slow Falling pour le lanceur en cas de chute brutale.
- **Lucky Spawner** : scanne 3 blocs pour en faire spawn 1.
- **Lucky Totem** : booste un lucky block pour un drop garanti du tier le plus haut, mais maudit le lanceur (3 de ses 20 prochains drops tomberont au pire tier).
- **Lucky Hammer** : sacrifie 30 lucky blocks pour le charger, puis répare et rend une arme ou une armure indestructible. Usage unique.
- **Lucky Ring** : équipement Curios. Tant qu'il est porté, chaque lucky block cassé augmente un peu ta chance générale (jusqu'à +30 %).
- **Lucky Belt** : équipement Curios. Tant qu'elle est portée, double tes chances de jackpot sur les Tools Lucky Blocks.

L'anneau et la ceinture sont des équipements Curios : portables en même temps dans leurs slots dédiés (clic droit pour équiper). Curios est déjà fourni par le modpack.

## Lucky Stats et HUD personnalisable

- **Écran Lucky Stats** : accessible via Échap puis bouton « Lucky Stats », ou directement avec la touche **L** (rebindable). Suit par joueur et par monde tes lucky blocks cassés (total et détail par type), ton Average Luck %, tes drops légendaires et maudits, les stats de la Lucky Wand, le jour actuel, ton palier de difficulté, ton temps de jeu, tes kills de mobs et tes invasions vécues.
- **HUD personnalisable** : épingle n'importe quelle stat à l'écran en jeu. Glisser-déposer pour positionner, couleur, échelle, ombre et fond par stat, toggle global ON/OFF et bouton Reset All.

## Corrections majeures

Deux bugs majeurs présents depuis longtemps, enfin corrigés dans cette version :

- **La Luck ne servait à rien.** La Luck d'un lucky block (infusion, Lucky Wand, puits firewell) n'influençait en réalité jamais la qualité des drops. Elle compte désormais pour de vrai.
- **Le Toucher de soie effaçait la chance.** Miner un lucky block au Toucher de soie pour le reposer ailleurs lui faisait perdre sa stat de chance. Il la garde maintenant en mémoire.

## Invasions

- Les invasions arrivent désormais à intervalle régulier, sans variation aléatoire entre elles.
- Nouveau mod **OptionalSuffering** : tuer 40 mobs hostiles met fin à une invasion en cours.

## Difficulté progressive

- **Majrusz's Progressive Difficulty** : la difficulté monte avec le temps.
- **Born in Chaos** : relié à la difficulté Majrusz, ses paliers se durcissent à mesure que la partie avance.

## Équilibrage

- Le plastron à impulsion de Fuze Relics, trop puissant, est retiré du pool du Lucky Blockling.

## Changements de mods

### Mods ajoutés

- **Waystones** : points de téléportation rapide.
- **Born in Chaos** : ajoute ses mobs (objets et blocs réservés au Chaos Lucky Block).
- **Majrusz's Progressive Difficulty** : difficulté qui monte avec le temps.
- **Progressive Difficulty: Chaos Integration** : relie la difficulté Majrusz à Born in Chaos.
- **Let Me Despawn** : despawn des mobs plus intelligent (perf).
- **Mobtimizations** : optimise les performances des entités et mobs.
- **ImmediatelyFast** : accélère le rendu de l'UI et du texte.
- **Flerovium** : boost de FPS.
- **ClientSort** : boutons de tri d'inventaire côté client.
- **Quick Right Click** : ouvre table de craft ou lit d'un clic droit depuis l'inventaire.
- **Sophisticated Backpacks** : sacs à dos améliorables (filtres, ramassage auto).
- **OpenLoader** : charge les datapacks qui ajustent le contenu des mods.
- **LuckyTools** (intégré) : outils droppés par le Tools Lucky Block.
- **OptionalSuffering** (intégré) : permet de terminer une invasion en avance en tuant des mobs.
- **Quark** (intégré) : conservé surtout pour Attribute Tooltips et quelques modules QoL.
- **Zeta** (intégré) : dépendance de Quark.

Dépendances tirées : GeckoLib, compat GeckoLib x Oculus, Majrusz Library, Sophisticated Core, Almanac Lib, CoroUtil.

### Mods retirés (39)

#### Gameplay et contenu (6)
- **YDM's Weapon Master** : nouveaux types d'armes avec capacités actives.
- **Lootr** : coffres de loot instanciés par joueur (pas de loot partagé).
- **PlayerRevive** : agonie et réanimation par un allié au lieu de la mort instantanée.
- **Comforts** : sacs de couchage et hamacs (dormir sans lit fixe).
- **Better Burning** : mécaniques de feu et combustion plus dures.
- **MmmMmmMmmMmm** : mannequin d'entraînement plaçable pour tester les dégâts.

#### Génération du monde et structures (4)
- **YUNG's Better Dungeons** : donjons vanilla revus, plus grands.
- **YUNG's Better Strongholds** : forteresses (strongholds) revues.
- **YUNG's Better Witch Huts** : huttes de sorcières étendues.
- **YUNG's Better Nether Fortresses** : forteresses du Nether revues.

#### Cartes (3)
- **Xaero's Minimap** : minicarte en jeu.
- **Xaero's World Map** : carte du monde plein écran explorable.
- **XaeroPlus** : extension performance et fonctionnalités pour les cartes Xaero.

#### Inventaire et contrôles (4)
- **Crafting Tweaks** : vidage rapide et rotation de la grille de craft.
- **Smooth Swapping** : déplacement animé des objets dans les inventaires.
- **Staaaaaaaaaaaack (Stxck)** : tailles de stack configurables.
- **L2 Backpack** : sac à dos de stockage portable.

#### HUD, infobulles et infos (9)
- **Just Enough Professions (JEP)** : métiers des villageois affichés dans JEI.
- **Just Enough Resources (JER)** : drops des mobs et infos de world-gen dans JEI.
- **Just Enough Effect Descriptions (JEED)** : descriptions des effets de potion dans JEI.
- **AppleSkin** : HUD détaillé faim et saturation.
- **Legendary Tooltips** : cadres d'infobulles stylisés selon la rareté.
- **Item Borders** : bordures de slots colorées selon la rareté.
- **Pick Up Notifier** : notifications à l'écran des objets ramassés.
- **Durability Tooltip** : durabilité de l'objet affichée dans son infobulle.
- **Aggro Indicator** : icône au-dessus d'un mob quand il te cible.

#### QoL divers et ajustements (6)
- **Passive SearchBar** : le champ de recherche ne capte plus le focus automatiquement.
- **Game Menu Remove GFARB** : retire les boutons Feedback et Report-Bugs du menu pause.
- **NetherPortalFix** : retour par le portail du Nether correspondant.
- **Extreme Sound Muffler** : couper des sons spécifiques à la demande.
- **Clean Swing Through Grass** : les attaques ne s'accrochent plus au feuillage.
- **Leaves Be Gone** : supprime les feuilles en décomposition.

#### Visuel et audio (4)
- **Not Enough Animations** : animations à la 3e personne (manger, boire).
- **Physics Mod** : ragdolls, débris et effets physiques dynamiques.
- **Model Gap Fix** : supprime les coutures des modèles d'objets et blocs.
- **Sound Physics Remastered** : réverbération et occlusion réalistes du son.

#### Multijoueur et technique (3)
- **My Server Is Compatible** : contourne les kicks pour mismatch de mod-list client/serveur.
- **LAN World Plug-n-Play (mcwifipnp)** : ouvre un monde LAN avec port-forwarding automatique.
- **Essential Mod** : cosmétiques et invitations multijoueur faciles.

### Resource pack retiré (1)
- **Torrezx - Better Boss Bar** : retexture de la barre de boss.

### Librairies orphelines (7)
- **YUNG's API** : utilisée uniquement par les 4 mods de structures YUNG's (retirés).
- **Moonlight Lib (Selene)** : utilisée par Target Dummy / JEED / Model Gap Fix (retirés).
- **CreativeCore** : utilisée uniquement par PlayerRevive (retiré).
- **SuperMartijn642's Core Lib** : utilisée uniquement par Durability Tooltip (retiré).
- **SuperMartijn642's Config Lib** : utilisée uniquement par Durability Tooltip (retiré).
- **Prism** : utilisée par Legendary Tooltips et Item Borders (retirés).
- **L2 Library** : utilisée uniquement par L2 Backpack (retiré).

## Réglages de config

- Durabilité de l'armure affichée en pourcentage.
- Indicateurs d'entités Jade et TES désactivés (évite d'afficher deux fois la santé et le statut à l'écran).
- Réglages des invasions ajustés.
