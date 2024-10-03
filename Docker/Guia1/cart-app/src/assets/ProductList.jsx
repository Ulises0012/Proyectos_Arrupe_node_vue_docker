import ProductItem from "./ProductItem";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductList({ products, addToCart }) {
    return (
        <div className="container">
            <h2>Lista de Productos</h2>
            <div className="row">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
}

export default ProductList
