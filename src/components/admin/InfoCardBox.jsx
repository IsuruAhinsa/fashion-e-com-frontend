import React from "react";
import { Link } from "react-router-dom";

const InfoCardBox = ({icon, to, count, title}) => {
  return (
    <div
    className="bg-purple-100 overflow-hidden shadow rounded-lg"
  >
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd>
              <div className="text-lg font-medium text-gray-900">
                {count}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div className="bg-gray-50 px-5 py-3">
      <div className="text-sm">
        <Link
          to={to}
          className="font-medium text-purple-700 hover:text-purple-90"
        >
          View all
        </Link>
      </div>
    </div>
  </div>
  );
};

export default InfoCardBox;
