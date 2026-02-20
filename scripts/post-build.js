import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

const distClient = path.join(__dirname, 'dist', 'client');
const distRoot = path.join(__dirname, 'dist');

if (fs.existsSync(distClient)) {
    console.log('Organizando arquivos para Hostinger...');
    copyFolderSync(distClient, distRoot);
    console.log('Arquivos organizados com sucesso na raiz da pasta /dist');
} else {
    console.error('Erro: pasta dist/client não encontrada.');
    process.exit(1);
}
