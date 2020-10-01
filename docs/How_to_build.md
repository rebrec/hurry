# Manual Build

## Installation

Clone this repository using common *git clone* command :

```
git clone https://gitlab.com/rebrec/hurry
```

## Linux

After cloning the repository

You will have to run the program as root (for now) to be able to create raw packets to send icmp packets to check hosts availability.

To start the project, run the following command:

```
sudo $(which node) $(which yarn) startroot
```

I was expecting to make it work without root privileges using network capabilities but it seems to not work properly with electron.

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

If you don't want to add specific capabilities, **you can still run this project as *root* user** but it is strongly NOT RECOMMENDED.



## Windows

Like for Linux, under Windows, electron will need to be run in a priviledged UAC environment so that it can create raw icmp packet to send ping requests to check hosts availability.

This is done by default when running the dev environment with `yarn start` but in production, you may need to right click on the program and select *Run as Administrator*

