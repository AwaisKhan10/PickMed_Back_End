const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder where the files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the filename to be unique by appending the current timestamp
  },
});

// Create a multer instance with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;