// entry point of my commond line
let helpFunc = require("./commonds/help");
let orgFunc = require("./commonds/organize");
let treeFunc = require("./commonds/tree");
//console.log(helpFunc.ghoda());
let inputArr = process.argv.slice(2);
let commond = inputArr[0];
let path = inputArr[1];
switch(commond){ //organize
    case "tree":
        //call tree function
        console.log("tree function called and executed succesfully on path" +path);
        treeFunc.tree(path)
        break;
    case "organize":
            //call organize  function
            console.log("organize function called and executed successfully on path"+ path);
             orgFunc.organize(path);
            break;
    case "help":
        //call help function
        helpFunc.help();
        console.log("help function called and executed successfully on path");
        break;

    default:
        console.log("commond not recognized :/");
        break;
}