const path = require('path');
const fs = require('fs');

const rootFolders = ['widget'];
rootFolders.forEach((name)=>{
   const rootPath = path.resolve(path.dirname(__dirname), name);
    fileDisplay(rootPath);
});


function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
           return console.warn(err);
        }
        //遍历读取到的文件列表
        files.forEach(function(filename){
            //获取当前文件的绝对路径
            const filedir = path.join(filePath,filename);

            //根据文件路径获取文件信息，返回一个fs.Stats对象
            fs.stat(filedir,function(eror,stats){
                if(eror){
                    return console.warn('获取文件stats失败');
                }

                const isFile = stats.isFile();//是文件
                const isDir = stats.isDirectory();//是文件夹
                if(isFile){
                    if(filedir.endsWith('meta.json')){

                        const meta = require(filedir);
                        console.log(path.basename(path.dirname(filedir)),  meta.title,meta.author, path.dirname(filedir));
                    }

                }
                if(isDir){
                    fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                }
            })
        });
    });
}
