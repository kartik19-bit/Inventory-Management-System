import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-slate-950 text-white">

        <Navbar />

        <main className="max-w-7xl mx-auto px-6 py-8">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/customers"
              element={<Customers />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;