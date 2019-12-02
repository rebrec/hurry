A chaque datasource, on a :
- un script d'init, qui initialise une variable responsable de fournir les données du DS via une méthode Search(keyword)
- un objet menu qui contient les commandes spécifiques du datasource 
- un élément qui s'ajoute dans la case Search de l'UI (le bouton Search est un bouton avec une liste déroulante. Lors du changement dans la liste, le datasource par défaut est mis à jour


Le menuConfig se génère pour un hote / enregistrement sélectioné dans les résultats à partir de :
- une configuration de base (commandes communes, ping, etc)
- une configuration propre au datasource (IE : pas de RDP sur les machines artemis Linux, etc).

Fonctionnalités de l'UI :

UI Design :
- Lorsqu'on arrive dans l'application, le focus est sur la case de recherche.
- Lorsqu'on est dans la case de recherche, un appuie sur Entrée entraine l'exécution de la requette. 
  Si la requête comporte des résultats, le focus est passé à la hostlist. Sinon, le focus reste sur l'input texte.
  
Lorsqu'on click sur un élément HostListLine :
- un affichage spécifique nous indique que l'élément est sélectionné.
- une boîte de dialogue modale apparaît affichant la FicheInfo de cet hote (générée à partir du menuConfig) :
	- cette page contient 2 tabs "Menu" et "Infos". Par défaut l'affichage se fait sur "Menu"
	- ce menu contient le sous menu commun ainsi que le sous-menu spéciques au type d'HostListLine ('glpi', 'artémis', 'server', 'user antibia'
	- des éléments de type Info sont rendus sur la tab Infos :
		- Les infos en mode "automatique" sont automatiquement affichées (les commandes sous jascentes sont donc executées directement)
		- Les infos en mode "manuel" sont affichées à la demande. L'UI affichera un triplet (Label / Zone de résultat / Bouton refresh) qui s'actualisera après appuie sur le bouton refresh.
	- une zone de recherche est présente en haut du tab "action" permettant de :
		- lister dans le panneau de droite l'ensemble des éléments répondant aux mots clés de recherche (conteneurs et commands)
		
Le menu contient différents éléments :
- des CONTAINER
- des COMMAND
- des INFO 
	- qui peuvent être de type :
		- automatic
		- manual 
	- elles possèdent toute un attribut "command", un attribut "shell" (par défaut = "powershell"), timeout (command timeout =settings.commandTimeout)), caption, description
	
	
	
Le CommandManager gère l'exécution de commandes via des Promises.
Il fournit différents shell configurés (par défaut powershell, mais d'autres pourraient être inclus via des plugins/modules, bash, cmd, python2, python3 etc.)
Chaque Shell proposé dispose d'un pool de process dédiés capable d'exécuter des commandes en parallèle.
Le CommandManager propose une méthode execute(cmd, shell) qui :
- execute les commandes cmd dans le pool du shell passé en paramètre.
- stock le résultat de la commande dans un tableau


L'UI propose un debugger permettant d'afficher les informations de débug du CommandManager. On peut ainsi accéder à chaque shell, à la liste des process par pool (avec leur pid). 
Et observer l'historique des commandes exécutées ainsi que les résultats obtenus sur stdout / stderr