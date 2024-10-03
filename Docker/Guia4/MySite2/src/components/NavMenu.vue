<template>
    <nav>
        <ul>
            <li><router-link to="./">Inicio</router-link></li>
            <li><router-link to="./about">Acerca</router-link></li>
            <li><router-link to="./services">Servicios</router-link></li>
            <li><router-link to="./contact">Contacto</router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'NavMenu'
}
</script>

<style scoped>
body {
    margin: 0;
    padding: 0;
}

nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    background-color: #000;
    display: flex;
    justify-content: center;
}

nav ul li {
    margin: 0;
}

nav ul li a,
nav ul li router-link {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 20px;
    text-decoration: none;
    transition: background-color 0.3s, transform 0.2s;
}

nav ul li:hover {
    background-color: #444;
    color: #fff;
    transform: scale(1.05);
}

nav ul li a:active,
nav ul li router-link:active {
    background-color: #111;
    color: #ffd700;
    transform: scale(0.95);
}

/* Estilos adicionales para router-link-active */
nav ul li router-link.router-link-active {
    background-color: #333;
    color: #ffd700;
}
</style>