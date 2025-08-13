const express = require('express');
const order = require('../controllers/order');

const router = express.Router();

//  List orders Auth - no
router.get('/order', order.getAllOrder);

//  Create order Auth - yes
 router.post('/order', order.createOrder);

//  Update order Auth - yes
router.put('/order/:id', order.updateOrder);

// Delete order Auth - yes
router.delete('/order/:id', order.deleteOrder);




module.exports = router;