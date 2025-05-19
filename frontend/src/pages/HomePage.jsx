import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL ;

function HomePage() {

    document.title = ("client-Managment");

    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchClients = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const apiUrl = `${API_BASE_URL}/api/clients`;
                console.log("Final API URL:", apiUrl); // Debug the final URL
                
                const response = await axios.get(apiUrl, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000 // 10 second timeout
                });

                // Handle response
                let clientsData = [];
                
                if (Array.isArray(response.data)) {
                    clientsData = response.data;
                } else if (response.data?.data) {
                    clientsData = response.data.data;
                } else if (response.data?.clients) {
                    clientsData = response.data.clients;
                } else {
                    throw new Error("Unexpected API response structure");
                }

                setClients(clientsData);
            } catch (error) {
                console.error("API Error:", error);
                setError(`Failed to load data from ${API_BASE_URL}. Please check: 
                1. Backend is running on Render
                2. CORS is configured
                3. Endpoint exists`);
                setClients([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClients();
    }, []);

    const filteredClients = clients.filter(client => 
        client?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-emerald-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mb-4"></div>
                    <p className="text-2xl text-emerald-700">Loading client data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-emerald-100 flex flex-col items-center justify-center p-6">
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                    <div className="text-red-500 text-xl font-bold mb-4">Error Loading Data</div>
                    <div className="text-gray-700 mb-6">{error}</div>
                    <div className="flex space-x-4">
                        <button 
                            onClick={() => window.location.reload()}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Try Again
                        </button>
                        <Link 
                            to="/" 
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded text-center"
                        >
                            Go Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-emerald-100 p-4">
            <header className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4 md:gap-10">
                <h1 className="text-center text-amber-50 text-3xl p-3 pl-8 pr-8 w-fit bg-gradient-to-r from-green-700 to-emerald-400 border-4 border-orange-600 rounded-2xl sm:text-4xl">
                    All Clients
                </h1>
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="w-full p-3 pl-10 rounded-full border-2 border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg
                        className="absolute left-3 top-3.5 h-5 w-5 text-emerald-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <Link 
                    to="/AddClient" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 pl-8 pr-8 rounded-full flex items-center transition duration-300 transform hover:scale-105"
                >
                    <span className="text-2xl">+</span>
                    <span className="ml-2 text-xl md:text-2xl">Add Client</span>
                </Link>
            </header>
            
            <div className="flex justify-center items-center pt-5 pb-10">  
                <div className="w-full max-w-6xl overflow-x-auto">
                    <table className="bg-cyan-50 rounded-2xl border-[6px] border-orange-500 text-emerald-800 sm:text-xl w-full shadow-lg">
                        <thead>
                            <tr className="bg-emerald-600 text-amber-50">
                                <th className="border-4 border-orange-500 p-3">Name/ስም</th>
                                <th className="border-4 border-orange-500 p-3">Phone/ቁ-ሞባይል</th>
                                <th className="border-4 border-orange-500 p-3">Note Number/ቁ-መዝገብ</th>
                                <th className="border-4 border-orange-500 p-3">Actions/ምርኣይ</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {filteredClients.length > 0 ? (
                                filteredClients.map(client => (
                                    <tr key={client._id || client.id} className="hover:bg-cyan-100 transition-colors">
                                        <td className="border-4 border-orange-500 p-3">{client.name || 'N/A'}</td>
                                        <td className="border-4 border-orange-500 p-3">{client.phoneNumber || 'N/A'}</td>
                                        <td className="border-4 border-orange-500 p-3">{client.noteNumber || 'N/A'}</td>
                                        <td className="border-4 border-orange-500 p-3 space-x-2">
                                            {(client._id || client.id) && (
                                                <>
                                                    <Link 
                                                        to={`/client/${client._id || client.id}`}
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full text-sm inline-flex items-center transition duration-300"
                                                    >
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                        View
                                                    </Link>
                                                    <Link 
                                                        to={`/edit-client/${client._id || client.id}`}
                                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-full text-sm inline-flex items-center transition duration-300"
                                                    >
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Edit
                                                    </Link>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="border-4 border-orange-500 p-4 text-center">
                                        <div className="flex flex-col items-center justify-center py-8">
                                            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-xl text-gray-600">
                                                {searchTerm 
                                                    ? "No clients match your search criteria" 
                                                    : "No clients found in the system"}
                                            </p>
                                            {!searchTerm && (
                                                <Link 
                                                    to="/AddClient"
                                                    className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-full inline-flex items-center transition duration-300"
                                                >
                                                    <span className="text-xl mr-2">+</span>
                                                    Add Your First Client
                                                </Link>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default HomePage;