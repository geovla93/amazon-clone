import Header from "./Header.js/Header";

function Layout({ children }) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}

export default Layout;
