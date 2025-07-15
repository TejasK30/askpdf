import "dotenv/config"
import multer from "multer"
import path from "path"
import fs from "fs"

// set uploads directory path
const UPLOAD_DIR = path.resolve(process.cwd(), "uploads")

// if there is not upload dir then create one
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

// multer storage config
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  },
})
