const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

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

// Отправка сообщения
router.post('/', auth, async (req, res) => {
  const { content } = req.body;
  try {
    const message = new Message({
      userId: req.userId,
      content,
    });
    await message.save();
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Получение всех сообщений
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find().populate('userId', 'name surname');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;