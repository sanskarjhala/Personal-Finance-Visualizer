const express = require("express");
router = express.Router();
const Transaction = require("../models/Transactions");

// Fetching transactions route
router.get("/", async (req, res) => {
  try {
    const { month } = req.query;

    let filter = {};
    if (month) {
      const start = new Date(`${month}-01`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      filter.date = { $gte: start, $lt: end };
    }
  
    const transactions = await Transaction.find(filter).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      message: "Here are the Transactions",
      data: transactions,
    });

    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//Add transactions route
router.post("/", async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;

    if (!amount, !category, !date) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    await Transaction.create({
        amount:amount,
        description:description,
        category:category,
        date:date
    })

    return res.status(200).json({
        success:true,
        message:"transaction created successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


//delete transactions route
router.delete("/delete/:id" , async(req,res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success:"true",
            message:"Transaction Deeleted Succesfully"
        })        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}) 

// Route to update transactions 
router.put("/update" , async(req,res) => {
    try {
        // console.log(req.body)
        const updatedTransaction = await Transaction.findByIdAndUpdate(req.body._id , req.body , {new:true})
        if(!updatedTransaction){
            return res.status(403).json({
                success:false,
                message:"NO transactions found regarding the given id"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Transactions updated succesfully",
            updated: updatedTransaction
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
})


module.exports = router