function CartItem ({product, removeFromCart}) {
    const handleRemoveFromCart = () => {
        removeFromCart(product.id);
    }

    return (
        <tr>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
                <button className="btn btn-danger" onClick={handleRemoveFromCart}>Eliminar</button>
            </td>
        </tr>
    )
}

export default CartItem
