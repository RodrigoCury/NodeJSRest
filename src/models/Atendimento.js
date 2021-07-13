const conexao = require("../infra/conexao");

class Atendimento {
    adiciona(atendimento) {
        const sqlQuery = `INSERT INTO Atendimentos SET ?`

        conexao.query(sqlQuery, atendimento, (error, resultados) => {
            if (error) {
                console.log(error)
            } else {
                console.log(resultados)
            }
        })
    }
}

module.exports = new Atendimento()