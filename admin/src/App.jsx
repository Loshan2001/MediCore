import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";
import Hospital from "./pages/hospital/Hospital";

import SettingsPage from "./pages/SettingsPage";
import Doctor from "./pages/doctor/Doctor";

function App() {
	return (
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
			<Routes>
				
				{/* <Route path='/' element={<OverviewPage />} /> */}
				{/* <Route path='/products' element={<ProductsPage />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path='/sales' element={<SalesPage />} />
				<Route path='/orders' element={<OrdersPage />} />
				<Route path='/analytics' element={<AnalyticsPage />} />*/}
				<Route path='/doctor' element={<Doctor />} /> 
				<Route path='/settings' element={<SettingsPage />} /> 
				<Route path='/hospital' element={<Hospital/>} /> 
			</Routes>
		</div>
	);
}

export default App;
