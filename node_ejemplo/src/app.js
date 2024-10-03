const express = require('express')
const app = express()
const path = require('path')
app.set('view engine', 'pug')

const routes = require('./routes/index.routes')


app.use(express.static(path.join(__dirname,'../public')))

app.use(routes)
app.use((req, res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
})
app.listen(3000, ()=>{
    console.log('Server a la expera de conexiones')
})

