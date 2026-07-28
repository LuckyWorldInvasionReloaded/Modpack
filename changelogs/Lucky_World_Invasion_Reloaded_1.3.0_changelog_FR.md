# Lucky World Invasion Reloaded 1.3.0

La plus grosse mise à jour du pack, construite sur deux choses : **Lucky XP**, une seconde économie entière pour les lucky blocks, et le **multijoueur**, qui se joue enfin comme il devrait.

---

# 1. Lucky XP

## L'expérience
- Casser un lucky block donne de la Lucky XP, une seconde expérience avec sa propre barre bleue et ses orbes bleues. Un drop légendaire en donne le double. Les niveaux Lucky paient tout ce qui suit.
- Fiole d'expérience Lucky : explose en orbes de Lucky XP là où elle tombe.
- Lunettes Lucky (emplacement tête de Curios) : affichent la Chance des lucky blocks proches, pour en lire un avant de le casser.

## Lucky Labs
- Des stands apparaissent dans le monde : un distributeur et le marchand qui s'en occupe. L'ensemble est indestructible.
- Quatre types de machine : Consommables, Matériaux, Outils, Lucky Blocks Infusés. Chaque ligne ne se vend qu'une fois et ne se réapprovisionne jamais. Les achats tombent par terre devant la machine.
- Utiliser un stand lance un compte à rebours de 3 minutes. À zéro, le labo se disloque et le marchand explose, définitivement. Dépense vite.

## Le marchand
- Huit services : relancer le stock, changer le type de machine, un boost de Chance de 5 minutes (avec un revers), de la Chance permanente, un soin complet, une réparation, baisser la difficulté de l'équipe, une vie supplémentaire.
- Sa rareté est sa remise — Rare -10 %, Épique -30 %, Légendaire -60 % — et il la porte, donc elle se lit d'un coup d'œil. Elle est tirée indépendamment de celle de la machine.
- Écrans de boutique entièrement dessinés à la main par notre designer : le marchand tient boutique depuis son établi et te regarde faire tes courses. Les prix sont posés sur des orbes de Lucky XP et s'assombrissent quand tu n'as pas les moyens.

## Événements Lucky
- Une roulette tire un lot, puis des lucky blocks apparaissent autour de chaque joueur : déjà infusés de Chance, ou porteurs d'XP en plus quand tu les casses. Jusqu'au Méga jackpot.
- Un événement se déclenche aussi seul chaque matin, avec un compteur de pitié pour qu'une série creuse ne dure jamais.

---

# 2. Multijoueur

Le coop était bien plus dur que le solo, et pénible à mettre en place. Les deux sont réglés.

## Faire venir tes amis
- Grâce à e4mc : lance ton monde, clique sur Ouvrir au LAN, partage l'adresse. Aucun serveur à louer, aucun port à ouvrir.
- Après un effacement, le nouveau monde se rouvre au LAN tout seul.
- Krypton retiré : il entrait en conflit avec le chiffrement de connexion et pouvait empêcher des joueurs de rejoindre.

## Nuits et journées
- Un seul joueur au lit suffit désormais à passer la nuit.
- Le gamerule reste à toi : le pack ne le règle qu'une fois, sur un monde neuf, et n'y retouche plus.
- Passer la *journée* dans un hamac Comforts demande toujours tout le monde, volontairement.

## Vies partagées
- La partie dispose d'un pool de vies partagées à la place d'un simple interrupteur hardcore : 1 en solo, une par joueur plus une de rab en coop (3 à deux, 4 à trois).
- Il appartient à l'équipe et ne se recharge jamais. La mort qui le vide met fin à la partie. Seul le marchand peut en ajouter une, une seule fois.
- Ouvrir au LAN tout seul reste une partie solo, et les spectateurs ne comptent pas : ce qui compte, c'est qui joue vraiment.
- Tant qu'un autre joueur est connecté, tu tombes au sol au lieu de mourir, et un coéquipier a 5 minutes pour te relever. Tomber consomme une vie ; abandonner ou se vider de son sang coûte tes objets à la place. Seul, tu meurs simplement. Les totems ne touchent jamais au pool.
- Les vies s'affichent en cœurs sur le HUD, couleur et position réglables.

## Invasions en coop
- La connexion d'un ami n'annule plus l'invasion pour tout le monde. La période de grâce qui te protège en arrivant dans une dimension s'armait aussi à la connexion, et elle couvre toute la dimension : quelqu'un qui rejoignait à la tombée de la nuit tuait l'invasion pour l'équipe entière. Elle ne s'arme désormais qu'à un vrai changement de dimension.
- Le compteur de kills s'arrête à son objectif, et ta barre passe au vert dès que tu as fait ta part.
- Tout le monde est prévenu quand un joueur a fini : « &lt;Joueur&gt; a combattu vaillamment. En attente des autres joueurs. »
- Un coéquipier en spectateur ne bloque plus l'invasion pour tout le monde.
- Changer de dimension avant l'aube n'esquive plus le verdict — le malus comme la récompense te suivent.

---

## Invasions
- Réussir une invasion nettoie désormais aussi les mobs ordinaires autour de toi, pour que tu puisses enfin dormir. Les familiers, les mobs nommés et les boss sont épargnés.
- Gagner sur le tout dernier tick ne laisse plus le nettoyage toucher aux boss ni aux mobs nommés.

## Guide et langue
- Le Lucky Book gagne une version française complète, une page sur la Lucky XP et les Lucky Labs, et une nouvelle section « Multijoueur ».
- Les cinq mods maison parlent français eux aussi : boutiques, stats, HUD, config, objets et infobulles suivent la langue du jeu. L'anglais reste par défaut.

## Corrections
- Commercer avec un villageois ne fait plus planter. Un échange vanilla était cassé par un autre mod et ne pouvait produire qu'une erreur ; il est ignoré pour l'instant.
- Les armes et outils Yakurum ne disparaissent plus en tombant si quelqu'un maintenait Maj.

## Confort de jeu
- Ajout d'Easy Anvils : fini le « Trop cher ! », fini la pénalité de travaux antérieurs, renommage gratuit et enclumes qui ne cassent presque plus.
- Le Lucky Block LWI n'est plus craftable. L'infusion est intacte.
- Le Lucky Totem devient la Lucky Idol. Ceux que tu possèdes se convertissent tout seuls.
- Les « Speed Shoes » de Confluence ne font plus de bruit à chaque pas.
- Cœurs Sacrés Yakurum plafonnés (10), pour que les machines ne servent pas à farmer une barre de vie infinie.
- La ligne « Chance totale » du HUD Lucky Stats se place toujours au bon endroit.
