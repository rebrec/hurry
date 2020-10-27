# Creation of your First plugin

We will create a very simple Hello World plugin which will display **Hello World** when hurry start.

The goal is mainly to demonstrate where to create the plugin, where to put the code and how to build the plugin.

more complex examples will follow in this documentation.

Plugin's ultimate goal is to be shareable. They can be published to the npm registry so that Hurry can easily
find and install them.

For a plugin to be published you will have to host it on a public git repository.

We consider that you will know how to create a GitHub account and a new GitHub repository.

## Prerequisite

To ease the publishing of plugins, we are used to use a command line tool used to interact with GitHub's API.

This tool is called **hub** and can be downloaded from [here](https://github.com/github/hub)

It is not necessary to use it but will ease your dayly life if you want to often create new GitHub repositories
to hold your plugins's source code.

## Plugin location

During development, you will create your custom plugins within the *plugin-src* subfolder at the root of Hurry source code.

Each plugin is self-contained within a folder named as the plugin name.

![First_Configuration_Screen](/_images/hurry_plugin-src-location.png)

### Choose a plugin Name

You will first have to **choose a plugin name**. To be able to share it with others, you may want to choose a unique name.
For this purpose, a good idea is to **prefix your plugin name with 'hurry-'**.

To have a list of already used plugins you can get a list from [npmjs search engine](https://www.npmjs.com/search?q=keywords%3Ahurry-admin-plugin)

For the current exercise we will name our plugin **hurry-hello-world-plugin**

## Structure creation

### Folder

First, let's create our plugin's folder.

From a command prompt, create a folder named **hurry-hello-world-plugin** within the **plugin-src** folder

```cmd
cd <HURRY_PROJECT_ROOT>
cd plugin-src
mkdir hurry-hello-world-plugin
cd hurry-hello-world-plugin
```

![Plugin Folder Creation](/_images/hurry_plugin-folder-creation.png)

### GitHub Repository

Now create a repository to track our plugin's source code by going to [this link](https://github.com/new):


![Plugin Repo Creation](/_images/hurry_plugin-repo-creation.png)

![Plugin Repo Creation2](/_images/hurry_plugin-repo-creation-2.png)

Then initialise your empty repository and add the remote repository address 

```
echo "# hurry-hello-world-plugin" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:rebrec/hurry-hello-world-plugin.git
git push -u origin main
```

## Build


## Reload