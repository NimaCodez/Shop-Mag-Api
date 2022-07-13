const path = require("path");
const fs = require("fs");
const md5 = require("md5");
const multer = require("multer");
const createHttpError = require("http-errors");

const CreateFilePath = (req) => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDate().toString();
    const directory = path.join(__dirname, "..", "..", "public", "uploads", "blogs", year, month, day)
    req.body.fileUploadPath = path.join("uploads", "blogs", year, month, day)
    fs.mkdirSync(directory, { recursive: true })
    return directory;
}

const CreateImageNameHash = (imageName) => {
    return md5(imageName)
}

const CreateLinkForFile = () => {
    
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const filePath = CreateFilePath(req);
        cb(null, filePath);
    },

    filename: async (req, file, cb) => {
        //image.file.png
        const ext = path.extname(file.originalname);
        const fileName = String(CreateImageNameHash(file.originalname) + ext)
        req.fileName = fileName;
        cb(null, fileName);
    }
})

function FileFilter(req, file, cb) {
    const MimeTypes =  [".png", ".jpg", ".jpeg", ".webp", ".gif"]
    const Ext = path.extname(file.originalname)
    if (MimeTypes.includes(Ext)) {
        return cb(null, true)
    }
    return cb(createHttpError.BadRequest("File Format is not correct! 🗿🗿 "))
}

const maxSize = 2 * 1000 * 1000
const UploadFile = multer({
    storage,
    fileFilter: FileFilter,
    limits: {
        fileSize: maxSize
    }
})

module.exports = {
    UploadFile,
    CreateImageNameHash,
}
