import GlobalStyles from "./styles/GlobalStyles"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Score from "./pages/Score";
import Orders from "./pages/Orders";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/retailerHome" element={<Home />} />
        <Route path="/retailerProducts" element={<Products code={0} ipfsHash={""} name={""} tags={[]} price={0} score={0} />} />
        <Route path="/retailerScore" element={<Score />} />
        <Route path="/retailerOrders" element={<Orders />} />
      </Routes>
      <GlobalStyles />
    </>
  )
}

export default App
