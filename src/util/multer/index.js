const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/image') // Укажите папку назначения для сохранения файлов
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime().toString()+'_'+file.originalname) // Имя файла будет оригинальным
    }
});

const upload = multer({ storage: storage });

module.exports = upload