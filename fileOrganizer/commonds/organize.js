const fs =require("fs");
const path = require("path"); //path module
let types ={
    media: ['mp4','mkv','mp3'],
    archieves: ['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents: ['docs','doc','pdf','xlsx','xls','odt','ods'],
    app: ['exe','dmg','pkg','deb'],
    images: ['png','jpg','jpeg']
}
function organize(srcPath){
  //1.to check if srcPath is present
    if(srcPath==undefined){
        //console.log(srcPath);//undefined
        srcPath = process.cwd();
        //console.log("source path is",srcpath);

    }
    //2. to create a directory->organixed files
    //let organizedFiles =srcPath + "/"+"organized_files";
    let organizedFiles = path.join(srcPath, "organized_files");
    console.log("organized files folder path is",organizedFiles);
  if(fs.existsSync(organizedFiles)==false){
    fs.mkdirSync(organizedFiles);
  }
  else console.log("folder already exixts");
 // 3. scan the entire srcPath(downloads in this case)
 //reads the content of the directory, -> basically reads the name of files present in directory
 let allFiles = fs.readdirSync(srcPath);
 //console.log(allFiles);

 //4. travers of all  the files and clasify them on the basis of their extensions(.pdf,.mp3)
 for(let i =0; i<allFiles.length; i++){
  //let ext = allFiles[i].split(".")[1];
  //extname returns the extension of the file
  let fullPathOfFile = path.join(srcPath,allFiles[i]);
  console.log(fullPathOfFile);
  //1. check if it is file or folder
  //lstatSync gives the information regarding link provided
  let isThisAFile =fs.lstatSync(fullPathOfFile).isFile();
  console.log(allFiles[i] + "is"+ isThisAFile);
  if(isThisAFile){
    //1.1 get extension name
    let ext = path.extname(allFiles[i]).split(".")[1];
    //console.log(ext);
    //1.2 get folder name from extension
    let folderName = getFolderName(ext);//archieves
    //console.log(folderName);
    //1.3 copy from src folder(srcPath) and paste in des folder(folder name e.g document)
    copyFileToDest(srcPath,fullPathOfFile,folderName);

  }
  
 }

}
function getFolderName(ext){
  for(let key in types){
    //console.log(key);
    for(let i =0; i<types[key].length;i++){
      if(types[key][i] == ext){
        return key;
      }
    }
  }
  return "miscellaneous"
}
function copyFileToDest(srcPath,fullPathOfFile,folderName){
//   //1. folderName ka path banana h
   let destFolderPath = path.join(srcPath,"organized_files",folderName); //....../downloads/organized_files/archieves
   //console.log(des);
  //2 check folder if exists,if it does not,then make folder
   if(!fs.existsSync(destFolderPath)){
     fs.mkdirSync(destFolderPath);
   }
//   //3.copy file from src folder to dest folder

//   //returns the last portion of a path
   let fileName = path.basename(fullPathOfFile); //abc.zip
   let destFileName = path.join(destFolderPath,fileName);
   fs.copyFileSync(fullPathOfFile,destFileName);
 }
//  let srcPath = "D://Fjp5/Node//fileOrganizer//downloads"
// organize(srcPath);

module.exports = {
  organize:organize
}

