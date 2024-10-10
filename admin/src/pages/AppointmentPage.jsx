import Header from "../components/common/Header";
import Appointment from "./appointment/Appointment";
import Hospital from "./hospital/Hospital";



const AppointmentPage = () => {


	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Appointments' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				

				<Appointment />

				
			</main>
		</div>
	);
};
export default AppointmentPage;
