import express from 'express'
import { placeOrder, placeGuestOrder, userOrders, allOrders, updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js' 
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// User Route
orderRouter.post('/place', authUser, placeOrder) 

// Guest Route (No Login Needed) 
orderRouter.post('/place-guest', placeGuestOrder) 

orderRouter.post('/userorders', authUser, userOrders)

// Admin Routes
orderRouter.post('/list', adminAuth, allOrders) 
orderRouter.post('/status', adminAuth, updateStatus)

export default orderRouter