/**
 * API Client for CrestSports backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
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
  private token: string | null = null;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/${API_VERSION}`;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('admin_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
    }
  }

  logout() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          this.logout();
          // Optional: Redirect to login if window exists
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
             window.location.href = '/login';
          }
        }
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Request Failed [${url}]:`, error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<ApiResponse<{ token: string; admin: any }>> {
    const response = await this.request<{ token: string; admin: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.success && response.data.token) {
      this.setToken(response.data.token);
    }
    
    return response;
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

  async createCategory(data: Partial<Category>): Promise<ApiResponse<Category>> {
    return this.request<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
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

  // Payment endpoints
  async createPaymentOrder(orderId: string): Promise<ApiResponse<{
    razorpayOrderId: string;
    amount: number;
    currency: string;
    order: Order;
  }>> {
    return this.request<{
      razorpayOrderId: string;
      amount: number;
      currency: string;
      order: Order;
    }>(`/payments/create/${orderId}`, {
      method: 'POST',
    });
  }

  async verifyPayment(data: VerifyPaymentDto): Promise<ApiResponse<Order>> {
    return this.request<Order>('/payments/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export interface VerifyPaymentDto {
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
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
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: OrderItemDetail[];
  createdAt: string;
}

export const api = new ApiClient();
export type { Product, ProductListParams, ApiResponse };
