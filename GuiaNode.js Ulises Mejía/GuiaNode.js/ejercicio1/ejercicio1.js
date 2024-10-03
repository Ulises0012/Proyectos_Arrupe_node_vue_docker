const os = require('os')

console.log('Sistema operativo:' + os.platform())
console.log('Versión del sistema operativo:' + os.release())
console.log('Memoria total:' + os.totalmem() + ' bytes')
console.log('Memoria libre:' + os.freemem() + ' bytes')
console.log('Arquitectura CPU:' + os.arch)
console.log('Número de procesadores lógicos:' + os.cpus().length)


console.log('Ulises Mejía #9')