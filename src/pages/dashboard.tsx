import { SalesChart } from '@/components/dashboard/sales-chart';
import { RecentOrders } from '@/components/dashboard/recent-orders';
import { StatsGrid } from '@/components/dashboard/stats-grid';
import { DashboardStats, SalesData, RecentOrder } from '@/lib/types';

const mockStats: DashboardStats = {
  totalVendors: 120,
  totalProducts: 1234,
  totalOrders: 456,
  totalRevenue: 12345,
  trends: {
    vendors: { value: 12, isPositive: true },
    products: { value: 8, isPositive: true },
    orders: { value: 5, isPositive: true },
    revenue: { value: 15, isPositive: true },
  },
};

const salesData: SalesData[] = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
];

const recentOrders: RecentOrder[] = [
  {
    id: '1',
    customer: 'John Doe',
    status: 'Processing',
    total: '$250.00',
    items: 3,
    date: '2024-01-15',
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatsGrid stats={mockStats} />
      <div className="grid gap-4 md:grid-cols-2">
        <SalesChart
          data={salesData}
          title="Sales Overview"
          description="Monthly sales performance"
        />
        <RecentOrders orders={recentOrders} />
      </div>
    </div>
  );
}