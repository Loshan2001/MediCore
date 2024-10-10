import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";
import Hospital from "./pages/hospital/Hospital";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import DoctorPage from "./pages/DoctorPage";
import HospitalPage from "./pages/HospitalPage";
import Appointment from "./pages/appointment/Appointment";
import AppointmentPage from "./pages/AppointmentPage";

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
				
				<Route path='/sales' element={<SalesPage />} />
				<Route path='/orders' element={<OrdersPage />} />
				<Route path='/analytics' element={<AnalyticsPage />} />*/}
				<Route path='/user' element={<UsersPage />} />
				<Route path='/doctor' element={<DoctorPage />} /> 
				<Route path='/settings' element={<SettingsPage />} /> 
				<Route path='/hospital' element={<HospitalPage/>} />
				<Route path='/appointment' element={<AppointmentPage />} />
			</Routes>
		</div>
	);
}

export default App;
