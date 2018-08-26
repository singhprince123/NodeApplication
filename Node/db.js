const mongoose = require('mongoose');

//Setting Up Database Connection
mongoose.connect('mongodb://localhost:27017/Nodeapp' , { useNewUrlParser: true });

//Checking Connection To Database is Successfull
mongoose.connection.on('connected', () => {
   console.log('Connected to database mongodb://locallhost:27017/Nodeapp' );   
 });
    
//On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error:' +err);
});

module.exports= mongoose;
