import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";

import { addToBasket, removeFromBasket } from "../../store/slices/basketSlice";

function CheckoutProduct({
	id,
	title,
	price,
	rating,
	description,
	category,
	image,
	hasPrime,
}) {
	const dispatch = useDispatch();

	const addItemToBasket = (e) => {
		e.preventDefault();

		const product = {
			id,
			title,
			price,
			rating,
			description,
			category,
			image,
			hasPrime,
		};

		dispatch(addToBasket(product));
	};

	const removeItemFromBasket = (e) => {
		e.preventDefault();

		dispatch(removeFromBasket(id));
	};

	return (
		<div className="grid grid-cols-5">
			<Image
				src={image}
				alt={title}
				width={200}
				height={200}
				objectFit="contain"
			/>

			<div className="col-span-3 mx-5">
				<p>{title}</p>
				<div className="flex">
					{Array(rating)
						.fill()
						.map((_, index) => {
							return <StarIcon key={index} className="h-5 text-yellow-500" />;
						})}
				</div>
				<p className="text-xs my-2 line-clamp-3">{description}</p>
				<Currency quantity={price} currency="EUR" />
				{hasPrime && (
					<div className="flex items-center space-x-2">
						<img
							loading="lazy"
							className="w-12"
							src="https://links.papareact.com/fdw"
							alt="prime"
						/>
						<p className="text-xs text-gray-500">FREE Next-day Delivery</p>
					</div>
				)}
			</div>
			<div className="flex flex-col space-y-2 my-auto justify-self-end">
				<button onClick={addItemToBasket} className="button">
					Add to Basket
				</button>
				<button onClick={removeItemFromBasket} className="button">
					Remove from Basket
				</button>
			</div>
		</div>
	);
}

export default CheckoutProduct;
