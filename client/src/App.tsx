import GlobalStyles from "./styles/GlobalStyles"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <GlobalStyles />
    </>
  )
}

export default App
