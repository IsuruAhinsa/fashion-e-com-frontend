import { useSelector } from "react-redux";

const useAuth = () => {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	return isLoggedIn;
};

export default useAuth;
