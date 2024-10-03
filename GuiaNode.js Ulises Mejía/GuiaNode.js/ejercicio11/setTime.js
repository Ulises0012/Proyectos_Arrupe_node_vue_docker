function imprimirMensaje() {
    setTimeout(() => {
        console.log("Esto se imprimio");
        console.log('Ulises Mejía #9');
    }, 5000);
}

function contarSegundos() {
    for (let i = 1; i <5; i++) {
        setTimeout(() => {
            console.log("Han pasado", i, "segundos");
        }, i * 1000);
    }
}
imprimirMensaje();

contarSegundos();
