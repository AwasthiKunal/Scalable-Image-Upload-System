const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storageDir = path.join(__dirname, "..", "..", "data", "uploads");
const metadataFile = path.join(__dirname, "..", "..", "data", "uploads.json");

const uploads = new Map();
let storageReady = false;

const ensureStorage = async () => {
    if (storageReady) {
        return;
    }

    await fs.mkdir(storageDir, { recursive: true });

    try {
        const raw = await fs.readFile(metadataFile, "utf8");
        const records = JSON.parse(raw);

        for (const record of records) {
            uploads.set(record.id, record);
        }
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        }

        await fs.writeFile(metadataFile, "[]", "utf8");
    }

    storageReady = true;
};

const persistMetadata = async () => {
    const records = Array.from(uploads.values());
    await fs.writeFile(metadataFile, JSON.stringify(records, null, 2), "utf8");
};

const saveUploadRecord = async (file, metadata = {}) => {
    await ensureStorage();

    const id = uuidv4();
    const fileName = `${id}-${file.originalname}`;
    const filePath = path.join(storageDir, fileName);

    const record = {
        id,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        fileName,
        filePath,
        alt: metadata.alt || "",
        folder: metadata.folder || "uploads/general",
        createdAt: new Date().toISOString(),
    };

    await fs.writeFile(filePath, file.buffer);

    uploads.set(id, record);
    await persistMetadata();

    return record;
};

const getUploadRecord = async (id) => {
    await ensureStorage();
    return uploads.get(id);
};

const getUploadUrl = (id) => `/uploads/${id}`;

const readUploadBuffer = async (record) => {
    await ensureStorage();
    return fs.readFile(record.filePath);
};

module.exports = {
    saveUploadRecord,
    getUploadRecord,
    getUploadUrl,
    readUploadBuffer,
};