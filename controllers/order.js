const Order = require('../models/order');

const OrderCont = {
     getAllOrder: async (req,res) => {
        try {
                   const order = await Order.find();
                   res.json(order);
               } catch (error) {
                   res.status(500).json({ error: 'failed to fetch order'});
               }
    },
    createOrder: async (req,res) => {
         try {
           const { items, orderStatus, createdBy } = req.body;
            console.log(req.body);
            
            if(!items){
                return res.status(400).json({ error: 'All field are required PUTA!!!'})
            }
            const newOrder = await Order.create({ items, orderStatus, createdBy});
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({error: 'failed to create order'});
            console.log(error);
            
        }
    },
    updateOrder: async (req,res) => {
         try {
                    const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
                    if (!updateOrder) {
                        return res.status(404).json({ error: "order not found"})
                    }
                    res.json(updateOrder);
                } catch (error) {
                    res.status(500).json({error: "failed to update order"})
                }
    },
    deleteOrder: (req,res) => {
        try {
            const deleted = Order.findByIdAndDelete(req.params.id);
            if(!deleted) {
                return res.status(404).json({error: 'Order not found' });
            }
            res.status(200).json({message: 'Order deleted successfully'})
        } catch (error) {
            res.status(500).json({error: 'Failed to delete order'});
        }
    }
};

module.exports = OrderCont;