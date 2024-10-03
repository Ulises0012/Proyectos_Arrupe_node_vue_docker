function calcularPosicionFinal(s0, v0, a, t) {
    const s = s0 + v0 * t + 0.5 * a * Math.pow(t, 2);
    return s;
}

function calcularVelocidadFinal(v0, a, t) {
    const v = v0 + a * t;
    return v;
}

module.exports = {
    calcularPosicionFinal,
    calcularVelocidadFinal
};
