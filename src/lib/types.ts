export interface Vendor {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'suspended';
  joinedAt: string;
  productsCount: number;
  totalSales: number;
}

export interface Product {
  id: string;
  name: string;
  vendorId: string;
  price: number;
  status: 'active' | 'draft' | 'pending' | 'rejected';
  stock: number;
  category: string;
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  createdAt: string;
}

export interface DashboardStats {
  totalVendors: number;
  activeVendors: number;
  totalProducts: number;
  totalOrders: number;
  totalSales: number;
  recentOrders: Order[];
  topVendors: Vendor[];
}