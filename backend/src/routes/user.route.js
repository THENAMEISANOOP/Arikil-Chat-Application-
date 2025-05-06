import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendReq, getRecommendedUsers, sendFriendRequest } from '../controllers/user.controller.js';
import { get } from 'mongoose';
const router = express.Router();

router.use(protectRoute); // Protect all routes in this file

router.get('/',getRecommendedUsers);

router.get('/friends',getMyFriends);

router.post('/friend-request/:id',sendFriendRequest);
router.put('/friend-request/:id/accept',acceptFriendRequest);

router.get('/friend-request',getFriendRequests);
router.get('/outgoing-friend-request',getOutgoingFriendReq);

export default router;