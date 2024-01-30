/*const express = require('express')
const app = express()
const port = 3000
app.post('/',(req,res)=>{
    res.send('hiiii!')
})
app.get('/',(req,res)=>{
    res.send('hello!')
})
app.listen(port,()=>{
    console.log(`port ${port}`)
})*/

const express = require('express')
const mongoose = require('mongoose')
const app = express();
const port = process.env.PORT || 3000;

const Expense = require('expense.js');
mongoose.connect('mongodb+srv://preethikavi2020:zBHTsRJJfJU2hioT@cluster0.jkt19eg.mongodb.net/trackerdb?retryWrites=true&w=majority',{
    useUnifiedTopology: true
});

app.use(express.json());

 app.post('/expense',async(req,res)=>{
     try{
   //const expenses = await Expense.find();
   // res.send(expenses)
   console.log(req.body);
   const newExpense = req.body;
   await Expense.create(newExpense);
   res.send('created');
    }catch(err){
        console.log(err)
    }
 })
//get all the documents
/*app.get('/expense',async(req,res)=>{
    const expenses = await Expense.find();
    res.send(expenses)
})*/
//get by id
 app.delete('/expense/:id',async(req,res)=>{  //to get app.get //to delete app.delete
     try{
     const id = req.params.id;
    const expenses = await Expense.findByIdAndDelete(id);//to get findbyid alone  //to delete findByIdAndDelete
    if(expenses){
        res.send(expenses);
     }
    else
       res.send('no expense');
 }catch(err){
     res.send(err);
 }
 })


 app.get('/expense/:id',async(req,res)=>{  //to get app.get //to delete app.delete
    try{
    const id = req.params.id;
   const expenses = await Expense.findById(id);//to get findbyid alone  //to delete findByIdAndDelete
   if(expenses){
       res.send(expenses);
    }
   else
      res.send('no expense');
}catch(err){
    res.send(err);
}
})
// app.listen(port,()=>{
//     console.log(`port ${port}`)
// })

// update
app.use(express.json());

app.put('/expense/:id',async(req,res)=>{  
    const id = req.params.id;
    const updateObject = req.body;

    const updatedObject = await Expense.findByIdAndUpdate(id,{$set:updateObject},{new:true})
    
    res.send(updatedObject);
})
app.listen(port,()=>{
    console.log(`port ${port}`)
})


