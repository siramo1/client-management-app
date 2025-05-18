import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/api/clients/${id}`);
        setClient(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to fetch client details');
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setIsDeleting(true);
      try {
        await axios.delete(`http://localhost:5050/api/clients/${id}`);
        navigate('/', { state: { success: 'Client deleted successfully!' } });
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to delete client');
        setIsDeleting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-emerald-100 flex items-center justify-center">
        <div className="text-2xl text-emerald-800">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-emerald-100 flex items-center justify-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
          <p>{error}</p>
          <Link 
            to="/" 
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-emerald-100 flex items-center justify-center">
        <div className="text-2xl text-emerald-800">Client not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-emerald-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link 
            to="/" 
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition duration-300"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
          <h1 className="text-center text-amber-50 text-3xl p-5 pl-8 pr-8 w-fit bg-gradient-to-r from-green-700 to-emerald-400 border-4 border-orange-600 rounded-2xl">
            Client Details
          </h1>
          <div className="flex space-x-2">
            <Link 
              to={`/edit-client/${client._id}`}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition duration-300"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition duration-300 disabled:opacity-50"
            >
              {isDeleting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </span>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border-4 border-orange-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-emerald-800 border-b-2 border-emerald-400 pb-2 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-emerald-600">Name/ስም</p>
                  <p className="text-lg">{client.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-600">Phone Number/ቁ-ሞባይል</p>
                  <p className="text-lg">{client.phoneNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-600">Note Number/ቁ-መዝገብ</p>
                  <p className="text-lg">{client.noteNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-600">Type/ዓይነት</p>
                  <p className="text-lg">{client.whatType || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-emerald-800 border-b-2 border-emerald-400 pb-2 mb-4">Size Measurements</h2>
              <div className="grid grid-cols-2 gap-4">
                {client.size && client.size[0] && Object.entries(client.size[0]).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm font-semibold text-emerald-600">{key}</p>
                    <p className="text-lg">{value || 'N/A'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-emerald-800 border-b-2 border-emerald-400 pb-2 mb-4">Order Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {client.ordersImages && client.ordersImages[0] && 
                Object.entries(client.ordersImages[0])
                  .filter(([, value]) => value) // Filter out empty image URLs
                  .map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-sm font-semibold text-emerald-600 mb-2">
                        {key.charAt(0).toUpperCase() + key.slice(1)} Image
                      </p>
                      <img 
                        src={value} 
                        alt={`Order ${key}`} 
                        className="h-40 w-auto object-contain border border-gray-300 rounded mx-auto"
                      />
                    </div>
                  ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;