// server.js
const express = require('express')
    , app = express()
    , fs = require('fs')
    , getStat = require('util').promisify(fs.stat)
    , db = require('./config');

// Create a reference to the file we want to download

// const storage = db.firebaseStorage;

// const refSonic = ref(storage, 'sonic_3_end.ogg');

// // Get the download URL
// getDownloadURL(refSonic)
//     .then((url) => {
//         const xhr = new XMLHttpRequest();
//         xhr.responseType = 'blob';
//         xhr.onload = (event) => {
//             console.log(event);
//             console.log("XHR -> \n",xhr.response)
//           const blob = xhr.response;
//         };
//         xhr.open('GET', url);
//         xhr.send();
//     })
//     .catch((error) => {
//         // A full list of error codes is available at
//         // https://firebase.google.com/docs/storage/web/handle-errors
//         switch (error.code) {
//             case 'storage/object-not-found':
//                 // File doesn't exist
//                 break;
//             case 'storage/unauthorized':
//                 // User doesn't have permission to access the object
//                 break;
//             case 'storage/canceled':
//                 // User canceled the upload
//                 break;
//             case 'storage/unknown':
//                 // Unknown error occurred, inspect the server response
//                 break;
//         }
//     });


app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

//O metodo deve ser assincrono
app.get('/audio', async (req, res) => {
    const filePath = './sonic_3_end.ogg';

    const highWaterMaker = 2;
    // uso a instrução await
    const stat = await getStat(filePath);

    // exibe uma série de informações sobre o arquivo
    console.log(stat);
    // informações sobre o tipo do conteúdo e o tamanho do arquivo
    res.writeHead(200, {
        'Content-Type': 'audio/ogg',
        'Content-Length': stat.size
    });


    const stream = fs.createReadStream(filePath, { highWaterMaker });

    // só exibe quando terminar de enviar tudo
    stream.on('end', () => console.log('acabou'));

    // faz streaming do audio 
    stream.pipe(res);

});

app.listen(PORT, () => console.log(`app is running | port : ${PORT}`));