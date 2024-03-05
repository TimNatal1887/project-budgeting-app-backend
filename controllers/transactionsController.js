const express = require("express");

const transactions = express.Router();

let transactionsArray = require("../models/transactions.model.js")

// SHOW ALL
transactions.get("/",(req,res)=>{
    res.status(200).json({transactions:transactionsArray})
})

//  SHOW INDIVIDUAL
transactions.get("/:id", (req, res) => {
    const { id } = req.params;
  
    const transaction = transactionsArray.find((transaction) => transaction.id === +id);

    if(!transaction){
        res.status(404).json({ message: "Transaction not found" });
    }else{
        res.status(200).json({ transaction });
    }
  
});

// CREATE
transactions.post("/", (req, res) => {
    const {transaction_name, amount, date, from, category, type} = req.body
    if(!transaction_name || !amount || !date || !from || !category || !type){
        res.status(400).json({message:"Invalid request: Please fill out all fields as required"})
    }
    const newId = transactionsArray[transactionsArray.length - 1].id + 1;
        req.body.id = newId;
        transactionsArray.push(req.body);
        res.status(200).json({ transactions: transactionsArray });
});

// UPDATE
transactions.put("/:id", (req, res) => {
    const { id } = req.params;
  
    const transactionIndex = transactionsArray.findIndex((transaction) => transaction.id === +id);

    if (transactionIndex === -1){
        res.status(404).json({message: "Transaction not found"})
    }

    transactionsArray[transactionIndex] = req.body;
    res.status(200).json({ transactions: transactionsArray });
  });

// DELETE
transactions.delete("/:id", (req, res) => {
    const originalArray = [...transactionsArray]
    const { id } = req.params;
  
    transactionsArray = transactionsArray.filter((transaction) => transaction.id !== +id);
    if(originalArray.length === transactionsArray.length){
        res.status(404).json({message: "Transaction not found"})
    }else{
        transactionsArray = transactionsArray.map((transaction,index)=>{
            transaction.id = index + 1
            return transaction
        })
      
        res.status(200).json({ transactions: transactionsArray });
    }

  });

module.exports = transactions