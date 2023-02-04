import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Search = ({value, onChange}) => {
    return (
        <div className='py-3'>
            <div className="mt-1 relative flex items-center">
                <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder='Search products...'
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={value}
                    onChange={onChange}
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                    <MagnifyingGlassIcon className='w-5 mr-2 text-gray-500 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default Search