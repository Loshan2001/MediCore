import Header from "../components/common/Header";
import Hospital from "./hospital/Hospital";



const HospitalPage = () => {


	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Hospitals' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				

				<Hospital />

				
			</main>
		</div>
	);
};
export default HospitalPage;
