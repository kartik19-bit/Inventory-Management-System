import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {

    const [customers, setCustomers] = useState([]);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const loadCustomers = async () => {
        const res = await api.get("/customers");
        setCustomers(res.data);
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    const createCustomer = async () => {

        try {

            await api.post(
                "/customers",
                form
            );

            await loadCustomers();

            setForm({
                name: "",
                email: "",
                phone: ""
            });

        } catch (error) {

            alert(
                error.response?.data?.detail ||
                "Failed to create customer"
            );
        }
    };

    const deleteCustomer = async (id) => {

    try {

        console.log("Deleting", id);

        const res = await api.delete(
            `/customers/${id}`
        );

        console.log(res.data);

        await loadCustomers();

    } catch (error) {

        console.log(error.response);

        alert(
            error.response?.data?.detail ||
            "Failed to delete customer"
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
                Customer Management
            </h1>

            <p className="text-slate-400 mt-3">
                Create and manage customers
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
                Add Customer
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

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
                    placeholder="Customer Name"
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
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value
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
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            phone: e.target.value
                        })
                    }
                />

            </div>

            <button
                onClick={createCustomer}
                disabled={
                    !form.name ||
                    !form.email ||
                    !form.phone
                }
                className={`
                    mt-6
                    w-full
                    py-3
                    rounded-xl
                    font-semibold
                    transition-colors

                    ${
                        !form.name ||
                        !form.email ||
                        !form.phone
                            ? "bg-slate-700 cursor-not-allowed"
                            : "bg-cyan-600 hover:bg-cyan-500"
                    }
                `}
            >
                Add Customer
            </button>

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
                            Email
                        </th>

                        <th className="p-4 text-left">
                            Phone
                        </th>

                        <th className="p-4 text-left">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {customers.map((customer, index) => (

                        <tr
                            key={customer.id}
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
                                {customer.name}
                            </td>

                            <td className="p-4">
                                {customer.email}
                            </td>

                            <td className="p-4">
                                {customer.phone}
                            </td>

                            <td className="p-4">

                                <button
                                    onClick={() =>
                                        deleteCustomer(customer.id)
                                    }
                                    className="
                                        bg-red-600
                                        hover:bg-red-500
                                        px-4
                                        py-2
                                        rounded-lg
                                        transition-colors
                                    "
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            {customers.length === 0 && (

                <div className="p-8 text-center text-slate-400">

                    No customers added yet

                </div>

            )}

        </div>

    </div>
);
}

export default Customers;