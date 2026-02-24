import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    // Date.now() যুক্ত করা হলো যাতে একই নামের ইমেজে কনফ্লিক্ট না হয়
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
