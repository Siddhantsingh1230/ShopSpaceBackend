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
    let products = await ordersModel.aggregate([
      {
        $unwind: "$cart",
      },
      {
        $group: {
          _id: "$cart.productId._id",
          title: { $first: "$cart.productId.title" },
          orders: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// mostcommonLocation

export const mostCommonLocation = async (req, res) => {
  try {
    const locationCounts = await ordersModel.aggregate([
      {
        $group: {
          _id: "$billingState",
          totalOrders: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          location: "$_id", // Rename _id to state
          totalOrders: 1,
        },
      },
      {
        $sort: { totalOrders: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      locationCounts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// mostpaymentmethodUsed

export const mostUsedPaymentMethod = async (req, res) => {
  try {
    const modes = await ordersModel.aggregate([
      {
        $group: {
          _id: "$paymentMethod",
          totalUsers: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          paymentMethod: "$_id", // Rename _id to state
          totalUsers: 1,
        },
      },
      {
        $sort: { totalUsers: -1 },
      },
    ]);
    res.status(200).json({
      success: true,
      modes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// most common category

export const commonCategory = async (req, res) => {
  try {
    let categories = await ordersModel.aggregate([
      {
        $unwind: "$cart",
      },
      {
        $group: {
          _id: "$cart.productId.category",
          totalOrders: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          category: "$_id", // Rename _id to state
          totalOrders: 1,
        },
      },
      {
        $sort: { totalOrders: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

//most occuring month

export const bonusMonth = async (req, res) => {
  try {
    const months = await ordersModel.aggregate([
      {
        $group: {
          _id: { $month: "$placedOn" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          month: {
            $let: {
              vars: {
                months: [
                  "",
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
              },
              in: {
                $arrayElemAt: ["$$months", "$_id"],
              },
            },
          }, // Rename _id to state
          totalOrders: 1,
        },
      },
      {
        $sort: { totalOrders: -1 },
      },
    ]);
    res.status(200).json({
      success: true,
      months,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// most cancelled product

export const cancelledProducts = async (req, res) => {
  try {
    const cancelledProductCount = await ordersModel.aggregate([
      {
        $unwind: "$cart",
      },
      {
        $match: {
          status: "cancelled",
        },
      },
      {
        $group: {
          _id: "$cart.productId.title",
          cancelledCount: { $sum: 1 },
        },
      },{
        $project: {
          _id: 0, // Exclude the _id field
          products: "$_id", // Rename _id to state
          cancelledCount: 1,
        },},
      {
        $sort: { cancelledCount: -1 },
      },
    ]);
    res.status(200).json({
      success: true,
      cancelledProductCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// delivery days of order

export const deliveryCount = async (req, res) => {
  try {
    const deliveryCount = await ordersModel.aggregate([
      {
        $match: {
          deliveredOn: { $exists: true }, // Filter only delivered orders
        },
      },
      {
        $group: {
          _id: "$billingState",
          deliveries: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          location: "$_id", // Rename _id to state
          deliveries: 1,
        },
      },
      {
        $sort: { _id: 1 }, // Sort by state in ascending order
      },
    ]);
    res.status(200).json({
      success: true,
      deliveryCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getAllOrders = async(req,res)=>{
  try{
    const orders =await ordersModel.find({});
    
    res.status(200).json({
      success: true,
      orders,
    });
  }catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
}