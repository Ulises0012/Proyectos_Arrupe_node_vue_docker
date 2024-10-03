import { useState } from "react";
import ProductList from "./assets/ProductList";
import Cart from "./assets/Cart";

const products = [
  {
    id: 1,
    name: "Producto 1",
    price: 9.99
  },
  {
    id: 2,
    name: "Producto 2",
    price: 14.99
  },
  {
    id: 3,
    name: "Producto 3",
    price: 19.99
  }
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  }

  return (
    <div>
      <h1 className="text-center">Tienda Online</h1>
      <nav className="text-center">
        <a className="text-dark text-decoration-none mx-3" href="products.html">Lista de Productos</a>
        <a className="text-dark text-decoration-none mx-3" href="cart.html">Carrito de Compras</a>
      </nav>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
}

export default App;
