import { statuses } from "./statuseslist";
//sample data for the production page

export const sampleData = [
  {
    orderId: "ORD001",
    productType: "A",
    aantal: 10,
    productielijn: 1,
    leverdatum: "2025-06-15",
    status: statuses[0], // "In productie"
  },
  {
    orderId: "ORD002",
    productType: "B",
    aantal: 5,
    productielijn: 2,
    leverdatum: "2025-06-16",
    status: statuses[2], // "Wachten op onderdelen"
  },
  {
    orderId: "ORD003",
    productType: "C",
    aantal: 8,
    productielijn: 3,
    leverdatum: "2025-06-17",
    status: statuses[1], // "Afgerond"
  },
  {
    orderId: "ORD004",
    productType: "B",
    aantal: 3,
    productielijn: 1,
    leverdatum: "2025-06-17",
    status: statuses[0], // "In productie"
  },
  {
    orderId: "ORD005",
    productType: "B",
    aantal: 5,
    productielijn: 2,
    leverdatum: "2025-06-16",
    status: statuses[2], // "Wachten op onderdelen"
  },
  {
    orderId: "ORD006",
    productType: "C",
    aantal: 8,
    productielijn: 3,
    leverdatum: "2025-06-17",
    status: statuses[1], // "Afgerond"
  },
  {
    orderId: "ORD007",
    productType: "B",
    aantal: 3,
    productielijn: 1,
    leverdatum: "2025-06-17",
    status: statuses[0], // "In productie"
  },
  {
    orderId: "ORD008",
    productType: "B",
    aantal: 5,
    productielijn: 2,
    leverdatum: "2025-06-16",
    status: statuses[2], // "Wachten op onderdelen"
  },
  {
    orderId: "ORD009",
    productType: "C",
    aantal: 8,
    productielijn: 1,
    leverdatum: "2025-06-17",
    status: statuses[1], // "Afgerond"
  },
];
