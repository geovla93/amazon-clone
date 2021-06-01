import { Provider } from "react-redux";
import { store } from "../store/store";
import "../styles/tailwind.css";

import Layout from "../components/Layout/Layout";

const MyApp = ({ Component, pageProps }) => {
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
};

export default MyApp;