const multer = require('multer')
const path = require('path')

//upload parameters for multer
module.exports = multer({
    dest: path.join(__dirname+'../../public/uploads/image/recipes'),
    limits: {
        fieldSize: 1024*1024*3,
    }
})
