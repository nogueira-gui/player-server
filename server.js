// server.js
const express = require('express')
    , app = express()
    , fs = require('fs')
    , getStat = require('util').promisify(fs.stat);

app.use(express.static('public'));

//O metodo deve ser assincrono
app.get('/audio', async (req, res) => {
    const filePath = './sonic_3_end.ogg';
    
    // uso a instrução await
    const stat = await getStat(filePath);

    // exibe uma série de informações sobre o arquivo
    console.log(stat);
    // informações sobre o tipo do conteúdo e o tamanho do arquivo
    res.writeHead(200, {
        'Content-Type': 'audio/ogg',
        'Content-Length': stat.size
    });

    const stream = fs.createReadStream(filePath);

    // só exibe quando terminar de enviar tudo
    stream.on('end', () => console.log('acabou'));

    // faz streaming do audio 
    stream.pipe(res);

});

app.listen(3000, () => console.log('app is running'));