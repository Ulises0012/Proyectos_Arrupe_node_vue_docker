function calcularAreaPoligonoRegular(apotema, numeroLados) {
    const perimetro = numeroLados * longitudLado(apotema, numeroLados);
    const area = 0.5 * apotema * perimetro;
    return area;
}
function longitudLado(apotema, numeroLados) {
    return 2 * apotema * Math.tan(Math.PI / numeroLados);
}
module.exports = calcularAreaPoligonoRegular;
