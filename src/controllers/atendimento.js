const Atendimento = require('../models/Atendimento')

module.exports = app => {
    app.get('/atendimento', (req, res) => {
        res.send("Atendimento GET")
    })

    app.post('/atendimento', (req, res) => {
        const atendimento = req.body
        Atendimento.adiciona(atendimento, res)
    })
}