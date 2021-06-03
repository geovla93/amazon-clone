import Image from "next/image";
import { useRouter } from "next/router";
import {
	MenuIcon,
	SearchIcon,
	ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useSelector } from "react-redux";

import { selectQuantity } from "../../../store/slices/basketSlice";

function Header() {
	const [session] = useSession();
	const router = useRouter();
	const quantity = useSelector(selectQuantity);

	const handleLogoClick = () => {
		router.push("/");
	};

	const handleBasketClick = () => {
		router.push("/checkout");
	};

	const handleOrdersClick = () => {
		session && router.push("/orders");
	};

	return (
		<header className="sticky">
			{/* Top Nav */}
			<div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
				<div className="flex mt-2 items-center flex-grow sm:flex-grow-0">
					<Image
						src="https://links.papareact.com/f90"
						alt="logo"
						width={150}
						height={40}
						objectFit="contain"
						className="cursor-pointer"
						onClick={handleLogoClick}
					/>
				</div>

				{/* Search */}
				<div className="bg-yellow-400 hover:bg-yellow-500 hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer">
					<input
						className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
						type="text"
					/>
					<SearchIcon className="h-12 p-4" />
				</div>

				{/* Right */}
				<div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
					<div onClick={!session ? signIn : signOut} className="link">
						<p className="font-extrabold md:text-sm">
							{session ? `Hello, ${session.user.name}` : "Sign In"}
						</p>
						<p className="font-extrabold md:text-sm">Account & Lists</p>
					</div>
					<div onClick={handleOrdersClick} className="link">
						<p className="font-extrabold md:text-sm">Returns</p>
						<p className="font-extrabold md:text-sm">& Orders</p>
					</div>
					<div
						onClick={handleBasketClick}
						className="relative link flex items-center"
					>
						<span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
							{quantity}
						</span>
						<ShoppingCartIcon className="h-10" />
						<p className="font-extrabold md:text-sm hidden md:inline mt-2">
							Basket
						</p>
					</div>
				</div>
			</div>
			{/* Bottom Nav */}
			<div className="flex space-x-3 p-2 pl-6 items-center bg-amazon_blue-light text-white text-sm">
				<p className="link flex items-center">
					<MenuIcon className="h-6 mr-1" /> All
				</p>
				<p className="link">Prime Video</p>
				<p className="link">Amazon Business</p>
				<p className="link">Today's Deals</p>
				<p className="link hidden lg:inline-flex">Electronics</p>
				<p className="link hidden lg:inline-flex">Food & Grocery</p>
				<p className="link hidden lg:inline-flex">Prime</p>
				<p className="link hidden lg:inline-flex">Buy Again</p>
				<p className="link hidden lg:inline-flex">Shopper Toolkit</p>
				<p className="link hidden lg:inline-flex">Health & Personal Care</p>
			</div>
		</header>
	);
}

export default Header;
