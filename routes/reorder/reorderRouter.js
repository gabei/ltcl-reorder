import express from 'express';
import handleReorderRouter from '../../controllers/reorder/reorderController.js';


const router = express.Router();
router.post('/', handleReorderRouter);


export default router;