import Head from "next/head";
import Banner from "../components/Banner/Banner";
import ProductFeed from "../components/ProductFeed/ProductFeed";

export default function Home({ products }) {
	return (
		<div className="bg-gray-100">
			<Head>
				<title>Amazon 2.0</title>
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

export const getServerSideProps = async () => {
	const response = await fetch("https://fakestoreapi.com/products");
	const products = await response.json();

	return {
		props: {
			products: JSON.parse(JSON.stringify(products)),
		},
	};
};
