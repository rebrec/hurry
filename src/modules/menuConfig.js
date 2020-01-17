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
  children: [
    {
      type: "CONTAINER",
      caption: "Opérationnel",
      description: "Some descriptive explaination",
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
      tags: ["SOME_TAG", "SOME_OTHERTAG"],
      children: [
        {
          type: "CONTAINER",
          caption: "Système",
          description: "Some descriptive explaination",
          tags: ["SOME_TAG", "SOME_OTHERTAG"],
          children: [
            {
              type: "CONTAINER",
              caption: "VNC",
              description: "Some descriptive explaination",
              tags: ["SOME_TAG", "SOME_OTHERTAG"],
              children: [
                {
                  type: "COMMAND",
                  shell: "powershell",
                  caption: "Ultravnc",
                  description: "Some descriptive explanation",
                  commands: ["Write-Host \"blah\""]
                },
                {
                  type: "COMMAND",
                  shell: "powershell",
                  caption: "Vnc Bypass",
                  description: "Some descriptive explanation",
                  commands: ["Write-Host \"blah\""]
                },

              ]
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


