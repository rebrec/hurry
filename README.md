# Hurry

The (cross platform) SysAdmin's tool to get repetitive things done Fast.

# Download latest build

- [Windows Release](https://xxxxxxxxxxxxx)
- [Linux Release](https://xxxxxxxxxxxxx)

# Manual Build

## Installation

Clone this repository using common *git clone* command :

```
git clone xxxxxxxxxxxxxx
```

## Linux

After cloning the repository

You will have to run the program as root (for now) to be able to create raw packets to send icmp packets to check hosts availability.

To start the project, run the following command :

sudo $(which node) $(which yarn) startroot

I was expecting to make it work without root privileged using network capabilities but it seems to not work properly with electron.

I have currently tried this (but it's not working) :

```
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip node_modules/electron/dist/electron
```
Then to prevent electron from complaining it cannot load xxxxxx, you will have to add the path to this library to a specific ld.conf configuration file 

```
# cd to your project's root
# become root
sudo -s
# create file
cat >/etc/ld.so.conf.d/electron.conf <<EOF
${PWD}/node_modules/electron/dist/
EOF

#update configuration
ldconfig
# go back as user
exit
```

If you don't want to add specific capabilities, you can still run this project as *root* user but it is strongly NOT RECOMMENDED.


## Windows

Like for Linux, under Windows, electron will need to be run in a priviledged UAC environment so that it can create raw icmp packet to send ping requests to check hosts availability.

This is done by default when running the dev environment with `yarn start` but in production, you may need to right click on the program and select *Run as Administrator*




# Project description

This project has been build with the great *electron-react-ts-boilerplate* project (based on [Electron Forge](https://www.electronforge.io/)). Thanks to this project, we can concentrate on coding an Electron Application with a React JS front end. The included Webpack configuration allow using both Javascript (*.js, *.jsx) and Typescript (*.ts, *.tsx).

It enables to use:
- React + Typescript for UI part
- Typescript for backend process part
- Jest for unit tests

It includes an example of communication between UI and Main processes (ipcRenderer and ipcMain). This example is curently not used at all.


Since i don't know much about Typescript (which looks great), the following code only contains JS code. But contributions could be done in TS if wanted.

Sooner or later i guess this project (if it stay alive thanks to contributors) may slowly become 100% Typescript code to improve code quality.


