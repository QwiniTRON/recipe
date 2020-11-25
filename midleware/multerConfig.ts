import express from 'express';
import multer from 'multer';

const storageConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log();
    callback(null, 'imgs');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  }
});
const upload = multer({
  dest: 'imgs/',
  storage: storageConfig
});

export { upload };