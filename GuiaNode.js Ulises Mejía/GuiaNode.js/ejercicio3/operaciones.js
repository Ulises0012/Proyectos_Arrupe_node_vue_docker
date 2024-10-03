function sumar(x1,x2){
    return x1+x2
}
function restar(x1,x2){
    return x1-x2
}
function multiplicar(x1,x2){
    return x1*x2
}
function dividir(x1,x2){
    if(x2==0){
        error()
        
    }else{
            return x1/x2
        }
    }
function error(){
    console.log("No se puede dividir entre 0")
}

exports.sumar = sumar
exports.restar = restar
exports.dividir = dividir
exports.multiplicar=multiplicar