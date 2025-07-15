import ordersData from "@/services/mockData/orders.json";

class OrderService {
  constructor() {
    this.orders = [...ordersData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.orders];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const order = this.orders.find(o => o.Id === id);
    return order ? { ...order } : null;
  }

  async create(orderData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newOrder = {
      ...orderData,
      Id: Math.max(...this.orders.map(o => o.Id), 0) + 1,
      orderDate: new Date().toISOString()
    };
    this.orders.push(newOrder);
    return { ...newOrder };
  }

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = this.orders.findIndex(o => o.Id === id);
    if (index !== -1) {
      this.orders[index] = { ...this.orders[index], ...updates };
      return { ...this.orders[index] };
    }
    return null;
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.orders.findIndex(o => o.Id === id);
    if (index !== -1) {
      const deleted = this.orders.splice(index, 1)[0];
      return { ...deleted };
    }
    return null;
  }
}

export const orderService = new OrderService();