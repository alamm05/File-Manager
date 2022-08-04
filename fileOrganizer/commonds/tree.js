const fs = require("fs");

const path = require("path");

function treeFn (dirPath){
    if(dirPath==undefined){
        console.log("Please Enter a Valid path");
        return;
    }
    let doesExist = fs.existsSync(dirPath);
    if(doesExist == true){
        treeHelper(dirPath," ");
    }
}

function treeHelper(targetPath,indent){
    let isFile = fs.lstatSync(targetPath).isFile();

    if(isFile ==true){
        let fileName = path.basename(targetPath);
        console.log(indent + "├──" + fileName);
        return;
    }
    let dirName = path.basename(targetPath);
    console.log(indent + "└──" +dirName);

    let children = fs.readdirSync(targetPath);

    for(let i=0; i< children.length;i++){
        let  childPath = path.join(targetPath,children[i]);
        treeHelper(childPath,indent + "\t");
    }
}

module.exports = {
    tree:treeFn,
};


// let srcPath="D://Fjp5/Node//fileOrganizer"
// treeFn(srcPath);