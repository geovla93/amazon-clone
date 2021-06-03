import { useSession, getSession } from "next-auth/client";
import moment from "moment";

import db from "../../firebase";

import Order from "../components/Order/Order";

function Orders({ orders }) {
	const [session] = useSession();

	return (
		<main>
			<div className="max-w-screen-lg mx-auto p-10">
				<h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
					Your orders
				</h1>
				{session ? (
					<h2>{orders.length} Orders</h2>
				) : (
					<h2>Please sign in to see your orders.</h2>
				)}
				<div className="mt-5 space-y-5">
					{orders?.map((order) => {
						return (
							<Order
								key={order.id}
								id={order.id}
								amount={order.amount}
								amountShipping={order.amountShipping}
								items={order.items}
								timestamp={order.timestamp}
								images={order.images}
							/>
						);
					})}
				</div>
			</div>
		</main>
	);
}

export async function getServerSideProps(ctx) {
	const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

	// Get the user's logged in credentials...
	const session = await getSession(ctx);

	if (!session) {
		return {
			props: {},
		};
	}

	// Firebase db
	const stripeOrders = await db
		.collection("users")
		.doc(session.user.email)
		.collection("orders")
		.orderBy("timestamp", "desc")
		.get();

	// Stripe orders
	const orders = await Promise.all(
		stripeOrders.docs.map(async (order) => {
			return {
				id: order.id,
				amount: order.data().amount,
				amountShipping: order.data().amount_shipping,
				images: order.data().images,
				timestamp: moment(order.data().timestamp.toDate()).unix(),
				items: (
					await stripe.checkout.sessions.listLineItems(order.id, {
						limit: 100,
					})
				).data,
			};
		})
	);

	return {
		props: {
			orders,
		},
	};
}

export default Orders;
