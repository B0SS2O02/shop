const express = require('express')
const app = express()
const PORT = 4000

app.use(express.json())

app.use('/public',express.static('public'))

app.use('/product', require('./src/products/router'))

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})