module.exports = app => {
    app.get('/atendimento', (req, res) => {
        res.send("Atendimento GET")
    })

    app.post('/atendimento', (req, res) => {
        console.log(req.body)
        res.send("Atendimento POST")
    })
}