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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file?.originalname) {
            const filePath = CreateFilePath(req);
            return cb(null, filePath);
        }
        cb(null, null)
    },

    filename: async (req, file, cb) => {
        if (file?.originalname) {
            const ext = path.extname(file.originalname);
            const fileName = String(CreateImageNameHash(file.originalname) + ext)
            req.body.fileName = fileName;
            return cb(null, fileName);
        }
        cb(null, null)
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

function VideoFilter(req, file, cb) {
    const MimeTypes =  [".mp4", ".avi", ".mkv", ".mov"]
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

const VideoMaxSize = 300 * 1000 * 1000
const UploadVideo = multer({
    storage,
    fileFilter: VideoFilter,
    limits: {
        fileSize: VideoMaxSize
    }
})

module.exports = {
    UploadFile,
    UploadVideo,
    CreateImageNameHash,
}
