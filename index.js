const express = require('express')
const app = express()
const bobyParser = require('body-parser')

app.use(bobyParser.urlencoded({extended:false}))
app.use(bobyParser.json())

let db = {
        games:[
            {id:321,title:'Jogo legal',year:2013,price:60},
            {id:326,title:'Jogo legal 2',year:2013,price:606},
            {id:325,title:'Jogo legal 3',year:2013,price:602},
            {id:323,title:'Jogo legal 4',year:2013,price:603},
        ]
}

app.get("/",(req,res)=>{
        res.statusCode =200
        res.json(db.games)
})

app.get("/games/:id",(req,res)=>{
    let retorno =''
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        retorno = db.games.filter((games)=>  games.id===parseInt(req.params.id,10))
        if(retorno.length>0){
            res.statusCode =200
            res.json(retorno)
        }else{
            res.sendStatus(404)
        }
      
    }
})



app.post("/games",(req,res)=>{
    let {title,price,year} = req.body;
    db.games.push({
        id:123,
        title,price,year
    })
    console.log(db)
    res.send("Deu bom")
 
   
})

app.delete("/games/:id",(req,res)=>{
    let id = req.params.id;
   
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        let index = db.games.findIndex((games)=>  games.id===parseInt(id,10))
        if(index === -1){
            res.sendStatus(404)
           
        }else{
            db.games.splice(index,1)
            res.json(db)
        }
    }
   
})



app.put("/games/:id",(req,res)=>{
    let id = req.params.id;
   
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        let game = db.games.find((games)=>  games.id===parseInt(id,10))
        if(game != undefined){
        
            let {title,price,year} = req.body;
            if(title!==undefined){
                game.title = title
            }
            if(price!==undefined){
                game.price = price
            }
            if(year!==undefined){
                game.year = year
            }
            res.json(game)
        }else{
            res.sendStatus(400)
        }
    }
   
})



app.listen(45678,()=>{
    console.log("API RODANDO")
})