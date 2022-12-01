const bodyParser = require("body-parser");
const express = require("express");
const servidor = express();

servidor.set("view engine","ejs");

servidor.use(express.static("ficheiros"));
var mensagem = [];
servidor.use(bodyParser.urlencoded({extended:false}));
/*
servidor.use(function (req, res, next) {
    res.locals.resultado = null
    next();
  })
*/
servidor.get("/",function(pedido,resposta){
resposta.render("chat",{mensagem:mensagem});
})

servidor.post("/processa",function(pedido,resposta){
    let texto = pedido.body.texto;
    mensagem.push(texto);
    resposta.render("chat",{mensagem:mensagem});
    })
    
servidor.listen(3333,()=>{
console.log(">>>>>>>>>>>>>>>>>> SERVIDOR LIGADO <<<<<<<<<<<<<<<<<<<<<<<<");
})