# Présentation

Le concept de base d'Hurry est d'intérroger des sources de données à partir d'un mot clé, obtenir des résultats lié à cette opération de recherche
puis offrir la possibilité au travers d'un menu, d'appliquer des actions / commandes sur le résultat sélectionné.
Le principe de base est d'offrir une utilisation graphique à des fonctionnalités déja utilisables au travers de la ligne de commande
dans différents interpretteurs de commandes (Shells)

Hurry va donc, en cachette, saisir des commandes à votre place dans un ou plusieurs Shells pour :
- effectuer des recherches
- exécuter des actions sur les résultats de recherche.

Voici les différentes entitées que manipule Hurry :
- Shell : il s'agit des interpretteurs de commandes qu'Hurry est capable de piloter à votre place.
	Ils sont utilisables par les Datasources et les Commands que l'on cherche à appliquer sur des résultats de recherche.
- Datasource : il s'agit d'un moyen d'accéder à une source de donnée au travers d'une fonction de recherche.
	La fonction de recherche utilisera généralement un Shell (ou éventuellement du code JS Natif) pour aller chercher l'information demandée
	exemples en  Powershell : Get-ADUser, Get-ADComputer, Get-MSOLUser, etc.
- View : Les différentes pages affichées dans Hurry sont des Views. Elles correspondent à des composants React.
- Plugin : Un des objectifs d'Hurry est d'être évolutif et modulable. Pour ce faire, un système de plugin est mis en place.
	Un plugin peut :
		- ajouter des Datasources
		- ajouter des Views
		- insérer des menus dans Hurry (menu contextuel de commande ou des actions dans les menu principal de l'application)
		- ajouter des Shells
		- nécessiter des éléments de configuration de la part de l'utilisateur : lors du chargement du plugin, le gestionnaire de plugins
			se chargera de vérifier si le plugin a besoin d'elements de configuration utilisateur, et le cas échéant, il les intégrera à la page
			de configuration d'Hurry.
	
	Un plugin peut être natif ou non : au démarrage, hurry chargera automatiquement tous les plugins présents dans son dossier builtins.
	Il chargera ensuite tous les plugins présents dans le dossier contenant les plugins installés.

## Instanciations multiples

Hurry peut, pour tous les Datasources qu'il possède (ajouté nativement via les plugins builtins ou via des plugins externes), créer plusieures
instances d'un même plugin. Il créera des éléments de configurations spécifiquement liés à chaque instance des Datasources instanciés.
Pour controler les instances de chaque Datasource, un plugin sera conçu et permettra :
- Lister les Datasources disponibles
- Choix du nombre d'instance pour chaque Datasource

## Ordre de démarrage de l'application

Nous ne parlons pas du fonctionnement actuel, mais du fonctionnement à atteindre. Le fonctionnement actuel étant incompatible avec l'instanciation multiple
il va être abandonné progressivement.

Lors du démarrage de l'application, une des premières tâches est d'initialiser les différents managers :
- RootStore
- ShellManager
- DatasourceManager
- PluginManager

Le PluginManager doit ensuite :
- Scanner les plugins builtins
- Scanner les plugins externes
Une fois la liste des plugins disponibles constituée, il va :
- Vérifier si  le plugin disposé déja d'une configuration utilisateur
- Créer une instance de chaque plugin en lui fournissant sa configuration

Les plugins vont à leur tour :
- enregistrer de nouveaux Datasources, Views, Shells

### Problématique :

Lorsque le plugin manager décide de charger un plugin, il va tenter de vérifier si une configuration spécifique existe pour ce plugin et lui fournir lors de son instanciation.
Il faut traiter les cas ou le plugin est nouvellement installé et n'a pas encore été configuré.
Dans ce cas, le plugin manager, devra adopter un traitement spécifique.

On peut imaginer l'algorithme suivant :
Lors du chargement d'un plugin :
- regarder si le plugin a besoin d'éléments de configuration spécifique (CI)
SI il n'a pas besoin de CI :
	- Création de l'instance du plugin avec aucune configuration
SINON
	- Tentative de récupération d'une configuration particuliere
	SI Configuration trouvée:
		- Création de l'instance  du plugin avec sa configuration
		- Vérification de la propriété Plugin.initializationStatus.initialized
			SI = TRUE: fin du traitement
			SINON:
				- récupération de Plugin.initializationStatus.failureMessage
				- notification de ce message à l'utilisateur.
				- Classement du plugin dans un tableau contenant les plugins non initialisés
	SINON
		- Récupération du schéma de configuration de la classe
		- Invite de l'utilisateur à configurer le plugin (Toast ?)
		- Classement du plugin dans un tableau contenant les plugins non initialisés
		
L'utilisateur devrait ensuite faire l'exercide d'accéder au module de configuration d'Hurry 
pour y trouver les éléments de configuration du plugin afin de les paramétrer
Lors de la validation de la configuration, le PluginManager serait appelé afin, cette fois, de créer l'instance du plugin nouvellement configuré.

### Schéma de configuration global

Lorsque l'on accède à la page de configuration d'Hurry, une page permettant de configurer les différents éléments d'hurry est affichée
sa structure est lié à un schéma de configuration constitué d'une partie fixe propre à l'application et d'une partie générée dynamiquement à partir :
- des schémas de configuration  de chaque plugin qui en dispose
- des schémas de chaque Datasource (1 sera généré par instance)
- des schémas de chaque Shell

les interactions entre le schéma de configuration global et le plugin manager et l'initialisation d'Hurry ne sont pas tres clairs et nécessite des précisions : 
Lorsqu'Hurry est lancé la premiere fois, des éléments de configuration sont demandés à l'utilisateur.
Les fois suivantes, cete page n'est pas affichée.
Si un plugin est installé entre temps, Hurry va se lancer normalement et tenter d'afficher la page principal.
Avant cela, le plugin manager aura tenter d'instancier le plugin qui nécessite des CI et ne le fera donc pas.
Celui ci, récupérera le schéma de configuration du plugin et demandera son intégration au ConfigurationSchemaManager.
Il affichera également une notification indiquant qu'il faut aller configurer le plugin XXXX
Lorsque l'utilisateur ira sur la page de configuration, le ConfigurationSchemaManager sera interrogé pour obtenir la version la plus récente du Schéma global contenant les CI
du nouveau plugin.
Apres validation de la configuration, un rechargement d'Hurry aura lieu.
A cette issue, le PluginManager tentera à nouveau de charger le plugin, il trouvera des CI, créera donc une instance du Plugin en lui fournissant ses CI
Si les éléments était mal configurée (par exemple l'utilisateur a fourni un chemin d'acces vers un fichier qui ne convient pas, alors le plugin 
modifiera sa propriété "disabled" (ou "initializationStatus").
Une fois l'instance créée, le plugin manager, s'assurera de la valeur de la propriété "initializationResult".
Si elle est à { initialized: TRUE }, l'initialisation sera terminée
Si elle est à { initialized: FALSE, falureMessage: "Some Advice to the user" }, le plugin manager affichera une notification à l'utilisateur avec le message failureMessage.
	il stockera en suite à nouveau le plugin dans la liste des plugins non initialisés correctement.

## Ordre d'initialisation des éléments
Voici le nouvel ordre de chargement envisagé : 
- RootStore
- PluginManager
- ShellManager
- DatasourceManager

Le PluginManager devrait être chargé en priorité car il est succeptible de demander la création de nouveaux Shells et Datasources

Le ConfigurationSchemaManager doit être chargé avant tous les autres éléments car il contient des éléments de configuration nécessaire au bon fonctionnement
de chaque "Entité" (Manager, Stores, etc).

## Problème

Si le CSMgr est chargé en premier, il n'aura pas connaissance des schémas des différents plugins qui doivent être chargés par le PlMgr, ni de ceux qui seront chargés par le DSMgr ou le ShMgr

Aujourd'hui lorsqu'on crée l'instance de chaque Entité, on leur passe un objet config généré par le le 


## Idee
On pourraît transformer le fichier config.js et créer à la place un ConfigMgr
Le ConfigMgr aurait pour rôle : 
- Gestion de la configuration
	- enregistrement de la configuration globale
	- chargement de la configuration globale
	- fourniture de la configuration :
		- global
		- spécifique à un plugin
		- spécifique à un DS
	- modification de la configuration
		- globale
		- specifique a un plugin
		- spécifique à un DS
- Gestion des schémas de configuration
	- Fourniture du Schema de configuration :
		- global
		- spécifique à un plugin
		- spécifique à un DS
	- Enregistrement d'un schéma de configuration
		- global
		- spécifique à un plugin
		- spécifique à un DS

# Modifications à apporter au code existant
AVANT TOUTE CHOSE :
	Il faut revérifier comment sont créés les DS : 
		IL FAUT que le DSMgr puisse accéder au nom d'un DS AVANT son instanciation (et également à son Schema)

- Créer un Logger importé dans chaque fichier ou classe ?
	- préfixer peut être le nomde chaque classe ou de chaque nom de module (cf https://stackoverflow.com/a/65662806/1446677)
	- peut être envisager la référence à la ligne où a lieu le log.info (cf https://github.com/winstonjs/winston/issues/200#issuecomment-44414591)
	
- Restructuration des DS et des Shells et des Plugins
	- création de getConfigurationSchema() : renvoit un schema statique qui n'est pas lié à une instance
		il sera appelé par les MGR respectifs pour nourir le ConfigMgr
			- plugins : les plugins sont mono instance donc aucun traitement à réaliser normalement
			- shells: ils sont mono instance donc idem
			- datasources : peuvent être multi instance. Le DSMgr devra donc :
				- récupérer du configmgr le nombre d'instances de chaque DS qu'il doit instancier
				- collecter le schema et le nom du DS en cours
				- demander au ConfigMgr de créer pour chaque instance un schema (génération du nom de l'instance théorique car prévisible)
				

- Création du ConfigMgr
	- Gestion d'une configuration par défaut
		- Création d'une configuration par défaut et des fichiers nécessaires par défaut
			?????
		- Création d'un parametre gerant le nom des instances multiples de DS (propre au DSMgr ???)
		- Création d'un parametre gérant les plugins / ds / shells, en état fonctionnel ou non...
		POUR LES LIGNES CI DESSUS : EST-CE VRAIMENT LE ROLE DE LA CONFIG QUE DE MAINTENIR L'ETAT DE FONCTIONNEMENT ??????  <== NON pour l'état fonctionnel, MAIS OUI pour la gestion des instances
	- Gestion des parametres de ligne de commandes
		?????
	- Gestion de l'état de la configuration (valid ou non)
	
	- Gestion de la configuration
		- Enregistrement
			saveGlobalConfiguration
			saveGlobalConfigurationAs
		- Chargement
			loadGlobalConfiguration
		- Fourniture 
			getGlobalConfig()
			getPluginConfig(pluginName)
			getDatasourceConfig(dsName)
		- Creation/Modification
			setGlobalConfig(config) : remplace la configuration globale
			setPluginConfig(pluginName, config)
			setDatasourceConfig(dsName, config)
	- Gestion des schémas de configuration
		- Fourniture 
			getGlobalConfigurationSchema()
			getPluginConfigurationSchema(pluginName)
			getDatasourceConfigurationSchema(dsName)
		- Enregistrement
			setGlobalConfigurationSchema(schema)
			setPluginConfigurationSchema(pluginName, schema)
			setDatasourceConfigurationSchema(dsName, schema)
	==> Il faudra reprendre toutes les fonctionnalités présentes dans ConfigurationSchema.js et dans config.js

- Modifier les MGR pour qu'ils prennent en comptes les phases suivantes :
	- construction : pas de scan de dossier, ni de création d'instances de quoi que ce soit (shell / ds, ...)
	- init : passage en mode initialisation, scan de dossier éventuel (si on suppose que tout n'est pas fait par le pluginMGR (A REVOIR...)
			 a ce stage, les instances peuvent être créées mais pas encore rendu utilisables
	- start : à ce stade on rend utilisable les entités gérées
	

- Modifier l'ordre d'initialisation de l'API :
	- RootStore
	- ShellManager : construction
	- DatasourceManager : construction
	- PluginManager : construction, init, start
	- ShellManager: init
	- DatasourceManager : init
	- ShellManager: start
	- DatasourceManager : start
	
- PluginMgr :
	Intégrer les phases construction, init et start
	Dans Init, on cherchera les plugins à charger et on récupérera les configurations
	Dans le start, on lancera la création des instances de plugin
	
- DS MGR et Shell MGR :
	Intégrer les phases construction, init et start
	Dans Init, on cherchera les DS à charger et on récupérera les configurations
	Dans le start, on lancera la création des instances de DS / Shell
	
ATTENTION : IL FAUT ENCORE VOIR COMMENT VA SE COMPORTER L'UI SI TOUT CE CHARGEMENT EST ASYNCHRONE !!
IL EST POSSIBLE D'AVOIR A MODIFIER CERTAINES CHOSES NOTAMMENT DANS LE CONFIGURATIONMGR
