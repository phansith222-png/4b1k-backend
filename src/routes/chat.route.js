import express from 'express';
import chatController from '../controllers/chat.controller.js'; 
import authenticate from '../middlewares/authenticate.middleware.js';

const router = express.Router();


router.get("/rooms", authenticate, chatController.getRooms);

router.get("/:roomId/messages", authenticate, chatController.getMessages);



export default router;