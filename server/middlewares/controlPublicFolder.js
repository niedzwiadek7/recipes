const fs = require('fs')
const path = require('path')

exports.deleteFile = (path_file) => {
    try {
        fs.unlinkSync(path.join(__dirname, path_file))
    }   catch (err) {
        console.log(err)
    }
}