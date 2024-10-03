const divisa = require('./monedas')

console.log('Al pasar 5 dolares a pesos se obtinen: ' +divisa.Dolar_mxn(5)+' pesos')
console.log('Al pasar 5 Euros a Yenes se obtinen: ' +divisa.Euro_JPY(5)+' Yenes')
console.log('Al pasar 5 Euros a Dolar se obtinen: ' +divisa.Euro_dolar(5)+' Dolares')
console.log('Al pasar 5 dolares a Libras se obtinen: ' +divisa.USD_GBP(5)+' Libras')
console.log('Al pasar 5 dolares a Yenes se obtinen: ' +divisa.USD_JPY(5)+' Yenes')
console.log('Al pasar 5 dolares a Dolares canadienses se obtinen: ' +divisa.usdTocad(5)+' Dolares canadienses')
console.log('Ulises Mejía #9')