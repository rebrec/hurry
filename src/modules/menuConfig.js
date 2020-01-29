/*
        // EXAMPLE COMMAND
        {
          type: "COMMAND",
          shell: "powershell",
          platform: "linux",
          caption: "ping (linux)",
          output: "none",
          description: "Some descriptive explanation",
          commands: ["Start-Process -FilePath \"xterm\" -ArgumentList '-e bash -c \"ping #{hostname}\"'"]
        },

        // EXAMPLE CONTAINER
        {
          type: "CONTAINER",
          caption: "Opérationnel",
          description: "Some descriptive explaination",
          tags: ["SOME_TAG", "SOME_OTHERTAG"],
          children: []
        }
*/

export default {
  caption: "RACINE",
  children:
    [
      {
        "caption": "Artemis V2",
        "type": "CONTAINER",
        "children": [
          {
            "description": null,
            "caption": "Bureau ADM XP",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
              "explorer \"\\\\#{hostname}\\c$\\documents and settings\\Administrateur\\bureau\""
            ]
          },
          {
            "description": null,
            "caption": "Bureau ADM W7",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
              "explorer \"\\\\#{hostname}\\c$\\Users\\Administrateur\\Desktop\""
            ]
          },
          {
            "description": null,
            "caption": "map_artemis_v1",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
              "net use \\\\#{hostname} /user:#{hostname}\\Administrateur mllbhl72"
            ]
          },
          {
            "description": null,
            "caption": "map_artemis_v2_win7",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
              "net use \\\\#{hostname} /user:#{hostname}\\Administrateur Sdis72"
            ]
          },
          {
            "description": null,
            "caption": "c:\\",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
              "explorer \"\\\\#{hostname}\\c$\""
            ]
          },
          {
            "description": null,
            "caption": "c:\\temp",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
              "explorer \"\\\\#{hostname}\\c$\\temp\""
            ]
          },
          {
            "description": null,
            "caption": "c:\\windows",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
              "explorer \"\\\\#{hostname}\\c$\\windows\""
            ]
          },
          {
            "description": null,
            "caption": "taches_plannifiees",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
              "psexec \\\\#{hostname} schtasks /query"
            ]
          },
          {
            "description": null,
            "caption": "Remote DOS OP v2",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
              "Psexec \\\\#{hostname} -u #{hostname}\\Administrateur -p Sdis72 cmd"
            ]
          },
          {
            "description": null,
            "caption": "Affiche DOS OP v2",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
              "Psexec -s -i \\\\#{hostname} -u #{hostname}\\Administrateur -p Sdis72 cmd"
            ]
          },
          {
            "description": null,
            "caption": "ProcExp v2",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
              "Psexec \\\\#{hostname} -i -u #{hostname}\\Administrateur -p Sdis72 procexp.exe"
            ]
          },
          {
            "description": null,
            "caption": "Numéro de Série v2",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
              "wmic /user:#{hostname}\\administrateur /password:Sdis72 /node:#{hostname} bios get serialnumber"
            ]
          },
          {
            "description": null,
            "caption": "Vncviewer OP v2",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
              "tvnviewer -password=epsilon -host=#{hostname}"
            ]
          },
          {
            "caption": "CTA (Win7)",
            "type": "CONTAINER",
            "children": [
              {
                "caption": "Dossier",
                "type": "CONTAINER",
                "children": [
                  {
                    "description": "",
                    "caption": "Bureau (Admin)",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "net use \\\\#{hostname} /user:#{hostname}\\Administrateur Sdis72",
                      "explorer \"\\\\#{hostname}\\c$\\Users\\Administrateur\\Desktop\""
                    ]
                  },
                  {
                    "description": "",
                    "caption": "C:\\",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "net use \\\\#{hostname} /user:#{hostname}\\Administrateur Sdis72",
                      "explorer \"\\\\#{hostname}\\c$\""
                    ]
                  },
                  {
                    "description": "",
                    "caption": "C:\\Windows",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "net use \\\\#{hostname} /user:#{hostname}\\Administrateur Sdis72",
                      "explorer \"\\\\#{hostname}\\c$\\windows\"",
                      "explorer \\\\#{hostname}\\c$\\windows"
                    ]
                  },
                  {
                    "description": "",
                    "caption": "C:\\Temp",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "net use \\\\#{hostname} /user:#{hostname}\\Administrateur Sdis72",
                      "explorer \"\\\\#{hostname}\\c$\\temp\""
                    ]
                  }
                ]
              },
              {
                "caption": "Afficher sur la machine",
                "type": "CONTAINER",
                "children": [
                  {
                    "description": "",
                    "caption": "Process Explorer",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "Psexec \\\\#{hostname} -i -u #{hostname}\\Administrateur -p Sdis72 procexp.exe"
                    ]
                  },
                  {
                    "description": "",
                    "caption": "Fenêtre DOS",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "Psexec -s -i \\\\#{hostname} -u #{hostname}\\Administrateur -p Sdis72 cmd"
                    ]
                  }
                ]
              },
              {
                "caption": "Controle Distant",
                "type": "CONTAINER",
                "children": [
                  {
                    "description": "",
                    "caption": "Fenêtre DOS",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "Psexec \\\\#{hostname} -u #{hostname}\\Administrateur -p Sdis72 cmd"
                    ]
                  },
                  {
                    "description": "",
                    "caption": "Connexion VNC",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "tvnviewer -password=epsilon -host=#{hostname}"
                    ]
                  }
                ]
              },
              {
                "caption": "Informations",
                "type": "CONTAINER",
                "children": [
                  {
                    "description": "",
                    "caption": "Numéro de Série",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "wmic /user:#{hostname}\\administrateur /password:Sdis72 /node:#{hostname} bios get serialnumber"
                    ]
                  },
                  {
                    "description": "Liste les taches plannifiées de l\u0027ordinateur distant",
                    "caption": "Taches Plannifiées",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "net use \\\\#{hostname} /user:#{hostname}\\Administrateur Sdis72",
                      "psexec \\\\#{hostname} schtasks /query"
                    ]
                  }
                ]
              },
              {
                "caption": "Imprimantes",
                "type": "CONTAINER",
                "children": {
                  "description": "",
                  "caption": "Ajout IMP-024 CTA-NDD",
                  "shell": "cmd",
                  "type": "COMMAND",
                  "platform": "win32",
                  "commands": [
                    ""
                  ]
                }
              }
            ]
          },
          {
            "caption": "CIS (Linux)",
            "type": "CONTAINER",
            "children": [
              {
                "caption": "Controle Distant",
                "type": "CONTAINER",
                "children": [
                  {
                    "description": null,
                    "caption": "SSH",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "\"t:\\12- Administration Systemes Reseaux\\Outils\\CSharp\\GlpiSearch\\GlpiSearch\\Addons\\putty.exe\" -pw artemis artemis@#{hostname}"
                    ]
                  },
                  {
                    "description": "",
                    "caption": "Connexion VNC",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "tvnviewer -password=epsilon -host=#{hostname}"
                    ]
                  },
                  {
                    "description": null,
                    "caption": "Reboot CIS v2",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "\"t:\\12- Administration Systemes Reseaux\\Outils\\CSharp\\GlpiSearch\\GlpiSearch\\Addons\\ART-V2-Reboot.cmd\" #{hostname}"
                    ]
                  }
                ]
              },
              {
                "caption": "Dépannage",
                "type": "CONTAINER",
                "children": [
                  {
                    "description": null,
                    "caption": "Verif Lancement Auto IfErcs",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "\"t:\\12- Administration Systemes Reseaux\\Outils\\CSharp\\GlpiSearch\\GlpiSearch\\Addons\\ART-V2-Check_IfERCS.cmd\" #{hostname}"
                    ]
                  },
                  {
                    "description": null,
                    "caption": "Desactivation IfErcs",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "\"t:\\12- Administration Systemes Reseaux\\Outils\\CSharp\\GlpiSearch\\GlpiSearch\\Addons\\ART-V2-Disable_IfERCS.cmd\" #{hostname}"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "caption": "Réseau",
        "type": "CONTAINER",
        "children": [
          {
            "description": "Effectue un PING de la machine",
            "caption": "Ping",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
              "ping -t #{hostname}"
            ]
          },
          {
            "description": "Résolution DNS",
            "caption": "Nslookup",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
              "nslookup #{hostname}"
            ]
          },
          {
            "description": "Résolution DNS",
            "caption": "Traceroute",
            "shell": "cmd",
            "type": "COMMAND",
            "platform": "win32",
            "commands": [
              "tracert -4 -d #{hostname}"
            ]
          }
        ]
      },
      {
        "caption": "Administratif",
        "type": "CONTAINER",
        "children": [
          {
            "caption": "Wyses",
            "type": "CONTAINER",
            "children": [
              {
                "description": "Applique un correctif qui reinstalle a chaque reboot l\u0027imprimante, Puis reboot automatiquement le Wyse pour prendre en compte la modification",
                "caption": "PB Imprimante Samsung",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "\"t:\\12- Administration Systemes Reseaux\\Outils\\CSharp\\GlpiSearch\\GlpiSearch\\Addons\\pb_imprimante_wyse-samsung.cmd\" #{hostname}"
                ]
              },
              {
                "description": "Applique un correctif qui reinstalle a chaque reboot l\u0027imprimante, Puis reboot automatiquement le Wyse pour prendre en compte la modification",
                "caption": "PB Imprimante Bonnetable",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "\"t:\\12- Administration Systemes Reseaux\\Outils\\CSharp\\GlpiSearch\\GlpiSearch\\Addons\\pb_imprimante_wyse-bonnetable.cmd\" #{hostname}"
                ]
              },
              {
                "description": null,
                "caption": "Redirection CUPS vers http://localhost:631/",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "\"t:\\12- Administration Systemes Reseaux\\Outils\\CSharp\\GlpiSearch\\GlpiSearch\\Addons\\plink.exe\" -pw admin -L 631:127.0.0.1:631 admin@#{hostname}"
                ]
              },
              {
                "description": null,
                "caption": "Reboot du Wyse",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "\"t:\\12- Administration Systemes Reseaux\\Outils\\CSharp\\GlpiSearch\\GlpiSearch\\Addons\\plink.exe\" -pw admin admin@#{hostname} sudo reboot"
                ]
              },
              {
                "description": null,
                "caption": "SSH (PuTTY) Wyse",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "\"t:\\12- Administration Systemes Reseaux\\Outils\\CSharp\\GlpiSearch\\GlpiSearch\\Addons\\putty.exe\" -pw admin admin@#{hostname}"
                ]
              }
            ]
          },
          {
            "caption": "Système",
            "type": "CONTAINER",
            "children": [
              {
                "description": "Acces au DOS Distant",
                "caption": "Remote DOS",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "Psexec \\\\#{hostname} cmd"
                ]
              },
              {
                "description": "Reboot",
                "caption": "Reboot",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "PSSHUTDOWN -m \"Dépannage Service Informatique\" -f -t 0 -r  \\\\#{hostname}"
                ]
              },
              {
                "description": "Affichage une fenêtre DOS sur le Système distant avec les droits SYSTEM",
                "caption": "Affiche DOS",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "Psexec -s -i \\\\#{hostname} cmd"
                ]
              },
              {
                "description": "Affiche ProceXP (Attention ! Droits Admins)",
                "caption": "Affiche ProceXp",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "psexec -s \\\\#{hostname} -i procexp.exe"
                ]
              },
              {
                "description": "Affichage les imprimantes actuellement configurées sur la machine distante pour utilisateur actuellement connecté",
                "caption": "Imprimantes Installées",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -file \"t:\\12- Administration Systemes Reseaux\\Outils\\CSharp\\GlpiSearch\\GlpiSearch\\Addons\\Liste_Imprimantes_Distantes.ps1\" #{hostname}"
                ]
              },
              {
                "description": "Affichage un historique des derniers reboots effectués par la machine distante.",
                "caption": "Historique de Reboot",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -file \"t:\\12- Administration Systemes Reseaux\\Outils\\CSharp\\GlpiSearch\\GlpiSearch\\Addons\\Historique_Reboot.ps1\" #{hostname}"
                ]
              },
              {
                "description": null,
                "caption": "copie_wu_ps1",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "xcopy /y \"T:\\12- Administration Systemes Reseaux\\Outils\\Scripts\\PowerShell\\Reporting\\WindowsUpdate_Repport.ps1\" \"\\\\#{hostname}\\c$\\windows\\\""
                ]
              },
              {
                "description": "[Script qui prend plus d\u00271 minute a s\u0027exécuter]Exécute un script PS qui va lister les mises à  jour WU en échec ainsi que le nombre de MAJ restant à  réaliser",
                "caption": "Rapport Windows Update",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -file \"T:\\12- Administration Systemes Reseaux\\Outils\\Scripts\\PowerShell\\Reporting\\WindowsUpdate_Repport.ps1\"  #{hostname}"
                ]
              },
              {
                "caption": "Dossiers",
                "type": "CONTAINER",
                "children": [
                  {
                    "description": "Accès C$",
                    "caption": "C$",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "explorer \\\\#{hostname}\\c$"
                    ]
                  },
                  {
                    "description": "Accès D$",
                    "caption": "D$",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "explorer \\\\#{hostname}\\D$"
                    ]
                  },
                  {
                    "description": "Accès E$",
                    "caption": "E$",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "explorer \\\\#{hostname}\\E$"
                    ]
                  },
                  {
                    "description": "Accès au dossier Windows distant",
                    "caption": "C:\\Windows",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "explorer \\\\#{hostname}\\c$\\windows"
                    ]
                  },
                  {
                    "description": "Accès au dossier System32 distant",
                    "caption": "C:\\Windows\\System32",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "explorer \\\\#{hostname}\\c$\\windows\\system32"
                    ]
                  },
                  {
                    "description": "Accès au dossier Program Files distant",
                    "caption": "C:\\Program Files",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "explorer \"\\\\#{hostname}\\c$\\Program Files\""
                    ]
                  },
                  {
                    "description": "Accès au dossier Program Files(x86) distant",
                    "caption": "C:\\Program Files(x86)",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "explorer \"\\\\#{hostname}\\c$\\Program Files(x86)\""
                    ]
                  }
                ]
              }
            ]
          },
          {
            "caption": "VNC",
            "type": "CONTAINER",
            "children": [
              {
                "description": "Lance VNCBypass",
                "caption": "VNC_Bypass",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "cscript \"\\\\srv-fic04\\e$\\Service Informatique\\4221_Informatique\\12- Administration Systemes Reseaux\\Outils\\Scripts\\VncBypass\\VNC_Bypass2.vbs\" #{hostname}"
                ]
              },
              {
                "description": "Lance VNCVIEWER ",
                "caption": "Vncviewer ADM",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "start \"\" \"\\\\srv-fic04\\e$\\Service Informatique\\4221_Informatique\\12- Administration Systemes Reseaux\\Outils\\Scripts\\VncBypass\\vncviewer.exe\" #{hostname}"
                ]
              }
            ]
          },
          {
            "caption": "WPKG",
            "type": "CONTAINER",
            "children": [
              {
                "description": "Provoque une reinstallation de WPKG pour prendre en compte un basculement entre les Branches STABLE et UNSTABLE.",
                "caption": "Application Changement Stable/Unstable",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "del /q \\\\#{hostname}\\c$\\windows\\conf-wpkg-3-*.txt",
                  "Psexec \\\\#{hostname} schtasks /run /tn lancement_wpkg"
                ]
              },
              {
                "description": "Provoque une reinstallation de WPKG reinstallation de la tache plannifiee.",
                "caption": "Reinstallation WPKG",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "del /q \\\\#{hostname}\\c$\\windows\\conf-wpkg-3-*.txt",
                  "Psexec \\\\#{hostname} schtasks /run /tn lancement_wpkg"
                ]
              },
              {
                "description": "",
                "caption": "Suppression conf-wpkg-3-...txt",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "del /q \\\\#{hostname}\\c$\\windows\\conf-wpkg-3-*.txt"
                ]
              },
              {
                "description": "Execute WPKG sur la machine distante sans attendre le prochain interval d\u0027execution",
                "caption": "Execution de WPKG",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "Psexec \\\\#{hostname} schtasks /run /tn lancement_wpkg"
                ]
              },
              {
                "description": "Affiche le fichier de Log de WPKG situé dans le dossier TEMP de la machine.",
                "caption": "WPKG Local",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "start \\\\#{hostname}\\c$\\windows\\temp\\#{hostname}.log"
                ]
              },
              {
                "caption": "Réparation",
                "type": "CONTAINER",
                "children": [
                  {
                    "description": "Supprime le fichier c:\\windows\\wpkg.xml pour que la machine revérifie que tout est installé correctement",
                    "caption": "Purge Wpkg.xml",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "del \\\\#{hostname}\\c$\\windows\\system32\\wpkg.xml"
                    ]
                  },
                  {
                    "description": "Install VNC, via WPKG",
                    "caption": "Installation VNC",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "psexec -s \\\\#{hostname} cscript.exe \\\\srv-wds01\\wpkg\\branche\\stable\\wpkg.js /install:ultravnc"
                    ]
                  },
                  {
                    "description": "Supprime l\u0027installation de VNC, via WPKG (la réinstallation peut être accélérée en lancant ensuite \u0027Execution de WPKG\u0027",
                    "caption": "Suppression VNC",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "psexec -s \\\\#{hostname} cscript.exe \\\\srv-wds01\\wpkg\\branche\\stable\\wpkg.js /remove:ultravnc"
                    ]
                  },
                  {
                    "description": "Desinstalle, puis réinstall ultravnc",
                    "caption": "Reinstallation de VNC",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "psexec -s \\\\#{hostname} cscript.exe \\\\srv-wds01\\wpkg\\branche\\stable\\wpkg.js /remove:ultravnc",
                      "psexec -s \\\\#{hostname} cscript.exe \\\\srv-wds01\\wpkg\\branche\\stable\\wpkg.js /install:ultravnc"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "caption": "Dépannage",
            "type": "CONTAINER",
            "children": [
              {
                "description": null,
                "caption": "Install IE11 x64",
                "shell": "cmd",
                "type": "COMMAND",
                "platform": "win32",
                "commands": [
                  "psexec -s \\\\#{hostname} \"\\\\srv-wds01\\wpkg\\packages\\Fix\\ie11\\IE11.cmd\""
                ]
              },
              {
                "caption": "Migration Citrix",
                "type": "CONTAINER",
                "children": [
                  {
                    "description": null,
                    "caption": "Reinstall Ancien client",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "psexec -s \\\\#{hostname} \"\\\\srv-wds01\\wpkg\\packages\\client-ica\\reinstall-old-client.cmd\""
                    ]
                  },
                  {
                    "description": null,
                    "caption": "Reinstall New client (sans dodo!)",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "psexec -i -s \\\\#{hostname} \"\\\\srv-wds01\\wpkg\\packages\\client-ica\\reinstall-new-client.cmd\""
                    ]
                  },
                  {
                    "description": null,
                    "caption": "Correction Pb Icons Blancs",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -file \"t:\\12- Administration Systemes Reseaux\\Outils\\CSharp\\GlpiSearch\\GlpiSearch\\Addons\\Pb_Citrix_Receiver_Icones_Blancs.ps1\" #{hostname}"
                    ]
                  }
                ]
              },
              {
                "caption": "Migration Imp03",
                "type": "CONTAINER",
                "children": [
                  {
                    "description": null,
                    "caption": "Gpupdate",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "psexec \\\\#{hostname} gpupdate /force"
                    ]
                  },
                  {
                    "description": null,
                    "caption": "Uptime",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "psexec \\\\#{hostname} \"net statistics workstation\""
                    ]
                  },
                  {
                    "description": "Retour en arriere (provisoire si testeur ou en prod) de la migration vers srv-imp03",
                    "caption": "Migration imp02 -\u003e imp03 (revert)",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "psexec \\\\#{hostname} runfromprocess-x64 nomsg explorer.exe  \\\\sdis72.fr\\NETLOGON\\Script_GPOs\\GPO_Imprimantes_IMP-XXX_SRV-IMP03\\revert.cmd"
                    ]
                  },
                  {
                    "description": "Retour en arriere (provisoire si testeur ou en prod) de la migration vers srv-imp03",
                    "caption": "Migration imp02 -\u003e imp03",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "psexec \\\\#{hostname} runfromprocess-x64 nomsg explorer.exe  \\\\sdis72.fr\\NETLOGON\\Script_GPOs\\GPO_Imprimantes_IMP-XXX_SRV-IMP03\\revert.cmd"
                    ]
                  }
                ]
              },
              {
                "caption": "Office Standard",
                "type": "CONTAINER",
                "children": [
                  {
                    "description": "Réinstallation complète Office 2016 Standard Edition",
                    "caption": "Full Repair Office 2016",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "psexec -s \\\\#{hostname} \\\\srv-wds01\\wpkg\\fix\\FullRepairOFFICE2016-Standard.cmd"
                    ]
                  },
                  {
                    "description": "Réinstallation complète Office 2010 Standard Edition",
                    "caption": "Full Repair Office 2010",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "psexec -s \\\\#{hostname} \\\\srv-wds01\\wpkg\\fix\\FullRepairOFFICE2010-Standard.cmd"
                    ]
                  },
                  {
                    "description": "Restaure le Profile Outlook nommé BACKUP X Of xxxxxxxx",
                    "caption": "Fix Profile Outlook",
                    "shell": "cmd",
                    "type": "COMMAND",
                    "platform": "win32",
                    "commands": [
                      "\"t:\\12- Administration Systemes Reseaux\\Outils\\CSharp\\GlpiSearch\\GlpiSearch\\Addons\\owexec.exe\" -c #{hostname} -k \\\\srv-fic04\\general\\Informatique\\_Dépannage\\Probleme_Outlook.cmd"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]

}









/*{
  caption: "RACINE",
  children: [
    {
      type: "CONTAINER",
      caption: "Opérationnel",
      description: "Some descriptive explaination",
      datasource: "host-file",
      tags: ["SOME_TAG", "SOME_OTHERTAG"],
      children: [
        {
          type: "CONTAINER",
          caption: "CIS (Linux)",
          description: "Some descriptive explaination",
          tags: ["SOME_TAG", "SOME_OTHERTAG"],
          children: [
            {
              type: "COMMAND",
              shell: "cmd",
              platform: "win32",
              caption: "SSH",
              output: "none",
              description: "Some descriptive explanation",
              commands: [`\\\\srv-fic04\\4221_informatique\\12- Administration Systemes Reseaux\\Outils\\CSharp\\GlpiSearch\\GlpiSearch\\Addons\\ART-V2-Reboot.cmd" {#ipaddress}`]
            },
            {
              type: "COMMAND",
              shell: "cmd",
              platform: "win32",
              caption: "Reboot",
              output: "none",
              description: "Some descriptive explanation",
              commands: [`\\\\srv-fic04\\4221_informatique\\12- Administration Systemes Reseaux\\Outils\\CSharp\\GlpiSearch\\GlpiSearch\\Addons\\putty.exe" -pw artemis artemis@#{ipaddress}`]
            },
          ]
        },
        {
          type: "COMMAND",
          shell: "powershell",
          platform: "win32",
          caption: "Bureau ADM W7",
          output: "none",
          description: "Some descriptive explanation",
          commands: [
            `net use \\\\#{ipaddress} /user:#{ipaddress}\\Administrateur Sdis72`,
            `explorer "\\\\#{ipaddress}\\c$\\Users\\Administrateur\\Desktop`
          ]
        },
        {
          type: "COMMAND",
          shell: "powershell",
          platform: "win32",
          caption: "c:\\",
          output: "none",
          description: "Some descriptive explanation",
          commands: [
            `net use \\\\#{ipaddress} /user:#{ipaddress}\\Administrateur Sdis72`,
            `explorer "\\\\#{MACHINE}\\c$`
          ]
        },
        {
          type: "COMMAND",
          shell: "powershell",
          platform: "win32",
          caption: "c:\\temp",
          output: "none",
          description: "Some descriptive explanation",
          commands: [
            `net use \\\\#{ipaddress} /user:#{ipaddress}\\Administrateur Sdis72`,
            `explorer "\\\\#{MACHINE}\\c$\\temp`
          ]
        },
        {
          type: "COMMAND",
          shell: "powershell",
          platform: "win32",
          caption: "c:\\windows",
          output: "none",
          description: "Some descriptive explanation",
          commands: [
            `net use \\\\#{ipaddress} /user:#{ipaddress}\\Administrateur Sdis72`,
            `explorer "\\\\#{MACHINE}\\c$\\windows`
          ]
        },
        {
          type: "COMMAND",
          shell: "powershell",
          platform: "win32",
          caption: "Taches Plannifiées",
          output: "none",
          description: "Some descriptive explanation",
          commands: [
            `net use \\\\#{ipaddress} /user:#{ipaddress}\\Administrateur Sdis72`,
            `psexec \\\\#{ipaddress} schtasks /query`
          ]
        },
        {
          type: "COMMAND",
          shell: "powershell",
          platform: "win32",
          caption: "Remote DOS OP v2",
          output: "none",
          description: "Some descriptive explanation",
          commands: [
            `Psexec \\\\#{ipaddress} -u #{ipaddress}\\Administrateur -p Sdis72 cmd`,
          ]
        },
        {
          type: "COMMAND",
          shell: "powershell",
          platform: "win32",
          caption: "Affiche DOS OP v2",
          output: "none",
          description: "Some descriptive explanation",
          commands: [
            `Psexec -s -i \\\\#{ipaddress} -u #{ipaddress}\\Administrateur -p Sdis72 cmd`,
          ]
        },
        {
          type: "COMMAND",
          shell: "powershell",
          platform: "win32",
          caption: "ProcExp v2",
          output: "none",
          description: "Some descriptive explanation",
          commands: [
            `Psexec -s -i \\\\#{ipaddress} -u #{ipaddress}\\Administrateur -p Sdis72 procexp.exe`,
          ]
        },
        {
          type: "COMMAND",
          shell: "powershell",
          platform: "win32",
          caption: "Numéro de Série v2",
          output: "none",
          description: "Some descriptive explanation",
          commands: [
            `wmic /user:#{ipaddress}\\administrateur /password:Sdis72 /node:#{ipaddress} bios get serialnumber`
          ]
        },
        {
          type: "COMMAND",
          shell: "cmd",
          platform: "win32",
          caption: "Vncviewer OP v2",
          output: "none",
          description: "Some descriptive explanation",
          commands: [
            `tvnviewer -password=epsilon -host=#{ipaddress}`,
          ]
        },



      ]
    },
    {
      type: "CONTAINER",
      caption: "Administratif",
      description: "Some descriptive explaination",
      datasource: "glpi",
      tags: ["SOME_TAG", "SOME_OTHERTAG"],
      children: [
        {
          type: "CONTAINER",
          caption: "Système",
          description: "Some descriptive explaination",
          tags: ["SOME_TAG", "SOME_OTHERTAG"],
          children: [
            {
              type: "COMMAND",
              shell: "cmd",
              platform: "win32",
              caption: "Remote DOS",
              output: "none",
              description: "Some descriptive explanation",
              commands: [`psexec -s \\\\#{hostname} cmd`]
            },
            {
              type: "COMMAND",
              shell: "cmd",
              platform: "win32",
              caption: "Reboot",
              output: "none",
              description: "Some descriptive explanation",
              commands: [`psshutdown -m "Dépannage Service Informatique" -f -t 0 -r \\\\#{hostname}`]
            },








            {
              type: "COMMAND",
              shell: "cmd",
              platform: "win32",
              caption: "Affiche DOS",
              output: "none",
              description: "Some descriptive explanation",
              commands: [`Psexec -s -i \\{MACHINE} cmd`]
            },
            {
              type: "COMMAND",
              shell: "cmd",
              platform: "win32",
              caption: "Affiche ProceXp",
              output: "none",
              description: "Some descriptive explanation",
              commands: [`psexec -s \\{MACHINE} -i procexp.exe`]
            },
            {
              type: "COMMAND",
              shell: "cmd",
              platform: "win32",
              caption: "Imprimantes Installées",
              output: "none",
              description: "Some descriptive explanation",
              commands: [`. "t:\12- Administration Systemes Reseaux\Outils\CSharp\GlpiSearch\GlpiSearch\Addons\Liste_Imprimantes_Distantes.ps1" {MACHINE}`]
            },
            {
              type: "COMMAND",
              shell: "cmd",
              platform: "win32",
              caption: "Historique de Reboot",
              output: "none",
              description: "Some descriptive explanation",
              commands: [`. t:\12- Administration Systemes Reseaux\Outils\CSharp\GlpiSearch\GlpiSearch\Addons\Historique_Reboot.ps1" {MACHINE}`]
            },
            {
              type: "COMMAND",
              shell: "cmd",
              platform: "win32",
              caption: "Rapport Windows Update",
              output: "none",
              description: "Some descriptive explanation",
              commands: [`". T:\12- Administration Systemes Reseaux\Outils\Scripts\PowerShell\Reporting\WindowsUpdate_Repport.ps1"  {MACHINE}`]
            },
            {
              type: "COMMAND",
              shell: "cmd",
              platform: "win32",
              caption: "VNC_Bypassv",
              output: "none",
              description: "Some descriptive explanation",
              commands: [`. "\\srv-fic04\e$\Service Informatique\4221_Informatique\12- Administration Systemes Reseaux\Outils\Scripts\VncBypass\VNC_Bypass2.vbs" {MACHINE}`]
            },
            {
              type: "COMMAND",
              shell: "cmd",
              platform: "win32",
              caption: "Historique de Reboot",
              output: "none",
              description: "Some descriptive explanation",
              commands: [`t:\12- Administration Systemes Reseaux\Outils\CSharp\GlpiSearch\GlpiSearch\Addons\Historique_Reboot.ps1" {MACHINE}`]
            },
            {
              type: "COMMAND",
              shell: "cmd",
              platform: "win32",
              caption: "Historique de Reboot",
              output: "none",
              description: "Some descriptive explanation",
              commands: [`t:\12- Administration Systemes Reseaux\Outils\CSharp\GlpiSearch\GlpiSearch\Addons\Historique_Reboot.ps1" {MACHINE}`]
            },
            {
              type: "COMMAND",
              shell: "cmd",
              platform: "win32",
              caption: "Historique de Reboot",
              output: "none",
              description: "Some descriptive explanation",
              commands: [`t:\12- Administration Systemes Reseaux\Outils\CSharp\GlpiSearch\GlpiSearch\Addons\Historique_Reboot.ps1" {MACHINE}`]
            },

            {
              type: "CONTAINER",
              caption: "Dossiers",
              description: "Some descriptive explaination",
              tags: ["SOME_TAG", "SOME_OTHERTAG"],
              children: []
            },
          ]
        },
        {
          type: "CONTAINER",
          caption: "WPKG",
          platform: "win32",
          description: "Some descriptive explaination",
          tags: ["SOME_TAG", "SOME_OTHERTAG"],
          children: [

          ]
        },
        {
          type: "CONTAINER",
          caption: "Dépannage",
          description: "Some descriptive explaination",
          tags: ["SOME_TAG", "SOME_OTHERTAG"],
          children: [

          ]
        },




      ]
    },
    {
      type: "CONTAINER",
      caption: "Réseau",
      description: "Some descriptive explaination",
      tags: ["SOME_TAG", "SOME_OTHERTAG"],
      children: [
        {
          type: "COMMAND",
          shell: "powershell",
          platform: "linux",
          caption: "ping (linux)",
          output: "none",
          description: "Some descriptive explanation",
          commands: ["Start-Process -FilePath \"xterm\" -ArgumentList '-e bash -c \"ping #{hostname}\"'"]
        },
        {
          type: "COMMAND",
          shell: "powershell",
          caption: "ping (win, posh)",
          platform: "win32",
          output: "none",
          description: "Some descriptive explanation",
          commands: ["Start-Process -FilePath \"cmd\" -ArgumentList ' /c \"ping #{hostname}\"'"]
        },
        {
          type: "COMMAND",
          shell: "cmd",
          caption: "ping (win, cmd)",
          platform: "win32",
          output: "none",
          description: "Some descriptive explanation",
          commands: ["start \"\" ping #{hostname}"]
        },
        {
          type: "COMMAND",
          shell: "cmd",
          caption: "Nslookup",
          platform: "win32",
          output: "none",
          description: "Some descriptive explanation",
          commands: ["start \"\" nslookup #{hostname}"]
        },
        {
          type: "COMMAND",
          shell: "cmd",
          caption: "Traceroute",
          platform: "win32",
          output: "none",
          description: "Some descriptive explanation",
          commands: ["start \"\" tracert -4 -d #{hostname}"]
        },

      ]
    },
    {
      type: "INFO",
      caption: "Info Caption",
      description: "Some descriptive explaination",
      commands: ["command1"]
    }
  ]
};


*/