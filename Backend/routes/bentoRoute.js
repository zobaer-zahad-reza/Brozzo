import express from 'express';
import { updateBento, listBento } from '../controllers/bentoController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const bentoRouter = express.Router();

bentoRouter.post('/update', adminAuth, upload.single('image'), updateBento);
bentoRouter.get('/list', listBento);

export default bentoRouter;