export interface User {
  username: string
  name: string
  role: 'admin' | 'manager' | 'viewer'
}

export type ProductCategory = 'Electronics' | 'Furniture' | 'Groceries' | 'Clothing' | 'Tools'
export type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock'

export interface Product {
  id: number
  sku: string
  name: string
  category: ProductCategory
  quantity: number
  price: number
  supplier: string
  status: ProductStatus
}

export interface Supplier {
  id: number
  name: string
  contact: string
  email: string
  rating: number
  active: boolean
}

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled'

export interface Order {
  id: number
  reference: string
  customer: string
  items: number
  total: number
  status: OrderStatus
  date: string
}

export interface NewProductInput {
  name: string
  sku: string
  category: ProductCategory | ''
  quantity: number
  price: number
  supplier: string
  description: string
  acceptTerms: boolean
  notify: boolean
}
