module.exports = class Material { 
  constructor() {
    this.nome = "";
    this.descricao = "";
    this.preco = 0.0;
    this.unidade = "";
    this.id = 0;
  }
  
  inserir(conexao) {
    var sql = "insert into material (nome, descricao, preco_unitario, unidade) values (?, ?, ?, ?)";
    conexao.query(sql, 
                  [this.nome, this.descricao, this.preco, this.unidade],
                  function (err, result) {
                    if (err) throw err;
                  }
    );

  }

  atualizar(conexao) {
    
  }

  excluir(conexao) {
    var sql = "delete from material where id = ?";
    conexao.query(sql, 
                  [this.id],
                  function (err, result) {
                    if (err) throw err;
                  }
    );
  }

  listar(conexao, callback) {
    var sql = "select * from material";

    conexao.query(sql, 
          function (err, result) {
            if (err) throw err;
            return  callback(result);
          }
    );
  }
  
  pesquisar(conexao, callback) {
    var sql = "select * from material where nome like ?";

    conexao.query(sql, [this.nome],
          function (err, result) {
            if (err) throw err;
            return  callback(result);
          }
    );
  }

}