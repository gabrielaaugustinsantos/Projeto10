
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views'));
app.listen(3000, function(){
  console.log("Servidor no ar - Porta: 3000!")
});

var mysql = require('mysql'); 
var conexao = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "avaliacao01"
});
conexao.connect(function(err) {
  if (err) throw err;
  console.log("Banco de Dados Conectado");
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const Compra = require('./model/Compra');
const Material = require('./model/Material');
const Servidor = require('./model/Servidor');

/* Abrir página inicial do site */
app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

/* Abrir e processar um formulário para cadastro de materiais */
app.get('/listaMaterial', function(req, res){
  var mat = new Material();

  mat.listar(conexao, function(result) {
    res.render('material/lista.ejs', {materiais: result});
  });
});

app.post('/pesquisarMaterial', function(req, res){
  var mat = new Material();
  
  mat.nome = '%' + req.body.nome + '%';

  mat.pesquisar(conexao, function(result) {
    res.render('material/lista.ejs', {materiais: result});
  });
});

app.get('/formMaterial', function(req, res){
	res.sendFile(__dirname + '/views/material/formulario.html');
});

app.post('/processarMaterial', function(req, res){
  var m = new Material();

  m.nome = req.body.nome;
  m.descricao = req.body.descricao;
  m.preco = req.body.preco;
  m.unidade = req.body.unidade; 

  m.inserir(conexao);

  res.render('material/resultado.ejs');
});

app.post('/excluirAtualizarMaterial', function(req, res){
  var m = new Material();
  var a = req.body.acao;

  if (a == "Excluir") {
    m.id = req.body.id_material;

    m.excluir(conexao);

    res.render('material/resultado.ejs');
  } else {
    res.sendFile(__dirname + '/views/material/formulario.html');
  }
});


/* Abrir e processar um formulário para cadastro de servidores  - codificar*/
app.get('/listaServidor', function(req, res){
  var ser = new Servidor();

  ser.listar(conexao, function(result) {
    res.render('servidor/lista.ejs', {servidores: result});
  });
});

app.post('/pesquisarServidor', function(req, res){
  var ser = new Servidor();
  
  ser.nome = '%' + req.body.nome + '%';

  ser.pesquisar(conexao, function(result) {
    res.render('servidor/lista.ejs', {servidores: result});
  });
});

app.get('/formServidor', function(req, res){
	res.sendFile(__dirname + '/views/servidor/formulario.html');
});

app.post('/processarServidor', function(req, res){
	var s = new Servidor();

  s.matricula = req.body.matricula;
  s.nome = req.body.nome;
  s.cargo = req.body.cargo;

  s.inserir(conexao);

  res.render('servidor/resultado.ejs');

  app.post('/excluirAtualizarServidor', function(req, res){
    var s = new Servidor();
    var a = req.body.acao;
  
    if (a == "Excluir") {
      s.matricula = req.body.numero_matricula;
  
      s.excluir(conexao);
  
      res.render('servidor/resultado.ejs');
    } else {
      res.sendFile(__dirname + '/views/servidor/formulario.html');
    }
  });

});

/* Abrir e processar um formulário para cadastro de compra */
app.get('/listaCompra', function(req, res){
  var comp = new Compra();

  comp.listar(conexao, function(result) {
    res.render('compra/lista.ejs', {compras: result});
  });
});

app.get('/formCompra', function(req, res){
  var ser = new Servidor();
  var mat = new Material();

  ser.listar(conexao, function(result1) {
    mat.listar(conexao, function(result2) {
      res.render('compra/formulario.ejs', {servidores: result1, materiais: result2});
    });
  });
});


app.post('/processarCompra', function(req, res){
  var c = new Compra();

  c.quantidade = req.body.quantidade;
  c.urgencia = req.body.urgencia;
  c.mat.id = req.body.material;
  c.serv.matricula = req.body.matricula;

  /*c.calcularValorCompra();
  c.calcularPrazoEntrega();*/

  c.inserir(conexao);

  res.render('compra/resultado.ejs', {comp: c});
});
