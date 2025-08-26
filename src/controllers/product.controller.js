const db = require('../config/database');

exports.createProduct = async (req, res) => {
    try {
        const { product_name, quantity, price } = req.body;
        const { rows } = await db.query(
            "INSERT INTO product (productName, quantity, price) VALUES ($1, $2, $3)",
            [product_name, quantity, price]
        );

        res.status(201).send({
            message: "Product added successfully!",
            body: {
                product: { product_name, quantity, price }
            },
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Please check your values again."
        });
    }
};

exports.findProductById = async (req, res) => {
    const productId = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM product WHERE productid = $1', [productId]);
    if (response.rows.length > 0) {

        res.status(200).send({
            message: "Success",
            data: response.rows
        });
    } else {
        res.status(204).end();
    }
};

exports.findAllProducts = async (req, res) => {
    const response = await db.query('SELECT * FROM product');
    res.status(200).send({
        message: "Success",
        data: response.rows
    });
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const { product_name, quantity, price } = req.body;
        const response = await db.query("UPDATE product SET productName=$1, quantity=$2, price=$3 WHERE productId=$4", [product_name, quantity, price, productId]);
        res.status(200).send({
            message: "Product updated successfully!",
            body: {
                product: { product_name, quantity, price }
            },
        });


    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Please check your values again."
        });
    }
};

exports.deleteProductById = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const response = await db.query('DELETE FROM product WHERE productid = $1', [productId]);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Something went wrong."
        });
    }
};