import React, { useState } from "react";
import { apiCreatePicklist } from "../api/picklists";
import { apiCreatePartsDelivery } from "../api/partsDelivery";
import { apiCreateExpedition } from "../api/expedition";
import type { Picklist, PartsDelivery, Expedition } from "../types";

// Use numbers for IDs for backend compatibility
const emptyPicklist: Picklist = {
  id: 0,
  purchaseOrderId: 0,
  type: "",
  components: "",
  orderId: 0,
  productId: 0,
  quantity: 0,
};

const emptyPartsDelivery: PartsDelivery = {
  id: 0,
  partsReference: "",
  deliveryDate: "",
  isComplete: false,
};

const emptyExpedition: Expedition = {
  id: 0,
  shipmentReference: "",
  shipmentDate: "",
  destination: "",
  isDelivered: false,
};

const PicklistPage = () => {
  const [picklists, setPicklists] = useState<Picklist[]>([]);
  const [partsDeliveries, setPartsDeliveries] = useState<PartsDelivery[]>([]);
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);

  const [newPicklist, setNewPicklist] = useState<Picklist>({
    ...emptyPicklist,
  });
  const [newPartsDelivery, setNewPartsDelivery] = useState<PartsDelivery>({
    ...emptyPartsDelivery,
  });
  const [newExpedition, setNewExpedition] = useState<Expedition>({
    ...emptyExpedition,
  });

  const [showPartsDeliveryForm, setShowPartsDeliveryForm] = useState<
    number | null
  >(null);
  const [showExpeditionForm, setShowExpeditionForm] = useState<string | null>(
    null,
  );

  // Picklist handlers
  const handlePicklistChange = (
    field: keyof Picklist,
    value: string | number,
  ) => {
    setNewPicklist((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePicklistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await apiCreatePicklist(newPicklist);
    setPicklists((prev) => [...prev, created]);
    setNewPicklist({ ...emptyPicklist });
  };

  // PartsDelivery handlers
  const handlePartsDeliveryChange = (
    field: keyof PartsDelivery,
    value: string | boolean,
  ) => {
    setNewPartsDelivery((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePartsDeliverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await apiCreatePartsDelivery(newPartsDelivery);
    setPartsDeliveries((prev) => [...prev, created]);
    setNewPartsDelivery({ ...emptyPartsDelivery });
    setShowPartsDeliveryForm(null);
  };

  // Expedition handlers
  const handleExpeditionChange = (
    field: keyof Expedition,
    value: string | boolean,
  ) => {
    setNewExpedition((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleExpeditionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await apiCreateExpedition(newExpedition);
    setExpeditions((prev) => [...prev, created]);
    setNewExpedition({ ...emptyExpedition });
    setShowExpeditionForm(null);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Picklists</h2>
      {/* Picklist Form */}
      <form onSubmit={handlePicklistSubmit} style={{ marginBottom: 24 }}>
        <input
          type="number"
          placeholder="PurchaseOrderId"
          value={newPicklist.purchaseOrderId}
          onChange={(e) =>
            handlePicklistChange("purchaseOrderId", Number(e.target.value))
          }
          required
        />
        <input
          type="text"
          placeholder="Type"
          value={newPicklist.type}
          onChange={(e) => handlePicklistChange("type", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Components"
          value={newPicklist.components}
          onChange={(e) => handlePicklistChange("components", e.target.value)}
        />
        <input
          type="number"
          placeholder="OrderId"
          value={newPicklist.orderId}
          onChange={(e) =>
            handlePicklistChange("orderId", Number(e.target.value))
          }
        />
        <input
          type="number"
          placeholder="ProductId"
          value={newPicklist.productId}
          onChange={(e) =>
            handlePicklistChange("productId", Number(e.target.value))
          }
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newPicklist.quantity}
          onChange={(e) =>
            handlePicklistChange("quantity", Number(e.target.value))
          }
        />
        <button type="submit">Toevoegen</button>
      </form>

      {/* Picklist Table */}
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>PurchaseOrderId</th>
            <th>Type</th>
            <th>Components</th>
            <th>OrderId</th>
            <th>ProductId</th>
            <th>Quantity</th>
            <th>Actie</th>
          </tr>
        </thead>
        <tbody>
          {picklists.map((p) => (
            <tr key={p.id}>
              <td>{p.purchaseOrderId}</td>
              <td>{p.type}</td>
              <td>{p.components}</td>
              <td>{p.orderId}</td>
              <td>{p.productId}</td>
              <td>{p.quantity}</td>
              <td>
                <button
                  onClick={() => {
                    setShowPartsDeliveryForm(p.purchaseOrderId);
                    setNewPartsDelivery({
                      ...emptyPartsDelivery,
                      partsReference: String(p.purchaseOrderId), // Link to picklist
                    });
                  }}
                >
                  Maak PartsDelivery
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PartsDelivery Form (shown for selected Picklist) */}
      {showPartsDeliveryForm !== null && (
        <form onSubmit={handlePartsDeliverySubmit} style={{ margin: "24px 0" }}>
          <h3>PartsDelivery voor Picklist {showPartsDeliveryForm}</h3>
          <input
            type="text"
            placeholder="Parts Reference"
            value={newPartsDelivery.partsReference}
            onChange={(e) =>
              handlePartsDeliveryChange("partsReference", e.target.value)
            }
            required
          />
          <input
            type="date"
            placeholder="Delivery Date"
            value={newPartsDelivery.deliveryDate}
            onChange={(e) =>
              handlePartsDeliveryChange("deliveryDate", e.target.value)
            }
            required
          />
          <label>
            <input
              type="checkbox"
              checked={newPartsDelivery.isComplete}
              onChange={(e) =>
                handlePartsDeliveryChange("isComplete", e.target.checked)
              }
            />
            Is Complete
          </label>
          <button type="submit">Toevoegen</button>
        </form>
      )}

      {/* PartsDelivery Table */}
      <h2>Parts Deliveries</h2>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Parts Reference</th>
            <th>Delivery Date</th>
            <th>Is Complete</th>
            <th>Actie</th>
          </tr>
        </thead>
        <tbody>
          {partsDeliveries.map((d) => (
            <tr key={d.id}>
              <td>{d.partsReference}</td>
              <td>{d.deliveryDate}</td>
              <td>{d.isComplete ? "Ja" : "Nee"}</td>
              <td>
                <button
                  onClick={() => {
                    setShowExpeditionForm(d.partsReference);
                    setNewExpedition({
                      ...emptyExpedition,
                      shipmentReference: d.partsReference, // Link to parts delivery
                    });
                  }}
                >
                  Maak Expedition
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Expedition Form (shown for selected PartsDelivery) */}
      {showExpeditionForm && (
        <form onSubmit={handleExpeditionSubmit} style={{ margin: "24px 0" }}>
          <h3>Expedition voor PartsDelivery {showExpeditionForm}</h3>
          <input
            type="text"
            placeholder="Shipment Reference"
            value={newExpedition.shipmentReference}
            onChange={(e) =>
              handleExpeditionChange("shipmentReference", e.target.value)
            }
            required
          />
          <input
            type="date"
            placeholder="Shipment Date"
            value={newExpedition.shipmentDate}
            onChange={(e) =>
              handleExpeditionChange("shipmentDate", e.target.value)
            }
            required
          />
          <input
            type="text"
            placeholder="Destination"
            value={newExpedition.destination}
            onChange={(e) =>
              handleExpeditionChange("destination", e.target.value)
            }
            required
          />
          <label>
            <input
              type="checkbox"
              checked={newExpedition.isDelivered}
              onChange={(e) =>
                handleExpeditionChange("isDelivered", e.target.checked)
              }
            />
            Is Delivered
          </label>
          <button type="submit">Toevoegen</button>
        </form>
      )}

      {/* Expedition Table */}
      <h2>Expedities</h2>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Shipment Reference</th>
            <th>Shipment Date</th>
            <th>Destination</th>
            <th>Is Delivered</th>
          </tr>
        </thead>
        <tbody>
          {expeditions.map((e) => (
            <tr key={e.id}>
              <td>{e.shipmentReference}</td>
              <td>{e.shipmentDate}</td>
              <td>{e.destination}</td>
              <td>{e.isDelivered ? "Ja" : "Nee"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PicklistPage;
