import { NavLink } from "react-router-dom";

function Navbar() {

    const linkClass = ({ isActive }) =>
        `
        px-4
        py-2
        rounded-lg
        transition-colors
        duration-200

        ${
            isActive
                ? "bg-cyan-500/20 text-cyan-400"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
        }
    `;

    return (
        <nav
            className="
                sticky
                top-0
                z-50
                bg-slate-900/95
                backdrop-blur-sm
                border-b
                border-slate-800
            "
        >

            <div
                className="
                    max-w-7xl
                    mx-auto
                    px-6
                    py-4
                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <h1
                        className="
                            text-xl
                            font-bold
                            bg-gradient-to-r
                            from-cyan-400
                            to-blue-500
                            bg-clip-text
                            text-transparent
                        "
                    >
                        Inventory Management System
                    </h1>

                </div>

                <div
                    className="
                        flex
                        gap-2
                        flex-wrap
                    "
                >

                    <NavLink
                        to="/"
                        className={linkClass}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={linkClass}
                    >
                        Products
                    </NavLink>

                    <NavLink
                        to="/customers"
                        className={linkClass}
                    >
                        Customers
                    </NavLink>

                    <NavLink
                        to="/orders"
                        className={linkClass}
                    >
                        Orders
                    </NavLink>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;