const { calcularPosicionFinal, calcularVelocidadFinal } = require('./mruv');

const s0 = 0; 
const v0 = 10; 
const a = 2; 
const t = 3; 

const posicionFinal = calcularPosicionFinal(s0, v0, a, t);
const velocidadFinal = calcularVelocidadFinal(v0, a, t);

console.log('La posición final es:', posicionFinal);
console.log('La velocidad final es:', velocidadFinal);
console.log('Ulises Mejía #9')