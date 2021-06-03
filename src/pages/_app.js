import { Provider } from "react-redux";
import { store } from "../store/store";
import { Provider as AuthProvider } from "next-auth/client";

import "../styles/tailwind.css";

import Layout from "../components/Layout/Layout";

const MyApp = ({ Component, pageProps }) => {
	return (
		<AuthProvider session={pageProps.session}>
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</AuthProvider>
	);
};

export default MyApp;
