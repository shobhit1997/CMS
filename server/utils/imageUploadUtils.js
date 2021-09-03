require("dotenv").config({ path: "./.env" });
const GOOGLE_CLOUD_PROJECT = process.env["GOOGLE_CLOUD_PROJECT"];
const CLOUD_BUCKET = "cms_bills";

const { Storage } = require("@google-cloud/storage");
const path = require("path");
const serviceKey = path.join(__dirname, "../../storage_key.json");
const storage = new Storage({
    keyFilename: serviceKey,
    projectId: GOOGLE_CLOUD_PROJECT,
});
const bucket = storage.bucket(CLOUD_BUCKET);

function getPublicUrl(filename) {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

function sendUploadToGCS(req, res, next) {
    if (!req.file) {
        return next();
    }

    const gcsname = Date.now() + req.file.originalname;
    const file = bucket.file(gcsname);
    console.log(gcsname);
    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
        resumable: false,
    });

    stream.on("error", (err) => {
        req.file.cloudStorageError = err;
        console.log(err)
        next(err);
    });

    stream.on("finish", async() => {
        req.file.cloudStorageObject = gcsname;
        await file.makePublic();
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
    });

    stream.end(req.file.buffer);
}

const Multer = require("multer");
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // no larger than 5mb
    },
});

module.exports = {
    getPublicUrl,
    sendUploadToGCS,
    multer,
};