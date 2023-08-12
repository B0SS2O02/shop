const router = require('express').Router()
const controller = require('./controller')
const { body } = require('express-validator')
const upload = require('../util/multer')

router.get('/', controller.view)

router.post('/', upload.single("image"),
    body('file')
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error('Image not uploaded');
            }

            return true;
        }),
    body('title')
        .notEmpty().withMessage('Title is empty')
        .isString().withMessage('Title is not string'),
    controller.create
)

router.delete('/',
    upload.fields(),
    body('id').notEmpty().withMessage('Id is empty'),
    controller.delete
)

router.put('/',
    upload.single("image"),
    body('id').notEmpty(),
    controller.edit
)

module.exports = router