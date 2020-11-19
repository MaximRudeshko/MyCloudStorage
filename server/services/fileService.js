const fs = require('fs')
const path = require('path')
const File = require('../models/file')
const config = require('config')

class FileService{

    createDir(file){
        const filePath = `${config.get('filesPath')}\\${file.user}\\${file.path}`

        return new Promise((resolve, reject) => {
            try {
                if(!fs.existsSync(filePath)){
                    fs.mkdirSync(filePath)
                    return resolve({message: 'File was created'})
                }else{
                    return reject({message: 'File already exist'})
                }
            } catch (error) {
                console.log(error)
                return reject({message: 'File Error'})
            }
        })
    }

    /* deleteFolderRecursive(file) {
        const path = this.getPath(file)
        if (fs.existsSync(path)) {
          fs.readdirSync(path).forEach((file, index) => {
            const curPath = Path.join(path, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
              deleteFolderRecursive(curPath);
            } else { // delete file
              fs.unlinkSync(curPath);
            }
          });
          fs.rmdirSync(path);
        }
      }; */

    deleteFile(file){
        const path = this.getPath(file)
        console.log(path)
        if(file.type === 'dir'){
            fs.rmdirSync(path)
        }else{
            fs.unlinkSync(path)
        }
    }


    getPath(file){
        return config.get('filesPath') + '\\' + file.user + '\\' + file.path
    }
}

module.exports = new FileService()

