import React, { useEffect, useState } from "react";
import {
  apiGetProducts,
  apiCreateProduct,
  apiDeleteProduct,
} from "../api/products";
import type { Product } from "../types";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGetProducts()
      .then(setProducts)
      .catch((e) => setError(e.message));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await apiCreateProduct(newProduct as Product);
      setProducts((prev) => [...prev, created]);
      setNewProduct({});
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiDeleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Products</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleCreate} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name || ""}
          onChange={(e) =>
            setNewProduct((f) => ({ ...f, name: e.target.value }))
          }
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description || ""}
          onChange={(e) =>
            setNewProduct((f) => ({ ...f, description: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price || ""}
          onChange={(e) =>
            setNewProduct((f) => ({ ...f, price: Number(e.target.value) }))
          }
          required
        />
        <input
          type="number"
          placeholder="Cost Price"
          value={newProduct.costPrice || ""}
          onChange={(e) =>
            setNewProduct((f) => ({ ...f, costPrice: Number(e.target.value) }))
          }
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={newProduct.stockQuantity || ""}
          onChange={(e) =>
            setNewProduct((f) => ({
              ...f,
              stockQuantity: Number(e.target.value),
            }))
          }
        />
        <button type="submit">Toevoegen</button>
      </form>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Cost Price</th>
            <th>Stock Quantity</th>
            <th>Actie</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.costPrice}</td>
              <td>{product.stockQuantity}</td>
              <td>
                <button onClick={() => handleDelete(product.id)}>
                  Verwijder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
