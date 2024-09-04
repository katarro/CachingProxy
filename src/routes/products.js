// routes/products.js
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const router = express.Router();
const myCache = new NodeCache(); 

const isInCache = () => {
    return myCache.has("products");
};

router.get('/products', async (req, res) => {
    try {
        if (isInCache()) {
            res.setHeader("X-Cache", "HIT");
            return res.json(myCache.get("products"));
        }

        const response = await axios.get(`${req.app.locals.origin}/products`);
        res.setHeader("X-Cache", "MISS");
        res.json(response.data);

        myCache.set("products", response.data);

    } catch (error) {
        console.error("Error al obtener los productos:", error.message);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

module.exports = router;
