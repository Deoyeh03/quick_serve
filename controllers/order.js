const Order = require('../models/order');

const OrderCont = {
     getAllOrder: (req,res) => {
       
    },
    createOrder: async (req,res) => {
         try {
           const { items, orderStatus, createdBy } = req.body;
            console.log(req.body);
            
            if(!items || !quantity){
                return res.status(400).json({ error: 'All field are required PUTA!!!'})
            }
            const newOrder = await Order.create({ items, quantity, orderStatus, createdBy});
            res.status(201).json(newOrder);
            // console.log(newMenuItem, error);
        } catch (error) {
            res.status(500).json({error: 'failed to create order'});
            // console.log(error);
            
        }
    },
    updateOrder: (req,res) => {
        
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