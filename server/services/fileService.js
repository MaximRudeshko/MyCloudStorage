const fs = require('fs')
const File = require('../models/file')
const config = require('config')

class FileService{

    createDir(file){
        const filePath = `${config.get('filesPath')}\\${file.user}\\${file.path}`
        console.log(filePath)

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
}

module.exports = new FileService()

