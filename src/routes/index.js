const express = require('express');
const path = require('path');
const ProductService = require('../services');
const receipt = '../assets/receipt.pdf';

const platziStore = app => {
	const router = express.Router();
	app.use('/api/', router);

	const productService = new ProductService();

	router.get('/', (req, res) => {
		res.send(`API v2`);
	});

	router.get('/receipts', (req, res, next) => {
		let file = path.join(__dirname, receipt);
		res.sendFile(file);
	});

	router.get('/products', async (req, res, next) => {
		const storeProducts = await productService.getProducts();
		res.status(200).json(storeProducts);
	});

	router.post('/products', async function(req, res, next) {
		const { body: product } = req;
		try {
			const createProductId = await productService.createProduct({ product });
			res.status(201).json({
				data: createProductId,
				message: 'product created'
			});
		} catch (err) {
			console.log(err);
		}
	});

	router.get('*', (req, res) => {
		res.status(404).send('Error 404');
	});
};

module.exports = platziStore;
