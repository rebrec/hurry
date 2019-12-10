
const menu = {
  caption: "TITRE",
  children: [
    {
      type: "CONTAINER",
      caption: "Opérationnel",
      description: "Some descriptive explaination",
      tags: ["SOME_TAG", "SOME_OTHERTAG"],
      children: []
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
              caption: "ping (win)",
              platform: "win32",
              output: "none",
              description: "Some descriptive explanation",
              commands: ["Start-Process -FilePath \"cmd\" -ArgumentList ' /c \"ping #{hostname}\"'"]
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
      caption: "Niveau A 3",
      description: "Some descriptive explaination",
      tags: ["SOME_TAG", "SOME_OTHERTAG"],
      children: [
        {
          type: "COMMAND",
          shell: "powershell",
          caption: "Command 1",
          description: "Some descriptive explanation",
          commands: ["Write-Host \"blah\""]
        }
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


export default menu;
