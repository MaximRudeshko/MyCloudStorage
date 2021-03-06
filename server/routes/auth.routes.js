const Router = require("express");
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const {check, validationResult} = require("express-validator")
const router = new Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const authMiddleware = require('../middleware/auth.middleware')
const fileService = require('../services/fileService')
const File = require('../models/file')


router.post('/registration',
    [
        check('email', "Uncorrect email").isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({min:3, max:12})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Uncorrect request", errors})
        }

        const {email, password, name, lastName} = req.body;

        const candidate = await User.findOne({email})

        if(candidate) {
            return res.status(400).json({message: `User with email ${email} already exist`})
        }
        const hashPassword = await bcrypt.hash(password, 15)
        const user = new User({email, password: hashPassword, name, lastName})
        console.log(user)
        await user.save()
        await fileService.createDir(new File({user: user.id, name: ''}))
        return res.json({message: "User was created"})

    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})


router.post('/login', async (req, res) => {
    try {
        
        const {email, password} = req.body

        const user = await User.findOne({email})
        

        if(!user){
            return res.status(400).json({message: 'User not found'})
        }

        const isPassValid = bcrypt.compareSync(password, user.password)

        if(!isPassValid){
            return res.status(400).json({message: 'Invalid password'})
        }

        const token = jwt.sign({id: user.id}, config.get('secret-key'), {expiresIn: '1h'})

        
        return res.json({
            token, 
            user : {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar,
                name: user.name,
                lastName: user.lastName
            }
        })
    } catch (error) {
        console.log(error)
        res.send({message: "Server error"})
    }
})

router.get('/auth', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id})
        console.log(user)
        const token = jwt.sign({id: user.id}, config.get('secret-key'), {expiresIn: '1h'})
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar,
                name: user.name,
                lastName: user.lastName
            } 
           
        })
    } catch (error) {
        console.log(error)
        res.send({message: 'Server Error'})
    }
})




module.exports = router