import { useEffect, useState } from "react";
import api from "../services/api";
import {
    Package,
    Users,
    ShoppingCart
} from "lucide-react";

function Dashboard() {

    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const productsRes = await api.get("/products");
            const customersRes = await api.get("/customers");
            const ordersRes = await api.get("/orders");

            setProducts(productsRes.data);
            setCustomers(customersRes.data);
            setOrders(ordersRes.data);

        } catch (error) {

            console.error("Failed to load dashboard data");

        }
    };

    const lowStockProducts = products.filter(
        product => product.stock_quantity < 5
    );

    return (
        <div className="max-w-7xl mx-auto p-6">

            <div className="text-center mb-10">

                <h1
                    className="
                        text-5xl md:text-6xl
                        font-extrabold
                        bg-gradient-to-r
                        from-cyan-400
                        via-blue-500
                        to-indigo-500
                        bg-clip-text
                        text-transparent
                    "
                >
                    Inventory Dashboard
                </h1>

                <p className="text-slate-400 mt-3">
                    Monitor products, customers and orders
                </p>

            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">

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

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-slate-400">
                                Products
                            </p>

                            <h2 className="text-5xl font-bold mt-2">
                                {products.length}
                            </h2>

                        </div>

                        <Package
                            size={42}
                            className="text-cyan-400"
                        />

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

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-slate-400">
                                Customers
                            </p>

                            <h2 className="text-5xl font-bold mt-2">
                                {customers.length}
                            </h2>

                        </div>

                        <Users
                            size={42}
                            className="text-green-400"
                        />

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

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-slate-400">
                                Orders
                            </p>

                            <h2 className="text-5xl font-bold mt-2">
                                {orders.length}
                            </h2>

                        </div>

                        <ShoppingCart
                            size={42}
                            className="text-blue-400"
                        />

                    </div>

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

                <h2 className="text-2xl font-semibold mb-4">
                    Low Stock Products
                </h2>

                {lowStockProducts.length === 0 ? (

                    <div className="text-center py-6">

                        <p className="text-slate-400">
                            No low stock products
                        </p>

                    </div>

                ) : (

                    <div className="space-y-3">

                        {lowStockProducts.map(product => (

                            <div
                                key={product.id}
                                className="
                                    flex
                                    justify-between
                                    items-center
                                    bg-slate-800
                                    rounded-xl
                                    p-4
                                    border
                                    border-slate-700
                                "
                            >

                                <span>
                                    {product.name}
                                </span>

                                <span
                                    className="
                                        bg-red-500/20
                                        text-red-400
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                    "
                                >
                                    {product.stock_quantity} Left
                                </span>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Dashboard;