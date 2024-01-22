import { ordersModel } from "../models/Orders.js";

export const getOrders = async (req, res) => {
  try {
    const id = req.params.id;
    const orders = await ordersModel.find({ userId: id });
    if (!orders) {
      return res.status(500).json({
        success: false,
        message: "No orders found",
      });
    }
    return res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (err) {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  }
};

export const addOrder = async (req, res) => {
  try {
    const order = req.body;
    let result = await ordersModel.create(order);
    if (result) {
      return res.status(200).json({
        success: true,
        result: result,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Order not created",
    });
  } catch (err) {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
};

export const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const { status, userId } = req.body;
    let result = await ordersModel.findByIdAndUpdate(id, { $set: { status } });
    if (!result) {
      return res.status(500).json({
        success: false,
        message: "order not updated",
      });
    }
    let order = await ordersModel.find({ userId: userId });
    return res.status(200).json({
      success: true,
      orders: order,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ordersModel.deleteOne({ _id: id });
    if (result) {
      return res.status(200).json({
        success: true,
        result: result,
      });
    }
    res.status(500).json({
      success: false,
      message: "Order doesn't exist",
    });
  } catch (err) {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  }
};

// Below is a Statistical route

export const mostOrdered = async (req, res) => {
  try {
    let orders = await ordersModel.aggregate([
      {
        $unwind: "$cart",
      },
      {
        $group: {
          _id: "$cart.productId._id",
          title: { $first: "$cart.productId.title" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      }
    ]);
    
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};
