import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {

    const [products, setProducts] = useState([]);

    const [form, setForm] = useState({
        name: "",
        sku: "",
        price: "",
        stock_quantity: ""
    });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const res = await api.get("/products");
        setProducts(res.data);
    };

    const isFormValid =
        form.name &&
        form.sku &&
        form.price &&
        form.stock_quantity;

    const createProduct = async () => {

        try {

            await api.post("/products", {
                ...form,
                price: Number(form.price),
                stock_quantity: Number(form.stock_quantity)
            });

            await loadProducts();

            setForm({
                name: "",
                sku: "",
                price: "",
                stock_quantity: ""
            });

        } catch (error) {

            alert(
                error.response?.data?.detail ||
                "Failed to create product"
            );
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">

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
                    Product Management
                </h1>

                <p className="text-slate-400 mt-3">
                    Manage your inventory with ease
                </p>

            </div>

            <div
                className="
                    bg-slate-900
                    rounded-2xl
                    p-6
                    mb-8
                    border
                    border-slate-800
                    shadow-xl
                "
            >

                <h2 className="text-xl font-semibold mb-4">
                    Add Product
                </h2>

                <div className="grid md:grid-cols-4 gap-4">

                    <input
                        className="
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
                        placeholder="Product Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value
                            })
                        }
                    />

                    <input
                        className="
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
                        placeholder="SKU"
                        value={form.sku}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                sku: e.target.value
                            })
                        }
                    />

                    <input
                        type="number"
                        className="
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
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                price: e.target.value
                            })
                        }
                    />

                    <input
                        type="number"
                        className="
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
                        placeholder="Stock"
                        value={form.stock_quantity}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                stock_quantity: e.target.value
                            })
                        }
                    />

                </div>

                <button
                    onClick={createProduct}
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
                    Add Product
                </button>

            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">

                <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">

                    <p className="text-slate-400">
                        Total Products
                    </p>

                    <h2 className="text-3xl font-bold">
                        {products.length}
                    </h2>

                </div>

                <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">

                    <p className="text-slate-400">
                        Low Stock
                    </p>

                    <h2 className="text-3xl font-bold text-red-400">
                        {
                            products.filter(
                                product => product.stock_quantity < 5
                            ).length
                        }
                    </h2>

                </div>

            </div>

            <div
                className="
                    bg-slate-900
                    rounded-2xl
                    overflow-hidden
                    border
                    border-slate-800
                    shadow-xl
                "
            >

                <table className="w-full">

                    <thead className="bg-slate-800">

                        <tr>

                            <th className="p-4 text-left">
                                #
                            </th>

                            <th className="p-4 text-left">
                                Name
                            </th>

                            <th className="p-4 text-left">
                                SKU
                            </th>

                            <th className="p-4 text-left">
                                Price
                            </th>

                            <th className="p-4 text-left">
                                Stock
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {products.map((product, index) => (

                            <tr
                                key={product.id}
                                className="
                                    border-t
                                    border-slate-800
                                    hover:bg-slate-800/50
                                    transition-colors
                                "
                            >

                                <td className="p-4 text-cyan-400 font-semibold">
                                    {index + 1}
                                </td>

                                <td className="p-4">
                                    {product.name}
                                </td>

                                <td className="p-4">
                                    {product.sku}
                                </td>

                                <td className="p-4">
                                    ₹{product.price}
                                </td>

                                <td className="p-4">
                                    {product.stock_quantity}
                                </td>

                                <td className="p-4">

                                    {product.stock_quantity < 5 ? (

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
                                            Low Stock
                                        </span>

                                    ) : (

                                        <span
                                            className="
                                                bg-green-500/20
                                                text-green-400
                                                px-3
                                                py-1
                                                rounded-full
                                                text-sm
                                            "
                                        >
                                            In Stock
                                        </span>

                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                {products.length === 0 && (

                    <div className="p-8 text-center text-slate-400">

                        No products added yet

                    </div>

                )}

            </div>

        </div>
    );
}

export default Products;