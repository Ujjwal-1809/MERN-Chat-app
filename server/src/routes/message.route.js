import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getUserList, getUserMessage, sendMessages } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/users', protectRoute, getUserList)
router.get('/:id', protectRoute, getUserMessage)
router.post('/send/:id', protectRoute, sendMessages)

export default router