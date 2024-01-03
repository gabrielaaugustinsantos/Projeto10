module.exports = class Servidor { 
  constructor() {
    this.matricula = "";
    this.nome = "";
    this.cargo = "";
  }

  /* Codificar em servidor a função inserir() */
  inserir(conexao) {
    var sql = "insert into servidor (numero_matricula, nome, cargo) values (?, ?, ?)";
    conexao.query(sql, 
                  [this.matricula, this.nome, this.cargo],
                  function (err, result) {
                    if (err) throw err;
                  }
    );
  }

  atualizar(conexao) {
    
  }

  excluir(conexao) {
    var sql = "delete from servidor where numero_matricula = ?";
    conexao.query(sql, 
                  [this.matricula],
                  function (err, result) {
                    if (err) throw err;
                  }
    );
  }

  listar(conexao, callback) { 
    var sql = "select * from servidor";

    conexao.query(sql, 
          function (err, result) {
            if (err) throw err;
            return  callback(result);
          }
    );
  }

  pesquisar(conexao, callback) { 
    var sql = "select * from servidor where nome like ?";

    conexao.query(sql, [this.nome],
          function (err, result) {
            if (err) throw err;
            return  callback(result);
          }
    );
  }

}