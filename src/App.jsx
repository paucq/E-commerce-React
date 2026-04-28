import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/templates/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Checkout from "./pages/Checkout.jsx";
import useAuthStore from "./store/useAuthStore.js";

export default function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="checkout"
            element={user ? <Checkout /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
