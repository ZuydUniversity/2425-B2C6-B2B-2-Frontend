export type ApprovalForm = {
  id: number;
  purchaseOrderId: number;
  isApproved: boolean;
  comments: string;
  orderId: number;
  dateApproved: string;
};

export type Customer = {
  id: number;
  username: string;
  name: string;
  password: string;
  orders?: Order[];
};

export type Expedition = {
  id: number;
  shipmentReference: string;
  shipmentDate: string;
  destination: string;
  isDelivered: boolean;
};

export type Order = {
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  status: string;
  orderDate: string;
  approvedDate?: string;
  rejectedDate?: string;
  deliveredDate?: string;
  comment?: string;
  orderType?: string;
  isSignedByInkoop?: boolean;
  isSignedByAccountmanager?: boolean;
  forwardedToSupplier?: boolean;
  picklistStatus?: string;
  rejectionReason?: string;
  customer?: Customer;
  product?: Product;
  eventLogs?: EventLog[];
};

export type Picklist = {
  id: number;
  purchaseOrderId: number;
  type: string;
  components: string;
  purchaseOrder?: PurchaseOrder;
  orderId: number;
  productId: number;
  quantity: number;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  costPrice: number;
  stockQuantity: number;
};

export type ProductionLine = {
  id: number;
  lineName: string;
  isActive: boolean;
};

export type PurchaseOrder = {
  id: number;
  orderNumber: string;
  orderDate: string;
  customerName: string;
  status: string;
  productId: number;
  supplierId: number;
  quantity: number;
};

export type RejectionForm = {
  id: number;
  purchaseOrderId: number;
  reason: string;
  rejectionDate: string;
  orderId: number;
};

export type Supplier = {
  id: number;
  name: string;
};

export type EventLog = {
  id: number;
  orderId: number;
  timestamp: string;
  activity: string;
  details: string;
  order?: Order;
};

export type PartsDelivery = {
  id: number;
  partsReference: string;
  deliveryDate: string;
  isComplete: boolean;
};
