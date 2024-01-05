import {orderLocationModel} from "../models/OrderLocation.js";

export const getOrderLocations
 = async(req,res)=>{
    try{
    const orderlocations  = await orderLocationModel.find({});
    if(!orderlocations){
        return res.status(500).json({
            success : false,
            message : "No order locations found",
        })
    }
    return res.status(200).json({
        success : true,
        orderLocations : orderlocations
    })
    }catch(err){
        if(err){
            return res.status(500).json({
                success : false,
                error : err,
            })
        }
    }  
}

export const addOrderLocation = async (req,res) =>{
    try{
        const orderlocation = req.body;
        let existingorderlocation = await orderLocationModel.findOne({
            title: orderlocation.title,
          });
          if (existingorderlocation) {
            return res.status(500).json({
              success: false,
              message: "Order location already exist",
            });
          }
          let result = await orderLocationModel.create(orderlocation);
          return res.status(200).json({
            success: true,
            result: result,
          });

    }catch(err){
        if(err){
            return res.status(500).json({
                success : false,
                error : err,
            })
        }
    }
}

export const updateOrderLocation = async (req, res) => {
    try {
      const id = req.params.id;
      const orderLocation = req.body;
      let result = await orderLocationModel.updateOne({ _id: id }, orderLocation);
      if (!result) {
        return res.status(500).json({
          success: false,
          result: result,
        });
      }
      return res.status(200).json({
        success: true,
        result: result,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

export const deleteOrderLocation = async (req,res) =>{
    try{
        const id = req.params.id;
        const result = await orderLocationModel.deleteOne({_id : id});
        if(result ){
            return res.status(200).json({
                success : true,
                result : result,
            })
        }
        res.status(500).json({
            success : false,
            message : "Order location doesn't exist"
        })
    }catch(err){
        if(err){
            return res.status(500).json({
                success : false,
                error : err,
            })
        }
    }
}