const express = require('express');
const multer = require('multer');
const File = require('../models/File');
const router = express.Router();

// Настройка Multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Middleware для проверки токена
const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Загрузка файла
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      userId: req.userId,
    });
    await file.save();
    res.json({ message: 'File uploaded successfully', file });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Получение всех файлов
router.get('/', auth, async (req, res) => {
  try {
    const files = await File.find().populate('userId', 'name surname');
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;