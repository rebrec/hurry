# Hurry

[![Build status](https://ci.appveyor.com/api/projects/status/feo740yf95h17v2t?svg=true)](https://ci.appveyor.com/project/rebrec/hurry-6asla)


The (cross platform) SysAdmin's tool to get repetitive things done Fast.

![Hurry_Main](https://raw.githubusercontent.com/rebrec/hurry/master/docs/hurry_vSphere_result_ping.png)



# Download latest builds

- [Windows Release](https://github.com/rebrec/hurry/releases)
- Linux Release (Not available yet. Fill an issue if interested)

# Manual builds

Follow [this page](https://github.com/rebrec/hurry/docs/How_to_build.md) describing how to build from the sources


# Project description

Checkout the [GUI Overview with screenshots](https://github.com/rebrec/hurry/docs/GUI_Overview.md)

Hurry's is to allow command line gurus to share their work with users who prefer GUIs.

It was first released as a tool for support teams.

I was often creating powershell scripts to solve entreprise wide issues. When a user was calling the helpdesk, we had to ask for their computername etc to then execute my scripts remotely using winrm or psexec.

Now with hurry, i can embed my script within a contextual menu, helpdesk team just have to search for a specific user, click on its computer in the search result grid and choose the right action to perform on its computer from a contextual menu.

Since its beginning, we have extended its use so that :

- it can quickly interface with new datasources
- menu actions can use variables interpolated from contextual data gathered from the properties available within datasource records.
- a plugin system let you drive most of the application (adding new Views, updating menu content, adding datasource, new shells, etc.) still WIP.

# Source code

This project has been build with the great *electron-react-ts-boilerplate* project (based on [Electron Forge](https://www.electronforge.io/)). Thanks to this project, we can concentrate on coding an Electron Application with a React JS front end. The included Webpack configuration allow using both Javascript (*.js, *.jsx) and Typescript (*.ts, *.tsx).

It enables to use:
- React + Typescript for UI part
- Typescript for backend process part
- Jest for unit tests

It includes an example of communication between UI and Main processes (ipcRenderer and ipcMain). This example is curently not used at all.


# License

LGPL


