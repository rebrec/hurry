/*

  <xml>
    <Menu caption="system">
      <command description="some desc"
    </Menu>
  </xml>

  Return parse an XML config file
  Then generate a representation of a menu made of :
  - containers (menuitems)
  - commands
  - sequences : list of consecutives commands to run

  the data structure returned will be in the following form :

  [
    {item1}
    {item2}
    {...}
  ]

  Each item will have the following structure depending on its type :
   {
     type: "CONTAINER",
     name: "some_name",
     caption: "Container Caption",
     description: "Some descriptive explaination",
     tags: ["SOME_TAG", "SOME_OTHERTAG"],
     children: [],
   }
   {
     type: "COMMAND"
     name: "some_name",
     shellType: "powershell", [default to powershell and only supported currently]

     caption: "Command Caption",
     description: "Some descriptive explanation",
     commands: ['command1', 'command2'] <== every command will be executed 1 at a time
   }
   {
     type: "INFO"
     name: "some_name",
     caption: "Info Caption",
     description: "Some descriptive explaination",
     commands: ['command1'] <== the command must return JSON
   }




 */

export default class CommandListProvider {

}
