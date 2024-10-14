import Header from "../components/common/Header";
import Report from "./report/Report";


const ReportPage = () => {


	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Booking Report' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				

				<Report />

				
			</main>
		</div>
	);
};
export default ReportPage;
