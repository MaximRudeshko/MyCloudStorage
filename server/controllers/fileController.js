const File = require('../models/file');
const User = require('../models/user');
const confing = require('config')
const fs = require('fs')

const fileService = require('../services/fileService');
const file = require('../models/file');

class FileController{
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new File({name, type, parent, user: req.user.id})
            const parentFile = await File.findOne({_id: parent})
            if(!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = `${parentFile.path}\\${file.name}`
                await fileService.createDir(file)
                console.log(parentFile)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async getFiles(req, res){
        try {
            const files = await File.find({user: req.user.id, parent: req.query.parent})
            console.log(req.query.parent)
            return res.json(files)
        } catch (error) {
            console.log(error)
        }
    }

    async uploadFile(req, res){
        try {
            const files = req.files.file
            
            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findOne({_id: req.user.id})

            if(user.usedSpace + file.size > user.diskSpace){
                return res.status(400).json({message: "There no space on the disk"})
            }

            user.usedSpace = user.usedSpace + file.size;

            if(parent){
                path = `${config.get('filesPath')}\\${user.id}\\${parent.path}\\${file.name}`
            }else{
                path = `${config.get('filesPath')}\\${user.id}\\${file.name}`
            }

            if(fs.existsSync(path)){
                return res.status(500).json({message: 'File already exist'})
            }

            file.mv(path)

            const type = file.name.split('.').pop()

            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: parent && parent.path,
                parent: parent && parent.id,
                user: user._id
            })

            await dbFile.save()
            await user.save()

            res.json(dbFile)


        } catch (error) {
            
        }        
    }
}

module.exports = new FileController()