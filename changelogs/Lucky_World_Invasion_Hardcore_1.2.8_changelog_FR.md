# Lucky World Invasion - Hardcore — 1.2.8 (hotfix)

## Équilibrage — lucky blocks « maudits » générés naturellement

Depuis la 1.2.6, la chance (Luck) réellement stockée sur un lucky block est correctement
appliquée au moment du cassage (correction d'un bug du mod Lucky Block qui faisait
auparavant tout rouler à chance 0). Conséquence involontaire : les blocs générés
naturellement avec une chance très négative étaient devenus de véritables pièges,
d'où une nette hausse des drops négatifs remontée par la communauté.

Ce hotfix adoucit toutes les sources naturelles de chance négative :

- **Ruines maudites** (Lucky Block classique) : chance **−75 → −10**
- **Temple gris** (Lucky Block Pink) : chance **−50 à −100 → −10**
- **Cerisier du Nether** (Lucky Block Pink) : chance **−100 → −10**

Les structures positives (acropoles, ballons roses, temple cerisier, firewell…)
sont inchangées.

Note : ces valeurs s'appliquent aux blocs générés dans les **nouveaux chunks**.
Les blocs déjà présents dans un monde existant conservent leur chance d'origine.
