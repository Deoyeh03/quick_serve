const express = require('express');
const order = require('../controllers/order');

const router = express.Router();

//  List orders Auth - no
router.get('/orders', order.getAllOrder);

//  Create order Auth - yes
 router.post('/orders', order.createOrder);

//  Update order Auth - yes
router.put('/orders/:id', order.updateOrder);

// Delete order Auth - yes
router.delete('/orders/:id', order.deleteOrder);




module.exports = router;