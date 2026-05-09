const {
    PutObjectCommand,
} = require("@aws-sdk/client-s3");

const { v4: uuidv4 } = require("uuid");

const s3 = require("../config/s3Config");

const uploadToS3 = async (file) => {
    const uniqueFileName = `${uuidv4()}-${file.originalname}`;

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,

        Key: uniqueFileName,

        Body: file.buffer,

        ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;
};

module.exports = uploadToS3;