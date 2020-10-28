# Setup your build environment

If you wish to create your own plugin, or if you want to improve Hurry, you will have to setup
a build environment.

For this purpose, you will have to install differents elements that you may partially already have:

- **Git**: This is the tool in charge of handling code versioning on our project.
- **Node.JS**: this is the Javascript engine that will be in charge of running the core components
of Hurry.
- **Yarn** package manager 
- A recent version of **Powershell**: even if it's not mandatory, most actions performed by Hurry will
 execute Powershell scripts. If you don't have Powershell, most plugins you may try to use won't work
 properly.
- An **IDE**: even if it is not mandatory, most of us use an IDE, if you don't have one yet, you
may give a try to **Visual Studio Code** (it's free, it's OpenSource, it looks pretty and it just work
for coding in Node.js)

## Download Tools

Download and install the following tools :

- [Git](https://git-scm.com/download/win)
- [NodeJS](https://nodejs.org/en/download/)
- [yarn](https://classic.yarnpkg.com/fr/docs/install/#windows-stable)
- [Visual Studio Code](https://code.visualstudio.com/download)


## Download the source code

Click on the start menu and type *Git CMD*. This will open a command prompt where the *git* command is available.

Go into your desired project's folder and type :

```cmd
git clone https://github.com/rebrec
```

## Install project's dependencies

```cmd
yarn install
```

## Build and Run

```cmd
yarn start
```

## Create your first plugin

You may now try to [create your first plugin](/guides/getting-started/plugins/first-plugin/)