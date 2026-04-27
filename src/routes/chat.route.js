import express from 'express';
import chatController from '../controllers/chat.controller.js'; 
import authenticate from '../middlewares/authenticate.middleware.js';

const router = express.Router();


router.get("/rooms", authenticate, chatController.getRooms);
router.post("/rooms", authenticate, chatController.createRoom);
router.delete("/rooms/:roomId", authenticate, chatController.deleteRoom);
router.patch("/rooms/:roomId/avatar", authenticate, chatController.updateRoomAvatar);
router.post("/rooms/:roomId/messages/image", authenticate, chatController.uploadMessageImage);
router.post("/personal", authenticate, chatController.getOrCreatePersonalRoom);
router.get("/:roomId/messages", authenticate, chatController.getMessages);

export default router;