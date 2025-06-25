export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  costPrice: number;
  stockQuantity: number;
};

export type EventLog = {
  id: number;
  orderId: number;
  timestamp: string;
  activity: string;
  details: string;
  order: string;
};

export type Order = {
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  status: string;
  orderDate: string;
  approvedDate: string;
  rejectedDate: string;
  deliveredDate: string;
  comment: string;
  orderType: string;
  isSignedByInkoop: boolean;
  isSignedByAccountmanager: boolean;
  forwardedToSupplier: boolean;
  picklistStatus: string;
  rejectionReason: string;
  customer: string;
  product: Product;
  eventLogs: EventLog[];
};

export type Customer = {
  id: number;
  username: string;
  name: string;
  password: string;
  orders: Order[];
};

export type ProductLine = {
  id: number;
  lineName: string;
  isActive: boolean;
};
