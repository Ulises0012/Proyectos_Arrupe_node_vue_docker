const http = require('http')

const server = http.createServer((req, res)=>{
    console.log('Se ha encendido el server')
    res.end('Conexion exitosa')
})

server.listen(3000, ()=>{
    console.log("Server esperando")
})