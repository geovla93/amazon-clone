import Head from "next/head";
import { getSession } from "next-auth/client";

import Banner from "../components/Banner/Banner";
import ProductFeed from "../components/ProductFeed/ProductFeed";

export default function Home({ products }) {
	return (
		<div className="bg-gray-100">
			<Head>
				<title>Amazon Clone</title>
			</Head>

			{/* Banner */}
			<main className="max-w-screen-2xl mx-auto">
				<Banner />

				{/* Product Feed */}
				<ProductFeed products={products} />
			</main>
		</div>
	);
}

export const getServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const response = await fetch("https://fakestoreapi.com/products");
	const products = await response.json();

	return {
		props: {
			products: JSON.parse(JSON.stringify(products)),
			session,
		},
	};
};
