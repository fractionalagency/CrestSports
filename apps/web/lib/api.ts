/**
 * API Client for CrestSports backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const API_VERSION = 'v1';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  salePrice: number | null;
  sku: string;
  stock: number;
  imageUrl: string | null;
  images: string[];
  categoryId: string;
  isActive: boolean;
  isFeatured: boolean;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
}

interface ProductListParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/${API_VERSION}`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Failed:', error);
      throw error;
    }
  }

  // Product endpoints
  async getProducts(params?: ProductListParams): Promise<ApiResponse<Product[]>> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }

    const queryString = queryParams.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    
    return this.request<Product[]>(endpoint);
  }

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/products/${id}`);
  }

  async getCategories(): Promise<ApiResponse<Category[]>> {
    return this.request<Category[]>('/categories');
  }

  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    return this.request<Product[]>('/products/featured');
  }

  async createProduct(data: Partial<Product>): Promise<ApiResponse<Product>> {
    return this.request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Order endpoints
  async getDashboardStats(): Promise<ApiResponse<{
    totalRevenue: number;
    totalOrders: number;
    activeOrders: number;
    avgOrderValue: number;
  }>> {
    return this.request('/orders/stats');
  }

  async getDashboardAnalytics(): Promise<ApiResponse<Array<{
    date: string;
    revenue: number;
    orders: number;
  }>>> {
    return this.request('/orders/analytics');
  }

  async getOrders(page = 1, limit = 20): Promise<ApiResponse<{
    orders: Order[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>> {
    return this.request(`/orders?page=${page}&limit=${limit}`);
  }

  async getOrderById(id: string): Promise<ApiResponse<Order>> {
    return this.request<Order>(`/orders/${id}`);
  }

  async createOrder(data: CreateOrderDto): Promise<ApiResponse<Order>> {
    return this.request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getOrderByTrackingId(trackingId: string): Promise<ApiResponse<Order>> {
    return this.request<Order>(`/orders/track/${trackingId}`);
  }
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderDto {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  notes?: string;
}

export interface OrderItemDetail {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  product: Product;
}

export interface Order {
  id: string;
  trackingId: string;
  status: string;
  total: number;
  subtotal: number;
  shippingCost: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: ShippingAddress;
  items: OrderItemDetail[];
  createdAt: string;
}

export const api = new ApiClient();
export type { Product, ProductListParams, ApiResponse };
