import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);

    const [customerId, setCustomerId] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        loadCustomers();
        loadProducts();
    }, []);

    const loadCustomers = async () => {
        const res = await api.get("/customers");
        setCustomers(res.data);
    };

    const loadProducts = async () => {
        const res = await api.get("/products");
        setProducts(res.data);
    };

    const selectedProduct = products.find(
        (product) => product.id === Number(productId)
    );

    const isFormValid =
        customerId &&
        productId &&
        quantity >= 1;

    const placeOrder = async () => {

        try {

            const payload = {
                customer_id: Number(customerId),
                items: [
                    {
                        product_id: Number(productId),
                        quantity: Number(quantity)
                    }
                ]
            };

            const res = await api.post(
                "/orders",
                payload
            );

            alert(
                `Order Created Successfully\nTotal Amount: ₹${res.data.total_amount}`
            );

            setCustomerId("");
            setProductId("");
            setQuantity(1);

            loadProducts();

        } catch (error) {

            alert(
                error.response?.data?.detail ||
                "Failed to create order"
            );
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">

            <div className="text-center mb-10">

                <h1
                    className="
                        text-5xl
                        md:text-6xl
                        leading-tight
                        pb-2
                        font-extrabold
                        bg-gradient-to-r
                        from-cyan-400
                        via-blue-500
                        to-indigo-500
                        bg-clip-text
                        text-transparent
                    "
                >
                    Order Creation
                </h1>

                <p className="text-slate-400 mt-3">
                    Create and manage customer orders
                </p>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">

                <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">

                    <p className="text-slate-400 text-sm">
                        Customers
                    </p>

                    <h2 className="text-2xl font-bold">
                        {customers.length}
                    </h2>

                </div>

                <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">

                    <p className="text-slate-400 text-sm">
                        Products
                    </p>

                    <h2 className="text-2xl font-bold">
                        {products.length}
                    </h2>

                </div>

                <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">

                    <p className="text-slate-400 text-sm">
                        Quantity
                    </p>

                    <h2 className="text-2xl font-bold">
                        {quantity}
                    </h2>

                </div>

            </div>

            <div
                className="
                    bg-slate-900
                    rounded-2xl
                    p-6
                    border
                    border-slate-800
                    shadow-xl
                "
            >

                <div className="grid md:grid-cols-2 gap-6">

                    <div>

                        <label className="block mb-2 text-slate-300">
                            Customer
                        </label>

                        <select
                            className="
                                w-full
                                bg-slate-800
                                border
                                border-slate-700
                                rounded-xl
                                px-4
                                py-3
                                focus:outline-none
                                focus:border-cyan-500
                                transition-colors
                            "
                            value={customerId}
                            onChange={(e) =>
                                setCustomerId(e.target.value)
                            }
                        >
                            <option value="">
                                Select Customer
                            </option>

                            {customers.length === 0 && (
                                <option disabled>
                                    No customers available
                                </option>
                            )}

                            {customers.map(customer => (

                                <option
                                    key={customer.id}
                                    value={customer.id}
                                >
                                    {customer.name}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="block mb-2 text-slate-300">
                            Product
                        </label>

                        <select
                            className="
                                w-full
                                bg-slate-800
                                border
                                border-slate-700
                                rounded-xl
                                px-4
                                py-3
                                focus:outline-none
                                focus:border-cyan-500
                                transition-colors
                            "
                            value={productId}
                            onChange={(e) =>
                                setProductId(e.target.value)
                            }
                        >
                            <option value="">
                                Select Product
                            </option>

                            {products.length === 0 && (
                                <option disabled>
                                    No products available
                                </option>
                            )}

                            {products.map(product => (

                                <option
                                    key={product.id}
                                    value={product.id}
                                >
                                    {product.name}
                                    {" - "}
                                    ₹{product.price}
                                    {" - Stock: "}
                                    {product.stock_quantity}
                                </option>

                            ))}

                        </select>

                    </div>

                </div>

                <div className="mt-6">

                    <label className="block mb-2 text-slate-300">
                        Quantity
                    </label>

                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        className="
                            w-full
                            bg-slate-800
                            border
                            border-slate-700
                            rounded-xl
                            px-4
                            py-3
                            focus:outline-none
                            focus:border-cyan-500
                            transition-colors
                        "
                        onChange={(e) =>
                            setQuantity(e.target.value)
                        }
                    />

                </div>

                {selectedProduct && (

                    <div
                        className="
                            mt-6
                            bg-slate-800/60
                            rounded-xl
                            p-5
                            border
                            border-slate-700
                        "
                    >

                        <h3 className="font-semibold mb-4">
                            Order Summary
                        </h3>

                        <div className="space-y-2">

                            <p>
                                Product:
                                {" "}
                                {selectedProduct.name}
                            </p>

                            <p>
                                Unit Price:
                                {" "}
                                ₹{selectedProduct.price}
                            </p>

                            <p>
                                Available Stock:
                                {" "}
                                {selectedProduct.stock_quantity}
                            </p>

                            {selectedProduct.stock_quantity < 5 ? (

                                <span
                                    className="
                                        inline-block
                                        mt-2
                                        bg-red-500/20
                                        text-red-400
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                    "
                                >
                                    Low Stock
                                </span>

                            ) : (

                                <span
                                    className="
                                        inline-block
                                        mt-2
                                        bg-green-500/20
                                        text-green-400
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                    "
                                >
                                    Available
                                </span>

                            )}

                            <p
                                className="
                                    mt-4
                                    text-2xl
                                    font-bold
                                    text-cyan-400
                                "
                            >
                                Estimated Total:
                                {" "}
                                ₹{
                                    selectedProduct.price *
                                    Number(quantity || 0)
                                }
                            </p>

                        </div>

                    </div>

                )}

                <button
                    onClick={placeOrder}
                    disabled={!isFormValid}
                    className={`
                        mt-6
                        w-full
                        py-3
                        rounded-xl
                        font-semibold
                        transition-colors

                        ${
                            !isFormValid
                                ? "bg-slate-700 cursor-not-allowed"
                                : "bg-cyan-600 hover:bg-cyan-500"
                        }
                    `}
                >
                    Place Order
                </button>

            </div>

        </div>
    );
}

export default Orders;