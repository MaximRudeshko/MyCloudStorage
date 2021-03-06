const File = require('../models/file');
const User = require('../models/user');
const config = require('config')
const fs = require('fs')
const fileService = require('../services/fileService');
const Uuid = require('uuid')

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
            const {sort} = req.query
            let files
            switch (sort) {
                case 'name':
                    files = await File.find({user:req.user.id, parent:req.query.parent}).sort({name: 1})
                    break
                case 'type':
                    files = await File.find({user:req.user.id, parent:req.query.parent}).sort({type: 1})
                    break
                case 'date':
                    files = await File.find({user:req.user.id, parent:req.query.parent}).sort({date: -1})
                    break
                default:
                    files = await File.find({user: req.user.id, parent: req.query.parent})
                    break
            }
            return res.json(files)
        } catch (error) {
            console.log(error)
        }
    }

    async searchFiles(req, res){
        try {
            const searchName = req.query.search
            console.log(req.params)
            let files = await File.find({user: req.user.id})
            files = files.filter(file => file.name.includes(searchName) && file.parent )
            return res.json(files)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Search error"})
        }
    }

    async uploadFile(req, res) {
        try {
            
            const file = req.files.file
            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findOne({_id: req.user.id})

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({message: 'There no space on the disk'})
            }
            console.log(user)

            user.usedSpace = user.usedSpace + file.size
            user.freeSpace = user.diskSpace - user.usedSpace

            let path;
            if (parent) {
                path = `${config.get('filesPath')}\\${user._id}\\${parent.path}\\${file.name}`
            } else {
                path = `${config.get('filesPath')}\\${user._id}\\${file.name}`
            }

            if (fs.existsSync(path)) {
                return res.status(400).json({message: 'File already exist'})
            }
            file.mv(path)

            const type = file.name.split('.').pop()

            let filePath = file.name
            if (parent) {
                filePath = parent.path + "\\" + file.name
            }

            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                parent: parent ? parent._id : null,
                user: user._id
            })

            
            await dbFile.save()
            await user.save()

            res.json({dbFile, user})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Upload error"})
        }
    }

    async downloadFile(req, res){

        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            const path = fileService.getPath(file)
            if (fs.existsSync(path)) {
                console.log(path)
                return res.download(path, file.name)
            }
            return res.status(400).json({message: "Download error"})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Download error"})
        }
    }


    async deleteFile(req, res){
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            const user = await User.findOne({_id: req.user.id})
            
            user.usedSpace = user.usedSpace - file.size
            user.freeSpace = user.diskSpace - user.usedSpace

            if(!file){
                return res.status(400).json({message: 'File not found'})
            }
            fileService.deleteFile(file)
            await file.remove()
            return res.json({message: 'File was deleted', user})

        } catch (error) {
            return res.status(400).json({message: 'File Error'})
        }
    }

    async uploadAvatar(req, res){
        try {
            const file = req.files.file
            const user = await User.findById(req.user.id)
            const avatarName = Uuid.v4() + ".jpg"
            file.mv(config.get('staticPath') + "\\" + avatarName)
            user.avatar = avatarName
            console.log(user.avatar)
            await user.save()
            return res.json({
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar,
                    name: user.name,
                    lastName: user.lastName
            }})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Upload avatar error'})
        }
    }

    async deleteAvatar(req, res){
        try {
            const user = await User.findById(req.user.id)
            fs.unlinkSync(config.get('staticPath') + '\\' + user.avatar)
            user.avatar = null
            await user.save()
            return res.json({
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar,
                    name: user.name,
                    lastName: user.lastName
            }})
        } catch (error) {
            return res.status(400).json({message: 'Delete avatar error'})
        }
    }
}

module.exports = new FileController()