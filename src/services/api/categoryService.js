import categoriesData from "@/services/mockData/categories.json";

class CategoryService {
  constructor() {
    this.categories = [...categoriesData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...this.categories];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 150));
    const category = this.categories.find(c => c.Id === id);
    return category ? { ...category } : null;
  }

  async create(categoryData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newCategory = {
      ...categoryData,
      Id: Math.max(...this.categories.map(c => c.Id), 0) + 1
    };
    this.categories.push(newCategory);
    return { ...newCategory };
  }

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.categories.findIndex(c => c.Id === id);
    if (index !== -1) {
      this.categories[index] = { ...this.categories[index], ...updates };
      return { ...this.categories[index] };
    }
    return null;
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = this.categories.findIndex(c => c.Id === id);
    if (index !== -1) {
      const deleted = this.categories.splice(index, 1)[0];
      return { ...deleted };
    }
    return null;
  }

  async getByLevel(level) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const results = this.categories.filter(category => category.level === level);
    return results.map(category => ({ ...category }));
  }
}

export const categoryService = new CategoryService();