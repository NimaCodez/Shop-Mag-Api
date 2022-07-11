const path = require("path");
const fs = require("fs");
const md5 = require("md5");
const multer = require("multer");

const CreateFilePath = () => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDate().toString();
    const directory = path.join(__dirname, "..", "..", "public", "uploads", "blogs", year, month, day)
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
        const filePath = CreateFilePath();
        cb(null, filePath);
    },

    filename: async (req, file, cb) => {
        //image.file.png
        const ext = path.extname(file.originalname);
        const fileName = String(CreateImageNameHash(file.originalname) + ext)
        cb(null, fileName);
    }
})

const UploadFile = multer({storage})

module.exports = {
    UploadFile,
    CreateImageNameHash,
}
