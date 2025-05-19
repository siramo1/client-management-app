import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const ClientForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    noteNumber: '',
    size: [{
      'ወራዲ': '',
      'ቁመት': '',
      'ማዓንጣ': '',
      'እፍልቢ': '',
      'ሞንኮብ': '',
      'ኢድ': '',
    }],
    whatType: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchClient = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/clients/${id}`);
        const clientData = response.data;
        
        // Convert numerical fields to strings for form inputs
        const processedData = {
          ...clientData,
          phoneNumber: clientData.phoneNumber?.toString() || '',
          noteNumber: clientData.noteNumber?.toString() || '',
          size: [{
            'ወራዲ': clientData.size[0]?.['ወራዲ']?.toString() || '',
            'ቁመት': clientData.size[0]?.['ቁመት']?.toString() || '',
            'ማዓንጣ': clientData.size[0]?.['ማዓንጣ']?.toString() || '',
            'እፍልቢ': clientData.size[0]?.['እፍልቢ']?.toString() || '',
            'ሞንኮብ': clientData.size[0]?.['ሞንኮብ']?.toString() || '',
            'ኢድ': clientData.size[0]?.['ኢድ']?.toString() || '',
          }]
        };

        setFormData(processedData);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load client data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClient();
  }, [id, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      size: [{
        ...prev.size[0],
        [field]: value
      }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        phoneNumber: formData.phoneNumber ? Number(formData.phoneNumber) : undefined,
        noteNumber: formData.noteNumber ? Number(formData.noteNumber) : undefined,
        size: [{
          'ወራዲ': formData.size[0]['ወራዲ'] ? Number(formData.size[0]['ወራዲ']) : undefined,
          'ቁመት': formData.size[0]['ቁመት'] ? Number(formData.size[0]['ቁመት']) : undefined,
          'ማዓንጣ': formData.size[0]['ማዓንጣ'] ? Number(formData.size[0]['ማዓንጣ']) : undefined,
          'እፍልቢ': formData.size[0]['እፍልቢ'] ? Number(formData.size[0]['እፍልቢ']) : undefined,
          'ሞንኮብ': formData.size[0]['ሞንኮብ'] ? Number(formData.size[0]['ሞንኮብ']) : undefined,
          'ኢድ': formData.size[0]['ኢድ'] ? Number(formData.size[0]['ኢድ']) : undefined,
        }],
        whatType: formData.whatType || undefined
      };

      if (isEditMode) {
        await axios.put(`${API_BASE_URL}/api/clients/${id}`, payload);
        navigate('/', { state: { success: 'Client updated successfully!' } });
      } else {
        await axios.post(`${API_BASE_URL}/api/clients`, payload);
        navigate('/', { state: { success: 'Client added successfully!' } });
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-emerald-100 p-4 flex items-center justify-center">
        <div className="text-2xl font-bold text-emerald-800">
          Loading client data...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-center text-amber-50 text-3xl p-3 sm:p-5 ml-3 sm:ml-0 pl-8 pr-8 w-fit bg-gradient-to-r from-green-700 to-emerald-400 border-4 border-orange-600 rounded-2xl">
            {isEditMode ? 'Edit Client' : 'Add New Client'}
          </h1>
          <div className="w-24"></div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white p-8 rounded-2xl shadow-lg border-4 border-orange-500">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Basic Info */}
              <div>
                <h2 className="text-xl font-bold text-emerald-800 border-b-2 border-emerald-400 pb-2 mb-4">
                  Basic Information
                </h2>
                
                <div className="mb-4">
                  <label className="block text-emerald-800 font-bold mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-emerald-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-emerald-800 font-bold mb-2">Phone Number</label>
                  <input
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-emerald-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-emerald-800 font-bold mb-2">Note Number</label>
                  <input
                    type="number"
                    name="noteNumber"
                    value={formData.noteNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-emerald-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-emerald-800 font-bold mb-2">Client Type</label>
                  <input
                    type="text"
                    name="whatType"
                    value={formData.whatType}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-emerald-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              
              {/* Right Column - Size Measurements */}
              <div>
                <h2 className="text-xl font-bold text-emerald-800 border-b-2 border-emerald-400 pb-2 mb-4">
                  Size Measurements
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(formData.size[0]).map(([field, value]) => (
                    <div key={field} className="mb-4">
                      <label className="block text-emerald-800 font-bold mb-2">{field}</label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleSizeChange(field, e.target.value)}
                        className="w-full p-3 border-2 border-emerald-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditMode ? 'Updating...' : 'Adding...'}
                  </span>
                ) : (
                  isEditMode ? 'Update Client' : 'Add Client'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;