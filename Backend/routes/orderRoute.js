import express from 'express'
import { placeOrder, userOrders, allOrders, updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js' 
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post('/place', authUser, placeOrder) 
orderRouter.post('/userorders', authUser, userOrders)

orderRouter.post('/list', adminAuth, allOrders) 
orderRouter.post('/status', adminAuth, updateStatus)

export default orderRouter