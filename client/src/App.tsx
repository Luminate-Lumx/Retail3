import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Login and Register pages
import Welcome from './pages/Welcome';
import Register from './pages/Register';

// Retailer pages
import Home from './pages/Home';
import Products from './pages/Products';
import Score from './pages/Score';

// Customer pages
import CustomerHome from './pages/CustomerHome';
import CustomerBuy from './pages/CustomerBuy';
import CustomerScore from './pages/CustomerScore';
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<>
			<Toaster />
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/register" element={<Register />} />
				<Route path="/retailerHome" element={<Home />} />
				<Route path="/retailerProducts" element={<Products />} />
				<Route path="/retailerScore" element={<Score />} />
				<Route path="/customerHome" element={<CustomerHome />} />
				<Route path="/customerBuy" element={<CustomerBuy />} />
				<Route path="/customerScore" element={<CustomerScore />} />
			</Routes>
			<GlobalStyles />
		</>
	);
}

export default App;
