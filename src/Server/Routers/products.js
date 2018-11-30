const fs = require("fs");
const path = require("path");
const { promisify } = require('util');
const express = require("express");
const router = express.Router();
const filePath = path.join(__dirname, '../Data/products.json');
const services = require('../Services/services');
let STARTING_ID = services.determineStartingId();
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);


const prepareData= async (req,res,next)=>{
    let products = await readFileAsync(filePath,'utf8');
    products = JSON.parse(products);
    req.products=products;
    console.log("prepare data: ok");
    next();
};

const checkValidProductId=(req,res,next)=>{
    if(isNaN(req.params.id))
    {
        return res.status(500).send({error:"invalid id param"});
    }
    console.log("first validation:ok");
    next();
};

router.get("/", prepareData, async (request, response) => {
    try {
      let res = request.products;
      if (request.query.search) {
        res = request.products.filter(
          p =>
            p.name.toLowerCase().search(request.query.search.toLowerCase()) !== -1
        );
      }
  
      return response.send(res);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  });

router.get("/:id",prepareData,checkValidProductId, async (request, response) => {
    try {
        let products = await readFileAsync(filePath, 'utf8');
        products = JSON.parse(products);
        const product = products.find(el => el.id == request.params.id);
        
        if(product) {
            
            return response.send(product);            
        }    
        return response.status(404).send({ error: "No product found" })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
});

router.delete("/:id", async (request, response) => {
    try {
        // descihide fisierul
        let products = await readFileAsync(filePath, 'utf8');
        // citest lista de produse
        products = JSON.parse(products);

        var filtered = products.filter(function(item) { 
            return item.id != request.params.id;
        });
        // scrie lista filtrata in fisier
        await writeFileAsync(filePath, JSON.stringify(filtered));
        return response.send({"success": "true"});            
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
    });

router.post("/", async (request, response) => {
    try {
        const params = request.body.product;
        if (params) {
            const newProduct = {
                ...params,
                id: STARTING_ID++
            }
            let products = await readFileAsync(filePath, 'utf8');
            products = JSON.parse(products);
            products.push(newProduct);
            await writeFileAsync(filePath, JSON.stringify(products));

            return response.send(newProduct)
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
});


router.put("/", async (request, response) => {
    try {
        // retine variabilele trimise ca parametrii
        const params = request.body.product;
        const newproduct = {
            ...params,
        }
        // deschide fisierul
        let products = await readFileAsync(filePath, 'utf8');
        // citeste lista de produse
        products = JSON.parse(products);

        products = products.map(
            function(item) { 
                return item.id == newproduct.id ? newproduct : item;
            }
        );
        // scrie in fisier lista de produse
        await writeFileAsync(filePath, JSON.stringify(products));
        return response.send({"success": "true"});            
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
});


module.exports = router;


