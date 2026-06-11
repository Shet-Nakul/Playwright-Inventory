import type { Product, Supplier, Order } from '../types'

export function statusForQuantity(quantity: number): Product['status'] {
  if (quantity <= 0) return 'Out of Stock'
  if (quantity < 20) return 'Low Stock'
  return 'In Stock'
}

export const products: Product[] = [
  { id: 1, sku: 'ELE-1001', name: 'Wireless Mouse', category: 'Electronics', quantity: 120, price: 24.99, supplier: 'TechSupply Co', status: 'In Stock' },
  { id: 2, sku: 'ELE-1002', name: 'Mechanical Keyboard', category: 'Electronics', quantity: 18, price: 79.99, supplier: 'TechSupply Co', status: 'Low Stock' },
  { id: 3, sku: 'FUR-2001', name: 'Office Chair', category: 'Furniture', quantity: 0, price: 149.0, supplier: 'Comfort Living', status: 'Out of Stock' },
  { id: 4, sku: 'FUR-2002', name: 'Standing Desk', category: 'Furniture', quantity: 35, price: 399.0, supplier: 'Comfort Living', status: 'In Stock' },
  { id: 5, sku: 'GRO-3001', name: 'Organic Coffee Beans', category: 'Groceries', quantity: 240, price: 12.5, supplier: 'FreshFarms', status: 'In Stock' },
  { id: 6, sku: 'GRO-3002', name: 'Green Tea Box', category: 'Groceries', quantity: 12, price: 8.75, supplier: 'FreshFarms', status: 'Low Stock' },
  { id: 7, sku: 'CLO-4001', name: 'Cotton T-Shirt', category: 'Clothing', quantity: 300, price: 15.0, supplier: 'StyleHub', status: 'In Stock' },
  { id: 8, sku: 'CLO-4002', name: 'Denim Jacket', category: 'Clothing', quantity: 7, price: 59.99, supplier: 'StyleHub', status: 'Low Stock' },
  { id: 9, sku: 'TOO-5001', name: 'Cordless Drill', category: 'Tools', quantity: 45, price: 89.99, supplier: 'BuildIt Ltd', status: 'In Stock' },
  { id: 10, sku: 'TOO-5002', name: 'Hammer Set', category: 'Tools', quantity: 0, price: 29.99, supplier: 'BuildIt Ltd', status: 'Out of Stock' },
  { id: 11, sku: 'ELE-1003', name: 'USB-C Hub', category: 'Electronics', quantity: 88, price: 34.99, supplier: 'TechSupply Co', status: 'In Stock' },
  { id: 12, sku: 'ELE-1004', name: 'Webcam 1080p', category: 'Electronics', quantity: 15, price: 49.99, supplier: 'TechSupply Co', status: 'Low Stock' },
  { id: 13, sku: 'FUR-2003', name: 'Bookshelf', category: 'Furniture', quantity: 60, price: 119.0, supplier: 'Comfort Living', status: 'In Stock' },
  { id: 14, sku: 'GRO-3003', name: 'Dark Chocolate Bar', category: 'Groceries', quantity: 500, price: 3.25, supplier: 'FreshFarms', status: 'In Stock' },
  { id: 15, sku: 'CLO-4003', name: 'Wool Scarf', category: 'Clothing', quantity: 19, price: 22.0, supplier: 'StyleHub', status: 'Low Stock' },
  { id: 16, sku: 'TOO-5003', name: 'Measuring Tape', category: 'Tools', quantity: 130, price: 9.99, supplier: 'BuildIt Ltd', status: 'In Stock' },
  { id: 17, sku: 'ELE-1005', name: 'Bluetooth Speaker', category: 'Electronics', quantity: 0, price: 64.99, supplier: 'TechSupply Co', status: 'Out of Stock' },
  { id: 18, sku: 'FUR-2004', name: 'Desk Lamp', category: 'Furniture', quantity: 95, price: 27.5, supplier: 'Comfort Living', status: 'In Stock' },
  { id: 19, sku: 'GRO-3004', name: 'Almond Butter', category: 'Groceries', quantity: 14, price: 11.0, supplier: 'FreshFarms', status: 'Low Stock' },
  { id: 20, sku: 'CLO-4004', name: 'Running Shoes', category: 'Clothing', quantity: 72, price: 89.0, supplier: 'StyleHub', status: 'In Stock' },
  { id: 21, sku: 'TOO-5004', name: 'Tool Box', category: 'Tools', quantity: 25, price: 45.0, supplier: 'BuildIt Ltd', status: 'In Stock' },
  { id: 22, sku: 'ELE-1006', name: 'Monitor 27"', category: 'Electronics', quantity: 9, price: 229.0, supplier: 'TechSupply Co', status: 'Low Stock' },
  { id: 23, sku: 'FUR-2005', name: 'Filing Cabinet', category: 'Furniture', quantity: 40, price: 159.0, supplier: 'Comfort Living', status: 'In Stock' },
  { id: 24, sku: 'GRO-3005', name: 'Granola Pack', category: 'Groceries', quantity: 210, price: 6.5, supplier: 'FreshFarms', status: 'In Stock' },
  { id: 25, sku: 'CLO-4005', name: 'Baseball Cap', category: 'Clothing', quantity: 0, price: 18.0, supplier: 'StyleHub', status: 'Out of Stock' },
]

export const suppliers: Supplier[] = [
  { id: 1, name: 'TechSupply Co', contact: 'Alice Morgan', email: 'alice@techsupply.com', rating: 5, active: true },
  { id: 2, name: 'Comfort Living', contact: 'Brian Lee', email: 'brian@comfortliving.com', rating: 4, active: true },
  { id: 3, name: 'FreshFarms', contact: 'Carla Diaz', email: 'carla@freshfarms.com', rating: 4, active: true },
  { id: 4, name: 'StyleHub', contact: 'David Kim', email: 'david@stylehub.com', rating: 3, active: false },
  { id: 5, name: 'BuildIt Ltd', contact: 'Eva Novak', email: 'eva@buildit.com', rating: 5, active: true },
]

export const orders: Order[] = [
  { id: 1, reference: 'ORD-9001', customer: 'Acme Corp', items: 12, total: 1240.5, status: 'Delivered', date: '2026-05-02' },
  { id: 2, reference: 'ORD-9002', customer: 'Globex', items: 4, total: 320.0, status: 'Shipped', date: '2026-05-09' },
  { id: 3, reference: 'ORD-9003', customer: 'Initech', items: 7, total: 689.99, status: 'Pending', date: '2026-05-14' },
  { id: 4, reference: 'ORD-9004', customer: 'Umbrella', items: 21, total: 2410.0, status: 'Delivered', date: '2026-05-18' },
  { id: 5, reference: 'ORD-9005', customer: 'Soylent', items: 2, total: 99.98, status: 'Cancelled', date: '2026-05-20' },
  { id: 6, reference: 'ORD-9006', customer: 'Hooli', items: 9, total: 845.0, status: 'Shipped', date: '2026-05-23' },
  { id: 7, reference: 'ORD-9007', customer: 'Wayne Ent', items: 15, total: 1799.5, status: 'Pending', date: '2026-05-27' },
  { id: 8, reference: 'ORD-9008', customer: 'Stark Ind', items: 30, total: 4500.0, status: 'Delivered', date: '2026-06-01' },
]

export const productCategories: Product['category'][] = [
  'Electronics',
  'Furniture',
  'Groceries',
  'Clothing',
  'Tools',
]
