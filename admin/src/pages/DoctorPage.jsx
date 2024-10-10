import {UsersIcon} from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import Doctor from "./doctor/Doctor";
import { useEffect, useState } from "react";


const DoctorPage = () => {


	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Doctors' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				

				<Doctor />

				
			</main>
		</div>
	);
};
export default DoctorPage;
