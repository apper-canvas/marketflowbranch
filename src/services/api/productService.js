import { toast } from "react-toastify";

class ProductService {
  constructor() {
    this.tableName = 'product_c';
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
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "discount_price_c" } },
          { field: { Name: "rating_c" } },
          { field: { Name: "review_count_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "specifications_c" } },
          { field: { Name: "is_prime_c" } },
          { field: { Name: "in_stock_c" } }
        ],
        orderBy: [
          { fieldName: "Name", sorttype: "ASC" }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Error fetching products:", response.message);
        toast.error(response.message);
        return [];
      }

      return response.data.map(product => ({
        Id: product.Id,
        name: product.Name,
        tags: product.Tags,
        owner: product.Owner,
        title: product.title_c,
        price: product.price_c,
        discountPrice: product.discount_price_c,
        rating: product.rating_c,
        reviewCount: product.review_count_c,
        images: product.images_c ? product.images_c.split('\n').filter(img => img.trim()) : [],
        category: product.category_c,
        description: product.description_c,
        specifications: product.specifications_c ? JSON.parse(product.specifications_c) : {},
        isPrime: product.is_prime_c === 'true',
        inStock: product.in_stock_c === 'true'
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching products:", error?.response?.data?.message);
      } else {
        console.error("Error fetching products:", error.message);
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
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "discount_price_c" } },
          { field: { Name: "rating_c" } },
          { field: { Name: "review_count_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "specifications_c" } },
          { field: { Name: "is_prime_c" } },
          { field: { Name: "in_stock_c" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response || !response.data) {
        return null;
      }

      const product = response.data;
      return {
        Id: product.Id,
        name: product.Name,
        tags: product.Tags,
        owner: product.Owner,
        title: product.title_c,
        price: product.price_c,
        discountPrice: product.discount_price_c,
        rating: product.rating_c,
        reviewCount: product.review_count_c,
        images: product.images_c ? product.images_c.split('\n').filter(img => img.trim()) : [],
        category: product.category_c,
        description: product.description_c,
        specifications: product.specifications_c ? JSON.parse(product.specifications_c) : {},
        isPrime: product.is_prime_c === 'true',
        inStock: product.in_stock_c === 'true'
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching product with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching product with ID ${id}:`, error.message);
      }
      return null;
    }
  }

  async create(productData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [
          {
            Name: productData.name,
            Tags: productData.tags || "",
            Owner: productData.owner,
            title_c: productData.title,
            price_c: productData.price,
            discount_price_c: productData.discountPrice,
            rating_c: productData.rating || 0,
            review_count_c: productData.reviewCount || 0,
            images_c: Array.isArray(productData.images) ? productData.images.join('\n') : productData.images || "",
            category_c: productData.category,
            description_c: productData.description,
            specifications_c: productData.specifications ? JSON.stringify(productData.specifications) : "",
            is_prime_c: productData.isPrime ? 'true' : 'false',
            in_stock_c: productData.inStock ? 'true' : 'false'
          }
        ]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Error creating product:", response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} products:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          const created = successfulRecords[0].data;
          toast.success("Product created successfully!");
          return {
            Id: created.Id,
            name: created.Name,
            tags: created.Tags,
            owner: created.Owner,
            title: created.title_c,
            price: created.price_c,
            discountPrice: created.discount_price_c,
            rating: created.rating_c,
            reviewCount: created.review_count_c,
            images: created.images_c ? created.images_c.split('\n').filter(img => img.trim()) : [],
            category: created.category_c,
            description: created.description_c,
            specifications: created.specifications_c ? JSON.parse(created.specifications_c) : {},
            isPrime: created.is_prime_c === 'true',
            inStock: created.in_stock_c === 'true'
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating product:", error?.response?.data?.message);
      } else {
        console.error("Error creating product:", error.message);
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
            title_c: updates.title,
            price_c: updates.price,
            discount_price_c: updates.discountPrice,
            rating_c: updates.rating,
            review_count_c: updates.reviewCount,
            images_c: Array.isArray(updates.images) ? updates.images.join('\n') : updates.images,
            category_c: updates.category,
            description_c: updates.description,
            specifications_c: updates.specifications ? JSON.stringify(updates.specifications) : "",
            is_prime_c: updates.isPrime ? 'true' : 'false',
            in_stock_c: updates.inStock ? 'true' : 'false'
          }
        ]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Error updating product:", response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} products:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const updated = successfulUpdates[0].data;
          toast.success("Product updated successfully!");
          return {
            Id: updated.Id,
            name: updated.Name,
            tags: updated.Tags,
            owner: updated.Owner,
            title: updated.title_c,
            price: updated.price_c,
            discountPrice: updated.discount_price_c,
            rating: updated.rating_c,
            reviewCount: updated.review_count_c,
            images: updated.images_c ? updated.images_c.split('\n').filter(img => img.trim()) : [],
            category: updated.category_c,
            description: updated.description_c,
            specifications: updated.specifications_c ? JSON.parse(updated.specifications_c) : {},
            isPrime: updated.is_prime_c === 'true',
            inStock: updated.in_stock_c === 'true'
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating product:", error?.response?.data?.message);
      } else {
        console.error("Error updating product:", error.message);
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
        console.error("Error deleting product:", response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} products:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulDeletions.length > 0) {
          toast.success("Product deleted successfully!");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting product:", error?.response?.data?.message);
      } else {
        console.error("Error deleting product:", error.message);
      }
      return false;
    }
  }

  async search(query) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "discount_price_c" } },
          { field: { Name: "rating_c" } },
          { field: { Name: "review_count_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "specifications_c" } },
          { field: { Name: "is_prime_c" } },
          { field: { Name: "in_stock_c" } }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "title_c",
                    operator: "Contains",
                    values: [query],
                    include: true
                  }
                ],
                operator: "OR"
              },
              {
                conditions: [
                  {
                    fieldName: "description_c",
                    operator: "Contains",
                    values: [query],
                    include: true
                  }
                ],
                operator: "OR"
              }
            ]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Error searching products:", response.message);
        return [];
      }

      return response.data.map(product => ({
        Id: product.Id,
        name: product.Name,
        tags: product.Tags,
        owner: product.Owner,
        title: product.title_c,
        price: product.price_c,
        discountPrice: product.discount_price_c,
        rating: product.rating_c,
        reviewCount: product.review_count_c,
        images: product.images_c ? product.images_c.split('\n').filter(img => img.trim()) : [],
        category: product.category_c,
        description: product.description_c,
        specifications: product.specifications_c ? JSON.parse(product.specifications_c) : {},
        isPrime: product.is_prime_c === 'true',
        inStock: product.in_stock_c === 'true'
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching products:", error?.response?.data?.message);
      } else {
        console.error("Error searching products:", error.message);
      }
      return [];
    }
  }

  async getByCategory(category) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "discount_price_c" } },
          { field: { Name: "rating_c" } },
          { field: { Name: "review_count_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "specifications_c" } },
          { field: { Name: "is_prime_c" } },
          { field: { Name: "in_stock_c" } }
        ],
        where: [
          {
            FieldName: "category_c",
            Operator: "EqualTo",
            Values: [category]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Error fetching products by category:", response.message);
        return [];
      }

      return response.data.map(product => ({
        Id: product.Id,
        name: product.Name,
        tags: product.Tags,
        owner: product.Owner,
        title: product.title_c,
        price: product.price_c,
        discountPrice: product.discount_price_c,
        rating: product.rating_c,
        reviewCount: product.review_count_c,
        images: product.images_c ? product.images_c.split('\n').filter(img => img.trim()) : [],
        category: product.category_c,
        description: product.description_c,
        specifications: product.specifications_c ? JSON.parse(product.specifications_c) : {},
        isPrime: product.is_prime_c === 'true',
        inStock: product.in_stock_c === 'true'
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching products by category:", error?.response?.data?.message);
      } else {
        console.error("Error fetching products by category:", error.message);
      }
      return [];
    }
  }
}

export const productService = new ProductService();