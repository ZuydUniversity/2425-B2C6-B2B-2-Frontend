import { Status } from "./statuseslist";

/**
 * Sample global for the production page
 */
export const sampleData = [
  {
    orderId: "ORD001",
    productType: "A",
    aantal: 10,
    productielijn: 1,
    leverdatum: "2025-06-15",
    status: Status.InProduction,
  },
  {
    orderId: "ORD002",
    productType: "B",
    aantal: 5,
    productielijn: 2,
    leverdatum: "2025-06-16",
    status: Status.WaitingForParts,
  },
  {
    orderId: "ORD003",
    productType: "C",
    aantal: 8,
    productielijn: 3,
    leverdatum: "2025-06-17",
    status: Status.WaitingForExpedition,
  },
  {
    orderId: "ORD004",
    productType: "B",
    aantal: 3,
    productielijn: 1,
    leverdatum: "2025-06-17",
    status: Status.InProduction,
  },
  {
    orderId: "ORD005",
    productType: "B",
    aantal: 5,
    productielijn: 2,
    leverdatum: "2025-06-16",
    status: Status.WaitingForParts,
  },
  {
    orderId: "ORD006",
    productType: "C",
    aantal: 8,
    productielijn: 3,
    leverdatum: "2025-06-17",
    status: Status.WaitingForExpedition,
  },
  {
    orderId: "ORD007",
    productType: "B",
    aantal: 3,
    productielijn: 1,
    leverdatum: "2025-06-17",
    status: Status.InProduction,
  },
  {
    orderId: "ORD008",
    productType: "B",
    aantal: 5,
    productielijn: 2,
    leverdatum: "2025-06-16",
    status: Status.WaitingForParts,
  },
  {
    orderId: "ORD009",
    productType: "C",
    aantal: 8,
    productielijn: 1,
    leverdatum: "2025-06-17",
    status: Status.WaitingForExpedition,
  },
];
