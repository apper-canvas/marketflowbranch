import { toast } from "react-toastify";

class OrderService {
  constructor() {
    this.tableName = 'order_c';
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    if (typeof window !== 'undefined' && window.ApperSDK) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
  }

  async getAll() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "items_c" } },
          { field: { Name: "total_c" } },
          { field: { Name: "shipping_address_c" } },
          { field: { Name: "payment_method_c" } },
          { field: { Name: "order_date_c" } },
          { field: { Name: "status_c" } }
        ],
        orderBy: [
          { fieldName: "order_date_c", sorttype: "DESC" }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Error fetching orders:", response.message);
        toast.error(response.message);
        return [];
      }

      return response.data.map(order => ({
        Id: order.Id,
        name: order.Name,
        tags: order.Tags,
        owner: order.Owner,
        items: order.items_c ? JSON.parse(order.items_c) : [],
        total: order.total_c,
        shippingAddress: order.shipping_address_c ? JSON.parse(order.shipping_address_c) : {},
        paymentMethod: order.payment_method_c ? JSON.parse(order.payment_method_c) : {},
        orderDate: order.order_date_c,
        status: order.status_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching orders:", error?.response?.data?.message);
      } else {
        console.error("Error fetching orders:", error.message);
      }
      return [];
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "items_c" } },
          { field: { Name: "total_c" } },
          { field: { Name: "shipping_address_c" } },
          { field: { Name: "payment_method_c" } },
          { field: { Name: "order_date_c" } },
          { field: { Name: "status_c" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response || !response.data) {
        return null;
      }

      const order = response.data;
      return {
        Id: order.Id,
        name: order.Name,
        tags: order.Tags,
        owner: order.Owner,
        items: order.items_c ? JSON.parse(order.items_c) : [],
        total: order.total_c,
        shippingAddress: order.shipping_address_c ? JSON.parse(order.shipping_address_c) : {},
        paymentMethod: order.payment_method_c ? JSON.parse(order.payment_method_c) : {},
        orderDate: order.order_date_c,
        status: order.status_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching order with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching order with ID ${id}:`, error.message);
      }
      return null;
    }
  }

  async create(orderData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [
          {
            Name: orderData.name || `Order #${Date.now()}`,
            Tags: orderData.tags || "",
            Owner: orderData.owner,
            items_c: JSON.stringify(orderData.items),
            total_c: orderData.total,
            shipping_address_c: JSON.stringify(orderData.shippingAddress),
            payment_method_c: JSON.stringify(orderData.paymentMethod),
            order_date_c: new Date().toISOString(),
            status_c: orderData.status || "confirmed"
          }
        ]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Error creating order:", response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} orders:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          const created = successfulRecords[0].data;
          toast.success("Order created successfully!");
          return {
            Id: created.Id,
            name: created.Name,
            tags: created.Tags,
            owner: created.Owner,
            items: created.items_c ? JSON.parse(created.items_c) : [],
            total: created.total_c,
            shippingAddress: created.shipping_address_c ? JSON.parse(created.shipping_address_c) : {},
            paymentMethod: created.payment_method_c ? JSON.parse(created.payment_method_c) : {},
            orderDate: created.order_date_c,
            status: created.status_c
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating order:", error?.response?.data?.message);
      } else {
        console.error("Error creating order:", error.message);
      }
      return null;
    }
  }

  async update(id, updates) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [
          {
            Id: id,
            Name: updates.name,
            Tags: updates.tags,
            Owner: updates.owner,
            items_c: JSON.stringify(updates.items),
            total_c: updates.total,
            shipping_address_c: JSON.stringify(updates.shippingAddress),
            payment_method_c: JSON.stringify(updates.paymentMethod),
            order_date_c: updates.orderDate,
            status_c: updates.status
          }
        ]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Error updating order:", response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} orders:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const updated = successfulUpdates[0].data;
          toast.success("Order updated successfully!");
          return {
            Id: updated.Id,
            name: updated.Name,
            tags: updated.Tags,
            owner: updated.Owner,
            items: updated.items_c ? JSON.parse(updated.items_c) : [],
            total: updated.total_c,
            shippingAddress: updated.shipping_address_c ? JSON.parse(updated.shipping_address_c) : {},
            paymentMethod: updated.payment_method_c ? JSON.parse(updated.payment_method_c) : {},
            orderDate: updated.order_date_c,
            status: updated.status_c
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating order:", error?.response?.data?.message);
      } else {
        console.error("Error updating order:", error.message);
      }
      return null;
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        RecordIds: [id]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Error deleting order:", response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} orders:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulDeletions.length > 0) {
          toast.success("Order deleted successfully!");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting order:", error?.response?.data?.message);
      } else {
        console.error("Error deleting order:", error.message);
      }
      return false;
    }
  }
}

export const orderService = new OrderService();