# Hurry

[![Build status](https://ci.appveyor.com/api/projects/status/br0s4qlnkwop064x?svg=true)](https://ci.appveyor.com/project/rebrec/hurry-rkfu0)


The (cross-platform) SysAdmin's tool to get repetitive things done Fast.

![Hurry_Main](https://raw.githubusercontent.com/rebrec/hurry/master/docs/hurry_vSphere_result_ping.png)

[More screenshots](https://github.com/rebrec/hurry/blob/master/docs/GUI_Overview.md)


# Installation and configuration

## Download latest builds

- [Windows Release](https://github.com/rebrec/hurry/releases)
- Linux Release (Not available yet. Fill an issue if interested or ask on [Discord](https://discord.com/invite/7cEWVvC))

## Download plugins

To be able to work with some data **you need plugins**.

Only manual installation of plugins is currently available. You will have to download
a zip file containing plugins, and then extract it's content to the *hurry plugin directory* (see *Configuration*).

You can download the plugin release from [here](https://github.com/rebrec/hurry-plugins/releases/download/1.0.1/plugins.tar.gz)
The latest release is always available from [this page](https://github.com/rebrec/hurry-plugins/releases/latest/)

## Initial Configuration

Run the freshly downloaded Hurry setup and then start Hurry.

It will prompt you with a *First Configuration* screen.

![First_Configuration_Screen](https://raw.githubusercontent.com/rebrec/hurry/master/docs/hurry_initial_setup_plugin_dir.png)

Note the path written within the *Plugin Directory* text area (see the red arrow in the above screenshot) and extract the content of the plugins' archive file into that folder:

- For Windows, you can use [7zip](https://www.7-zip.org/download.html)
- Under Linux, you may type from a terminal something like `cd $HOME/.hurry/plugins;tar zxvf <THE_PATH_TO_YOUR_plugins.tar.gz_FILE>`

Then, click on the *Submit* button at the bottom of the configuration screen and you are done !

# Manual builds

Follow [this page](https://github.com/rebrec/hurry/blob/master/docs/How_to_build.md) describing how to build from the sources

# Prerequisites

To be able to use most of Hurry's features, you will need a recent version or *Powershell*.

For Linux users, get it from [here](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-linux?view=powershell-7)


# Project description

Check out the [GUI Overview with screenshots](https://github.com/rebrec/hurry/blob/master/docs/GUI_Overview.md)

Hurry's is to allow command-line gurus to share their work with users who prefer GUIs.

It was first released as a tool for support teams.

I was often creating Powershell scripts to solve enterprise-wide issues. When a user was calling the helpdesk, we had to ask for their computer name, etc to then execute my scripts remotely using WinRM or psexec.

Now with Hurry, I can embed my script within a contextual menu, helpdesk team just have to search for a specific user, click on its computer in the search result grid and choose the right action to perform on its computer from a contextual menu.

Since its beginning, we have extended its use so that :

- it can quickly interface with new datasources
- menu actions can use variables interpolated from contextual data gathered from the properties available within datasource records.
- a plugin system lets you drive most of the application (adding new Views, updating menu content, adding datasource, new shells, etc.) still WIP.

# Source code

This project has been build with the great *electron-react-ts-boilerplate* project (based on [Electron Forge](https://www.electronforge.io/)). Thanks to this project, we can concentrate on coding an Electron Application with a React JS front end. The included Webpack configuration allow using both Javascript (*.js, *.jsx) and Typescript (*.ts, *.tsx).

It enables to use:
- React + Typescript for UI part
- Typescript for backend process part
- Jest for unit tests

It includes an example of communication between UI and Main processes (ipcRenderer and ipcMain). This example is currently not used at all.

# Support

For any bug, questions on how to do I use, or features additions, feel free to create an [issue](https://github.com/rebrec/hurry/issues/new/choose)

A *Discord* server is available here to live chat, ask questions, give your opinion on the project : [lets meet there](https://discord.com/invite/7cEWVvC)

# License

LGPL


