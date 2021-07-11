Objectif :
==========
On essaie d'implémenter un système permettant que chaque plugin et/ou Datasource, puisse définir des éléments de configuration que  l'utilisateur devra paramétrer.
Ces éléments de configuration sont représentés au travers d'un "Schéma" défini en JSON et actuellement implémenté dans le fichier ConfigurationSchema.js

Problème
========

Nous désirons offrir la possibilité aux utilisateurs de créer plusieures instances d'un Datasource. 
Il peut en effect être intéressant par exemple d'avoir de multiples Datasources de type "Host File" qui référencent chacun un fichier host différent.
Pour que chaque instance du Datasource dispose de sa propre définition du schéma de configuration, il est nécessaire que chaque Datasource dispose d'un nom unique.

Cette fonctionnalité de nom unique est actuellement implémentée via un système de numéro d'instance propre à chaque Classe de type Datasource.
Chacune d'elle possède un compteur propre à la Classe qui permet d'identifier de manière unique chaque instance du même classe.
Si l'application est relancée plusieures fois et qu'il est indiqué dans un fichier spécifique (dont le fonctionnement sera présenté ultérieurement) que l'application dispose de 2 Datasource de type
Host File, alors à chaque fois, la premiere instance possédera l'instanceid 1 et la seconde, le 2.
En conséquence, chaque instance pourra demander à la partie "Configuration" d'Hurry, de demander à l'utilisateur des éléments de configurations qui seront les mêmes, mais dont les valeures
renseignées, seront retournée à une instance spécifique.
Chaque Datasource, passera un Schéma de la forme 'nom du ds_<instance_id>' : { ... <définition du schéma de configuration propre à la classe> ... }

Il faudrait également que cette fonctionnalités soit disponible pour les plugins d'une façon générale.

Solution proposée :

On va considérer que tout élément de configuration doit être présent dans hurry au travers d'un plugin.
Ainsi, chaque datasource actuellement supporté de manière native, sera, a terme migrée dans un plugin ayant pour but de définir ce Datasource.

En considérant cela, si tout devient plugin, les configurations des Datasource ou de tout autre élément seront gérés par des plugins.
Le probleme suivant apparaît : si le plugin A introduit 2 datasources DSA1 et DSA2, et que l'on souhaite configurer 2 instances de DSA1 et aucune de DSA2 par exemple, le schéma de configuration résultant
devra être de la forme :
{
	DSA1-instance1: {schema de DSA1},
	DSA1-instance2: {schema de DSA1}
}	

Dans le cas ou un plugin P1 propose une Vue qui affiche un message contenu dans une variable "msg". On peut imaginer que le plugin aura un schema de configuration P1: { msg: "demo message }
Apres réflexion, il semble plus cohérent que chaque entité d'Hurry qui peut être introduite au travers d'un plugin (View, DS, Shell), puisse enregistrer des parametres spécifiquement pour elle.
Bien que n'ayant pas d'exemple, on pourraît également considérer que les Plugins peuvent avoir un schéma de configuration.

Il faut donc, finalement : 
- que chaque DS, Shell, View, Plugin, possède
	- un système de numéro d'instance unique
	- un schéma de configuration qui sera enregistré une nouvelle fois à chaque création d'une nouvelle instance
	
L'oeuf ou la poule ?
==
On vient de dire qu'un schéma de configuration devra être enregistré à chaque création d'une nouvelle instance, néanmoins, il est fort probable que certains éléments de configuration présent dans ce 
schéma seront nécessaire à la création de la dite instance.
Il faut donc trouver le moyen de décoréller la création du schéma de configuration de chaque instance, de la création de la dite instance, qui ne devrait être réellement instancié, qu'à partir du moment
où les éléments de configuration de celle-ci ont été définis par l'utilisateur.
Cela passera sans doute par une fonction native dans Hurry dont le but est :
- d'afficher les Plugins, DS, Views, Shells?, ... disponibles
- d'augmenter, réduire ou supprimer (=0) le nombre d'instance de chacun,

Cela aura pour effet, de :
1- créer/supprimer instances
2- créer/supprimer les éléments de configurations associés à l'instance.
3- la nouvelle instance, ne devra être utilisée que si elle est jugée valide :
	- certaines instances, pourraient être valide sans avoir besoin d'éléments de configuration
	- d'autres ne pourant l'etre sans cela.
	- chaque classe implémentera donc une méthode : isValid ou isReady ou isCorrectlySetup ou needConfiguration
	- cette méthode, permettra aux Managers respectifs, de n'ajouter la dite instance, que lorsqu'elle est "configurée".
	- selon le choix du développeur du plugin, il pourra ou non indiquer qu'une entité est "Configurée" ou non même si elle ne l'est pas.
		- par exemple, on peut imaginer une View qui affiche un message contenu dans un élément de configuration MESSAGE.
		- selon le choix du développeur :
			- la View pourraît être affichée avec un traitement spécifique affichant au sein de la vue un message "Veuillez configurer le message !"
			- ou la vue pourraît être non visible (l'instance ne serait pas présente dans la liste des Vues
	- a l'inverse, pour un Datasource, on imagine mal, l'instance d'un Datasource fonctionner sans disposer d'éléments de configuration définis.
		- dans ce cas, il semble judicieux, que les Datasources soient désactivés tant qu'ils ne sont pas configurés correctement.
		

Pour résoudre le 1, il faudra 
- avoir accès aux différents Managers (DS, View, Plugin),

Pour résoudre le 2, il faudra
- avoir accès au schéma de configuration de chaque classe (Plugin, View, DS, etc)
- récupérer le schéma de cette classe
- générer et enregistrer ce schéma et l'associer au numéro d'instance.

Récupération du schéma de configuration de la classe
====================================================
Il faut donc définir le moyen par lequel, la fonction en charge de gérer l'allocations de nouvelles instances de tout Entité enregistrée dans hurry sera capable de 
récupérer le schéma de configuration de chaque entité.
Actuellement, nous avons utilisons un fichier présent à la racine du dossier du plugin.
Ce mode de fonctionnement semble inadapté compte tenu du fait qu'au sein d'un même plugin, il pourraît être définit plusieurs Datasources ayant chaqun des schémas de configurations spécifiques
Il serait préférable d'adopter le mode de fonctionnement suivant :
- Chaque classe d'entité (Plugin, DS, View, Shell, etc.) possédera une méthode getConfigurationSchema()
- Cette méthode retournera le schéma de configuration de la dite classe.
- Cette méthode sera peut être statique sera définie par défaut (pour les DS) afin de retourner {}
- Les DS qui le désirent n'auront qu'à surcharger cette méthode


Apres reflexion, avoir de multiples instances d'une vue semble peu probable et surtout incompatible avec le mode de fonctionnement envisagé.
En effet, ce ne sont pas des Instances de View qui sont enregistrées, mais leur définition (Classe) et leur multiple instanciation sont réalisées via l'insertion d'un menu ou autre
On considérera donc que les Vues ne seront instanciées qu'une seule fois
Par contre, les Datasources doivent être instanciables de multiples fois.
En y réfléchissant, finalement, seul les DS semblent avoir besoin de ce mécanisme lié à l'instance

En conséquence voici un résumé



Récapitulons
============
Les Datasources peuvent avoir un schéma de configuration
Les Plugins peuvent avoir un schéma de configuration. C'est dans 
Les plugins et les Datasources doivent avoir accès dans leur constructeur à la configuration qui les concerne.
Les plugins peuvent accéder à la configuration globale via l'api au besoin.
Pour ajouter un ou plusieurs DS, les Plugins devront lors de leur instanciation :
	- recevoir du pluginMgr :
		- l'API
		- le pluginPath
		- la configuration du plugin si elle existe
	- récupérer le DSMgr via l'API puis
	- définir un modulePath à partir du pluginPath et du chemin relatif à la DSClass
	- appeler DSMgr.RegisterDatasourceClass(DSDefinition, DSClass, modulePath, NOM_DU_DS)
	- le DSMgr devra stocker ces informations pour les utiliser ultérieurement lors d'un appel à DSMgr.init (ou équivalent)
		==> cela aura pour action de 
			- récupérer le nom du DSClass <== il faudra que cette propriété devienne statique OU QU'ELLE SOIT PASSE A RegisterDatasourceClass
			- récupérer dans config.DSInstances le nombre d'instances à créer
			- dériver le nom de la prochaine instance à créer et tenter de récupérer aupres du ConfigMgr la configuration spécifique du DS à partir de son nom
			- créer une instance de DSClass (DSDefinition, Config, modulePath)
			- appeler addDatasource(DSInstance)
		
