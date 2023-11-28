import express from "express";
import {ShowMessagesChatService
    ,SendMessageChatService
} from "../Controllers/chatController"
import { verifyToken } from "../Middleware/auth";

const router = express.Router();

router.get('/:roomId', verifyToken, ShowMessagesChatService);

router.post('/:userId', verifyToken, SendMessageChatService);

export default router;