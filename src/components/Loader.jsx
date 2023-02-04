import ReactDOM from "react-dom";

export const Loader = () => {
	return ReactDOM.createPortal(
		<div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
			<div className="flex space-x-2 animate-ping">
				<div className="w-3 h-3 bg-blue-500 rounded-full" />
				<div className="w-3 h-3 bg-blue-600 rounded-full" />
				<div className="w-3 h-3 bg-blue-700 rounded-full" />
			</div>
		</div>
	, document.getElementById('loader'));
};