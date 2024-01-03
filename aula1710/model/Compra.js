const Servidor = require('./Servidor');
const Material = require('./Material');

module.exports = class Compra { 
  constructor() {
	this.urgencia = "";
	this.quantidade = 0;
	this.prazoEntrega = 0;
	this.valorCompra = 0.0;
    this.serv = new Servidor();
	this.mat = new Material();
  }

  calcularValorCompra() {
	this.valorCompra = this.quantidade * this.mat.preco;
  }

  calcularPrazoEntrega() {
	if (this.urgencia == 'Imediata') {
		this.prazoEntrega = 2;
	} else {
		if (this.urgencia == 'Urgente') {
			this.prazoEntrega = 10;
		} else {
			this.prazoEntrega = 30;
		}
	}
  }

  inserir(conexao) {
    var sql = "insert into compra (quantidade, urgencia, id_material, numero_matricula_servidor) values (?, ?, ?, ?)";
    conexao.query(sql, 
                  [this.quantidade, this.urgencia, this.mat.id, this.serv.matricula],
                  function (err, result) {
                    if (err) throw err;
                  }
    );

  }

  listar(conexao, callback) { 
    var sql = "select compra.id, compra.quantidade, compra.urgencia, servidor.nome as nome_servidor, material.nome as nome_material "+
	          "  from compra, servidor, material "+
              " where compra.numero_matricula_servidor = servidor.numero_matricula "+
	          "   and compra.id_material = material.id";

    conexao.query(sql, 
          function (err, result) {
            if (err) throw err;
            return  callback(result);
          }
    );
  }
 
}