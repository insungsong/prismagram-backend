import "./env";
import path from "path";
import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

dotenv.config({ path: path.join(__dirname, "./env") });

const s3 = new aws.S3({
  accessKeyId: "AKIAZ3MPRPSRUZTS7BUM",
  secretAccessKey: "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",
  region: "ap-northeast-2"
});

const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "prismagramofficial",
    metadata: function(req, file, cb) {
      cb(null, { fieldname: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  const {
    file: { location }
  } = req;
  console.log(location);
  res.json({ location });
};
