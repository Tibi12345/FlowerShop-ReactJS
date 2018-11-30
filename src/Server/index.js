const express = require('express');
const bodyParser = require('body-parser');
const host = 'localhost';
const port = 4000;
const app = express();
const morgan =require("morgan");
const morganToolkit =require("morgan-toolkit")(morgan);

app.use(bodyParser.json());
app.use(morganToolkit());

// Routes
const products = require("./Routers/products");
app.use("/products", products);
app.use("*", (req, res) => res.end());

app.listen.apply(app, [port, host]);
console.log(`Server started on: http://${host}:${port}\n`);

app.use((err, req, res, next) => {
  if(res.headerSent){
    return next(err);
  }
  if (err.stack) {
    err = err.stack;
  }
  res.json(err);
});






/// /////////////////////////
//prima var
//
//
// const http = require("http");
// const port=4000;
// const requestHandler =(request,reponse) => {
//     console.log(request.url);
//     if(request.url ==="/products")
//     {
//         for(let i=0;i<5000;i++)
//         {
//             console.log(i);
//         }
//         reponse.end("thddd adfg");
//     }
//     reponse.end("Hekksasfadf adfg");

// };

// const server = http.createServer(requestHandler);

// server.listen(port,err => {

//     if(err){
//         return console.log("asggafgafga err",err);
//     }

//     console.log(`server is listening on ${port}`);
// })