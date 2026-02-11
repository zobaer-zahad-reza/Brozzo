import express from 'express';
import { addTeamMember, listTeamMembers, removeTeamMember } from '../controllers/teamController.js';
import adminAuth from '../middleware/adminAuth.js';
import upload from '../middleware/multer.js'; // মাল্টার/আপলোড ইম্পোর্ট করুন

const teamRouter = express.Router();

teamRouter.post('/add', adminAuth, upload.single('image'), addTeamMember);
teamRouter.get('/list', listTeamMembers);
teamRouter.post('/remove', adminAuth, removeTeamMember);

export default teamRouter;