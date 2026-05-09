const {
    saveUploadRecord,
    getUploadUrl,
    getUploadRecord,
    readUploadBuffer,
} = require("../services/s3Service");

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        console.log(
            `Handled by PORT ${process.env.PORT}`
        );

        const record = await saveUploadRecord(req.file, {
            alt: req.body.alt,
            folder: req.body.folder,
        });

        const imageUrl = getUploadUrl(record.id);

        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl,
            imageId: record.id,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

const getUploadedImage = async (req, res) => {
    const record = await getUploadRecord(req.params.imageId);

    if (!record) {
        return res.status(404).json({
            message: "Image not found",
        });
    }

    const buffer = await readUploadBuffer(record);

    res.setHeader("Content-Type", record.mimeType);
    res.setHeader("Content-Length", record.size);
    res.setHeader(
        "Content-Disposition",
        `inline; filename="${record.originalName}"`
    );

    return res.send(buffer);
};

module.exports = {
    uploadImage,
    getUploadedImage,
};