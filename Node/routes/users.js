const express = require('express');
const router = express.Router();
const multer = require('multer');

const { Users } = require('../model/users');

//GET Request For Displaying Form
router.get('/', (req, res, next) => {
  res.render('form.ejs', {
    message: '',
    pageCount: req.session.visitCount
  });
});

//For Storing Resume files into disk
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});

/**
 * This function is used to check filetype is pdf or not.
 * @param {Object} req 
 * @param {Object} file 
 * @param {Function} cb 
 */
const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    console.log(" file not supported ");
    cb(null, false);
  }
}
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  },
  fileFilter: fileFilter
});

//POST Reuest For Storing Form Data Into Database
router.post('/', upload.single('resume'), (req, res, next) => {
  var user = new Users({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    job: req.body.job,
    resume: req.file.path
  });
  let customMessage = "";
  user.save((err, doc) => {
    if (!err) {
      customMessage = "Your details are saved successfully...";
      res.render('form.ejs', {
        message: customMessage,
        pageCount: req.session.visitCount
      });
      // res.redirect('/users');
    } else {
      customMessage = "Something went wrong in saving your details.";
      res.render('form.ejs', {
        message: customMessage,
        pageCount: req.session.visitCount
      });
      console.log('Error in user Saving :' + JSON.stringify(err, undefined, 2));
    }
  });
});

module.exports = router;