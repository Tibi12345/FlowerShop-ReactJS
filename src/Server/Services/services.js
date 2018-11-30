const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, '../Data/products.json');

module.exports = {
    determineStartingId: () => {
        let MAX = -Infinity;
        let products = fs.readFileSync(filePath, 'utf8');
        products = JSON.parse(products);

        if (!products.length) {
            return 1;
        }

        products.forEach(p => {
            if (p.id >= MAX) {
                MAX = p.id;
            }
        });
        
        return MAX + 1;
    }
};