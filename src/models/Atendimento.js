const moment = require("moment");
const conexao = require("../infra/conexao");

class Atendimento {
    adiciona(atendimento, res) {
        // Formatação da data enviada e criação dataCriacao
        const data = moment(atendimento.data, "DD/MM/YYYY").format('YYYY-MM-DD[T]HH:mm:ss');
        const dataCriacao = moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss');

        // Checar se a data enviada é válida
        const dataEhvalida = moment(data).isSameOrAfter(dataCriacao)

        // Checar se Nome é válido
        const clienteEhValido = atendimento.cliente.length >= 5

        // Array padronizado com respostas em caso de Erro
        const validacoes = [
            {
                nome: 'data',
                validator: dataEhvalida,
                mensagem: `Data deve ser Posterior a data atual`,
            },
            {
                nome: 'cliente',
                validator: clienteEhValido,
                mensagem: `Cliente deve ter mais de 5 Letras`
            }
        ]


        // Filtrar erros
        const erros = validacoes.filter(val => !val.validator)
        const existemErros = erros.length

        // Error First
        if (existemErros) {
            res.status(400).json(erros)
        } else {
            // Objeto para ser enviado ao banco de dados
            const atendimentoDatado = { ...atendimento, data, dataCriacao }

            // Query para o DB
            const sqlQuery = `INSERT INTO Atendimentos SET ?`

            // Função de Query
            conexao.query(sqlQuery, atendimentoDatado, (error, resultados) => {
                if (error) {
                    res.status(400).json(error)
                } else {
                    res.status(201)
                        .json(resultados)
                }
            })
        }
    }
}

module.exports = new Atendimento()