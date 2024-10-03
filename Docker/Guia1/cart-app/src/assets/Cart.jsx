import CartItem from "./CartItem";

function Cart( {cart, removeFromCart } ) {
    const total = cart.reduce((acc, product) => acc + product.price, 0);

    return (
        <div className="container text-center">
            <h2>Carrito</h2>
            {cart.length === 0 ? (
                <p>No hay productos en el carrito</p>
            ) : (
                <div>
                    <table className="table table-stripped">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product) => (
                                <CartItem key={product.id} product={product} removeFromCart={removeFromCart} />
                            ))}
                        </tbody>
                    </table>
                    <p>Total: ${total.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
}

export default Cart
