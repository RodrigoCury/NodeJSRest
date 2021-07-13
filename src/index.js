const customExpress = require('./config/customExpress')
const conexao = require('./infra/conexao')

conexao.connect((error) => {
    if (error) {
        console.error(error)
    } else {
        const app = customExpress()

        app.listen(3000, () => console.log("Server port 3000"))
    }
})
