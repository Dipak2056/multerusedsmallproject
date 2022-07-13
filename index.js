const express = require("express");
const multer = require("multer");
const app = express();
//now multer instantiation
const uploadmini = multer({ dest: "uploads/" });
const uuid = require("uuid").v4;
// app.post("/upload", uploadmini.single("file"), (req, res) => {
//   res.json({
//     status: "success",
//   });
// });

//multiple file uploads
// app.post("/upload", uploadmini.array("file", 2), (req, res) => {
//     res.json({
//       status: "success",
//     });
//   });

//for custom filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;

    cb(null, `${uuid()}-${originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};
//multiple file uploads
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10000000, files: 2 },
});
app.post("/upload", upload.array("file"), (req, res) => {
  res.json({
    status: "success",
  });
});

//multiple field upload
// const multiupload = upload.fields([
//   { name: "avatar", maxCount: 1 },
//   { name: "resume", maxCount: 1 },
// ]);

// app.post("/upload", multiupload, (req, res) => {
//   console.log(req.files);
//   res.json({
//     status: "success",
//   });
// });

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.json({
        message: "file is too large",
      });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.json({
        message: "file limit reached",
      });
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "file MUST BE IMAGE",
      });
    }
  }
});
app.listen(4000, () => {
  console.log("server is running in 4000");
});
