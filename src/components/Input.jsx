import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { Link} from 'react-router-dom'

const Input = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('https://64307b10d4518cfb0e50e555.mockapi.io/workflow').then(res => { setData(res.data) })
    }, []);
    let nameP = undefined;
    let dateP = undefined;
    let inputP = undefined;
    return (
        <div className="flex flex-col">
            <div className="my-1 overflow-x-auto sm:mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Input Type
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Created At
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map(person => (
                                    <tr key={person.name}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-0">

                                                    <Link className="text-sm font-medium text-gray-900" to="/workflow" state={[
                                                        person.name,
                                                        person.input_type.toUpperCase(),
                                                    ]}>{person.name}</Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{person.input_type.toUpperCase()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5
                                                font-semibold rounded-full bg-green-100 text-green-800"
                                            >
                                                {person.createdAt.slice(0, 10)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Input