const Router = require('express')
const router = new Router()
const fileController = require('../controllers/fileController')
const authMiddleware = require('../middleware/auth.middleware')


router.post('', authMiddleware, fileController.createDir)
router.get('', authMiddleware, fileController.getFiles)
router.post('/upload', authMiddleware, fileController.uploadFile)
router.get('/download', authMiddleware, fileController.downloadFile)

module.exports = router