export type Picklist = {
  id: number;
  purchaseOrderId: string;
  type: string;
  components: string;
  orderId: string;
  productId: number;
  quantity: number;
};

export type EventLog = {
  id: number;
  orderId: string;
  timestamp: string;
  activity: string;
  details: string;
};

export type ApprovalForm = {
  id: number;
  purchaseOrderId: string;
  isApproved: boolean;
  comments: string;
  orderId: string;
  dateApproved: string;
};

export type RejectionForm = {
  id: number;
  purchaseOrderId: string;
  reason: string;
  rejectionDate: string;
  orderId: string;
};
