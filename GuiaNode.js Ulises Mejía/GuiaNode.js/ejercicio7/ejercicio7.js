const ohms = require('./leyOHM')

console.log('La resistencia de 5 voltios con 3 amperios de intensidad es de: '+ohms.resistencia(5,3))

console.log('La Intensidad de 5 voltios con 10 ohms de resistencia es de: '+ohms.intensidad(5,10))

console.log('El voltaje de 10 amperios y 20 ohms de resistencia es de: '+ohms.voltaje(10,20))
console.log('Ulises Mejía #9')