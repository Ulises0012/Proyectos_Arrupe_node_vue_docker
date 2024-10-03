function resistencia(voltajes,Intensidades){
    return (voltajes/Intensidades)
}

function voltaje(Intensidades,Resistencias){
    return(Intensidades*Resistencias)
}

function intensidad(Voltajes,Resistencias){
    return(Voltajes/Resistencias)
}

exports.resistencia=resistencia
exports.voltaje=voltaje
exports.intensidad=intensidad