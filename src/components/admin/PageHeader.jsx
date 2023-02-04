import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export function PageHeader({ title, btnTitle, link }) {
  return (
    <div className="flex items-center justify-between w-4/5 mx-auto">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
      </div>
      {btnTitle && (
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <Link
              to={link}
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <PlusCircleIcon
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
              />
              {btnTitle}
            </Link>
          </span>
        </div>
      )}
    </div>
  );
}
