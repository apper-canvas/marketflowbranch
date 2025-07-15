import productsData from "@/services/mockData/products.json";

class ProductService {
  constructor() {
    this.products = [...productsData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.products];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const product = this.products.find(p => p.Id === id);
    return product ? { ...product } : null;
  }

  async create(productData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newProduct = {
      ...productData,
      Id: Math.max(...this.products.map(p => p.Id), 0) + 1
    };
    this.products.push(newProduct);
    return { ...newProduct };
  }

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = this.products.findIndex(p => p.Id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates };
      return { ...this.products[index] };
    }
    return null;
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.products.findIndex(p => p.Id === id);
    if (index !== -1) {
      const deleted = this.products.splice(index, 1)[0];
      return { ...deleted };
    }
    return null;
  }

  async search(query) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const results = this.products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    return results.map(product => ({ ...product }));
  }

  async getByCategory(category) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const results = this.products.filter(product => product.category === category);
    return results.map(product => ({ ...product }));
  }
}

export const productService = new ProductService();