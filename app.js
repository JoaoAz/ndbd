const express = require("express");
const servidor = express();

let ObjectID = require("mongodb").ObjectID;

servidor.set("view engine","ejs");

//Importa o módulo MongoDB
const MongoClient = require('mongodb').MongoClient;

//Guarda na constnnte "uri" a morada da BD e respectivas credenciais
const uri = "mongodb+srv://user1:esmad2019@cluster0-o3xef.gcp.mongodb.net/test?retryWrites=true&w=majority";

//Guarda na constante "client" o construtor que tratará da ligação à BD 
const client = new MongoClient(uri, { useUnifiedTopology: true });

//Establece a ligação à BD e caso haja um erro guarda-o no "err"
client.connect(err => {
  //Imprime na consola o erro, caso este exista
  if(err){console.log(err)};

  servidor.listen(3333,function () {
    console.log("Servidor ligado!");
  })

  //Guarda na constante "collection" o caminho para os dados, ou seja, a BD e a coleção onde estes se encontram
  const collectionAlunos = client.db("novaEscola").collection("alunos");
  const collectionProfessores = client.db("novaEscola").collection("professores");

////////// MENU INICIAL //////////////////////// 
  servidor.get("/",function (req,res) {
      res.render("index");
  })
//------------------------------------------//


////////// VER FORMULÁRIO INSERIR ALUNOS ////////
    servidor.get("/form-aluno",function (req,res) {
    
      res.render("insereAluno");
})
//------------------------------------------//

////////// INSERIR ALUNOS NA BD ////////////////
servidor.get("/inserir-aluno",function (req,res) {
  let novoAluno = {
    nome: req.query.nome,
    email: req.query.email,
    idade: req.query.idade
  }
  collectionAlunos.insertOne(novoAluno,function (){
    res.redirect("/lista-alunos");
  })
})
//--------------------------------------------//

////////// VER ALUNOS ////////////////////////// 
  servidor.get("/lista-alunos",function (req,res) {
    collectionAlunos.find({}).toArray(function (erro,resultado){
    res.render("listaAlunos",{dados:resultado});
    })
  })
//-------------------------------------------//

////////////  APAGAR ALUNOS ////////////////////
servidor.get("/apagar-aluno-bd",function (req,res){
  var idAluno = {
    _id:ObjectID(req.query.id)
  };

  collectionAlunos.findOneAndDelete(idAluno, function (){
      res.redirect("/lista-alunos");
  });

})
//-------------------------------------------//

////////// VER ALUNO PARA EDITAR/////////////////
  servidor.get("/busca-aluno",function (req,res) {
    var idAluno = {
      _id:ObjectID(req.query.id)
    };

    collectionAlunos.find(idAluno).toArray(function (erro,resultado){
    res.render("editaAluno",{dados:resultado});
    })
  })
//-------------------------------------------//
 
////////////  EDITA ALUNO NA BD ////////////////////
servidor.get("/edita-aluno",function (req,res){
  var alunoEscolhido = {
    _id:ObjectID(req.query._id)
  };
  var novosDadosAluno = {
    $set : {
    nome: req.query.nome,
    email: req.query.email,
    idade : req.query.idade
    }
}
  collectionAlunos.findOneAndUpdate(alunoEscolhido,novosDadosAluno,function(){
      res.redirect("/lista-alunos");
  });

})
//-------------------------------------------//


////////// VER PROFESSORES /////////////////////
  servidor.get("/lista-professores",function (req,res) {
    collectionProfessores.find({}).toArray(function (erro,resultado){
    res.render("listaProfessores",{dados:resultado});
    })
  })
//---------------------------------------------//


////////////  APAGAR PROFESSORES ////////////////////
servidor.get("/apagar-professor-bd",function (req,res){
  var idProfessor = {
    _id:ObjectID(req.query.id)
  };

  collectionProfessores.findOneAndDelete(idProfessor, function (){
      res.redirect("/lista-professores");
  });

})
//-------------------------------------------//

////////// VER FORMULÁRIO INSERIR PROFESSORES ///
  servidor.get("/form-professor",function (req,res) {
    res.render("insereProfessor");
})
//---------------------------------------------//

////////// INSERIR PROFESSORES NA BD ////////////
servidor.get("/inserir-professor",function (req,res) {
  let novoProfessor = {
    nome: req.query.nome,
    email: req.query.email,
    departamento: req.query.departamento
  }
  collectionProfessores.insertOne(novoProfessor,function (){
    res.redirect("/lista-professores");
  })
})
//---------------------------------------------//

////////// VER PROFESSOR PARA EDITAR/////////////////
servidor.get("/busca-professor",function (req,res) {
  var idProfessor = {
    _id:ObjectID(req.query.id)
  };

  collectionProfessores.find(idProfessor).toArray(function (erro,resultado){
  res.render("editaProfessor",{dados:resultado});
  })
})
//-------------------------------------------//

////////////  EDITA PROFESSOR NA BD ////////////////////
servidor.get("/edita-professor",function (req,res){
  var professorEscolhido = {
    _id:ObjectID(req.query._id)
  };
  var novosDadosProfessor = {
    $set : {
    nome: req.query.nome,
    email: req.query.email,
    departamento : req.query.departamento
    }
}
collectionProfessores.findOneAndUpdate(professorEscolhido,novosDadosProfessor,function(){
      res.redirect("/lista-professores");
  });

})
//-------------------------------------------//
});
