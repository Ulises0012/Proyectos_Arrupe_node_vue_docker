const fs = require('fs');
const path = require('path');

const fileName = 'prueba.txt'; 
const targetFolder = 'prueba'; 

const currentDirectory = __dirname;


const destinationDirectory = path.join(__dirname, targetFolder);

if (!fs.existsSync(destinationDirectory)) {
    fs.mkdirSync(destinationDirectory);
}

const sourceFilePath = path.join(currentDirectory, fileName);

const destinationFilePath = path.join(destinationDirectory, fileName);

fs.rename(sourceFilePath, destinationFilePath, err => {
    if (err) {
        console.error(`Error al mover el archivo ${fileName}:`, err);
    } else {
        console.log(`Archivo ${fileName} movido correctamente a la carpeta "${targetFolder}".`);
        console.log('Ulises Mejía #9')
    }
});
