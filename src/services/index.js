//const { productsMock } = require('../utils/mocks');
const MongoConnect = require('../lib/mongo');

class ProductService {
	constructor() {
		this.collection = 'products';
		this.mongoDB = new MongoConnect();
	}

	async getProducts() {
		const products = await this.mongoDB.getAll(this.collection);
		return products || [];
	}

	async createProduct({ product }) {
		const createProductId = await this.mongoDB.create(this.collection, product);
		return createProductId;
	}
}

module.exports = ProductService;
