import {UsersIcon} from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import { useEffect, useState } from "react";


const UsersPage = () => {

	const [userData, setUserData] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5001/api/user/all")
		  .then((res) => res.json())
		  .then((data) => {
			setUserData(data); 
		  })
		  .catch((err) => console.log(err));
	  }, []);

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Users' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Users'
						icon={UsersIcon}
						value={userData.length.toLocaleString()}
						color='#6366F1'
					/>
				</motion.div>

				<UsersTable />

				
			</main>
		</div>
	);
};
export default UsersPage;
