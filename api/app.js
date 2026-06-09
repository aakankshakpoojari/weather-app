const express=require('express');
const axios=require('axios');
const path=require('path');
const app=express();

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"../views"))

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"../public")));

app.get('/',(req,res)=>{
    res.render("index",{weather:null})
})

app.post('/weather',async(req,res)=>{
    try{
        const city=req.body.city;

        const apikey="7a95caa7e3914dad133ef1890b2dbc1c"
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
        const result=await axios.get(url);
        res.render("index",{weather:result.data})

    }catch(err){
        res.render("index",{weather:null,error:error});
    }
})

app.listen(3000,()=>{
    console.log("Running");
})

module.exports=app;