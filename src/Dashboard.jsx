import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  Handshake, 
  Download, 
  Filter, 
  Search, 
  Eye,
  BarChart3,
  PieChart,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  FileText,
  ChevronDown
} from 'lucide-react';

// Mock data for demonstration
const mockRegistrations = [
  {
    id: 1,
    name: "John Smith",
    organization: "Tech Bank Ltd",
    email: "john@techbank.com",
    mobile: "+91-9876543210",
    category: "Financial Institution",
    country: "India",
    city: "Mumbai",
    institutionType: "Bank",
    interestAreas: ["Payments", "Blockchain", "AI"],
    collaborationGoals: ["Tech Adoption", "Startup Engagement"],
    registrationDate: "2025-01-15",
    status: "Active"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    organization: "PayFlow Innovations",
    email: "sarah@payflow.com",
    mobile: "+91-8765432109",
    category: "Fintech Startup",
    country: "India",
    city: "Bengaluru",
    startupStage: "Growth",
    fundingStage: "Series A",
    focusArea: "Payments",
    registrationDate: "2025-01-20",
    status: "Pending"
  },
  {
    id: 3,
    name: "Michael Chen",
    organization: "InvestTech Ventures",
    email: "michael@investtech.com",
    mobile: "+91-7654321098",
    category: "Investor",
    country: "Singapore",
    city: "Singapore",
    investorType: "VC",
    fundSize: "50M-100M",
    preferredStage: "Growth",
    registrationDate: "2025-01-18",
    status: "Active"
  },
  {
    id: 4,
    name: "Dr. Priya Sharma",
    organization: "FinTech Research Institute",
    email: "priya@finresearch.org",
    mobile: "+91-6543210987",
    category: "Ecosystem Partner",
    country: "India",
    city: "Delhi",
    organizationType: "University",
    interestAreas: ["Innovation Policy", "Research"],
    registrationDate: "2025-01-22",
    status: "Active"
  }
];

const Dashboard = () => {
  const [registrations, setRegistrations] = useState(mockRegistrations);
  const [filteredData, setFilteredData] = useState(mockRegistrations);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and search logic
  useEffect(() => {
    let filtered = registrations;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(reg => reg.category === selectedCategory);
    }

    if (selectedCountry !== "All") {
      filtered = filtered.filter(reg => reg.country === selectedCountry);
    }

    if (searchTerm) {
      filtered = filtered.filter(reg => 
        reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [selectedCategory, selectedCountry, searchTerm, registrations]);

  // Calculate metrics
  const metrics = {
    total: registrations.length,
    byCategory: {
      "Financial Institution": registrations.filter(r => r.category === "Financial Institution").length,
      "Fintech Startup": registrations.filter(r => r.category === "Fintech Startup").length,
      "Investor": registrations.filter(r => r.category === "Investor").length,
      "Ecosystem Partner": registrations.filter(r => r.category === "Ecosystem Partner").length,
    },
    byCountry: registrations.reduce((acc, reg) => {
      acc[reg.country] = (acc[reg.country] || 0) + 1;
      return acc;
    }, {})
  };

  const categories = ["All", "Financial Institution", "Fintech Startup", "Investor", "Ecosystem Partner"];
  const countries = ["All", ...new Set(registrations.map(r => r.country))];

  // Export functions
  const exportToCSV = () => {
    const headers = ["Name", "Organization", "Email", "Mobile", "Category", "Country", "City", "Registration Date", "Status"];
    const csvData = [headers, ...filteredData.map(reg => [
      reg.name, reg.organization, reg.email, reg.mobile, reg.category, reg.country, reg.city, reg.registrationDate, reg.status
    ])];
    
    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "finnovation_registrations.csv";
    link.click();
  };

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Finnovation Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage and track registrations effectively</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={exportToCSV}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Registrations</h3>
                <p className="text-3xl font-bold text-gray-900">{metrics.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Financial Institutions</h3>
                <p className="text-3xl font-bold text-gray-900">{metrics.byCategory["Financial Institution"]}</p>
              </div>
              <Building2 className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Fintech Startups</h3>
                <p className="text-3xl font-bold text-gray-900">{metrics.byCategory["Fintech Startup"]}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Investors</h3>
                <p className="text-3xl font-bold text-gray-900">{metrics.byCategory["Investor"]}</p>
              </div>
              <Handshake className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, organization, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Showing {filteredData.length} of {registrations.length} registrations</span>
            </div>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((registration) => (
                  <tr key={registration.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{registration.name}</div>
                        <div className="text-sm text-gray-500">{registration.email}</div>
                        <div className="text-sm text-gray-500">{registration.mobile}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{registration.organization}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        registration.category === 'Financial Institution' ? 'bg-blue-100 text-blue-800' :
                        registration.category === 'Fintech Startup' ? 'bg-purple-100 text-purple-800' :
                        registration.category === 'Investor' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {registration.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {registration.city}, {registration.country}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(registration.registrationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        registration.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {registration.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedRegistration(registration)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded text-sm ${
                      currentPage === page ? 'bg-blue-500 text-white' : 'border-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedRegistration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Registration Details</h2>
                  <button
                    onClick={() => setSelectedRegistration(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Name:</span> {selectedRegistration.name}</p>
                        <p><span className="font-medium">Email:</span> {selectedRegistration.email}</p>
                        <p><span className="font-medium">Mobile:</span> {selectedRegistration.mobile}</p>
                        <p><span className="font-medium">Location:</span> {selectedRegistration.city}, {selectedRegistration.country}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Organization Details</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Organization:</span> {selectedRegistration.organization}</p>
                        <p><span className="font-medium">Category:</span> {selectedRegistration.category}</p>
                        <p><span className="font-medium">Registration Date:</span> {new Date(selectedRegistration.registrationDate).toLocaleDateString()}</p>
                        <p><span className="font-medium">Status:</span> 
                          <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedRegistration.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {selectedRegistration.status}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category-specific details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Category-Specific Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {selectedRegistration.category === 'Financial Institution' && (
                        <div className="space-y-2">
                          <p><span className="font-medium">Institution Type:</span> {selectedRegistration.institutionType}</p>
                          <p><span className="font-medium">Interest Areas:</span> {selectedRegistration.interestAreas?.join(', ')}</p>
                          <p><span className="font-medium">Collaboration Goals:</span> {selectedRegistration.collaborationGoals?.join(', ')}</p>
                        </div>
                      )}
                      {selectedRegistration.category === 'Fintech Startup' && (
                        <div className="space-y-2">
                          <p><span className="font-medium">Startup Stage:</span> {selectedRegistration.startupStage}</p>
                          <p><span className="font-medium">Funding Stage:</span> {selectedRegistration.fundingStage}</p>
                          <p><span className="font-medium">Focus Area:</span> {selectedRegistration.focusArea}</p>
                        </div>
                      )}
                      {selectedRegistration.category === 'Investor' && (
                        <div className="space-y-2">
                          <p><span className="font-medium">Investor Type:</span> {selectedRegistration.investorType}</p>
                          <p><span className="font-medium">Fund Size:</span> {selectedRegistration.fundSize}</p>
                          <p><span className="font-medium">Preferred Stage:</span> {selectedRegistration.preferredStage}</p>
                        </div>
                      )}
                      {selectedRegistration.category === 'Ecosystem Partner' && (
                        <div className="space-y-2">
                          <p><span className="font-medium">Organization Type:</span> {selectedRegistration.organizationType}</p>
                          <p><span className="font-medium">Interest Areas:</span> {selectedRegistration.interestAreas?.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setSelectedRegistration(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Close
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;