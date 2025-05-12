"use client"

import { useState, useMemo } from "react"
import { ChevronDown, Search, Bell, Filter, ChevronRight } from "lucide-react"


export default function CandidatesDashboard() {
  const [activeTab, setActiveTab] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "appliedDate", direction: "desc" })

  const candidates = [
    {
      id: 1,
      name: "Nguyen Van A",
      role: "Frontend Developer",
      department: "Engineering",
      employmentType: "Full-time",
      workType: "Onsite",
      appliedDate: "2025-04-20",
      attachments: ["CV.pdf"],
      status: "In-Review",
      score: 85
    },
    {
      id: 2,
      name: "Tran Thi B",
      role: "UI/UX Designer",
      department: "Design",
      employmentType: "Contract",
      workType: "Remote",
      appliedDate: "2025-04-18",
      attachments: ["Portfolio.pdf", "CV.pdf"],
      status: "Interview",
      score: 90
    },
    {
      id: 3,
      name: "Le Van C",
      role: "Backend Developer",
      department: "Engineering",
      employmentType: "Full-time",
      workType: "Hybrid",
      appliedDate: "2025-04-15",
      attachments: ["CV.pdf"],
      status: "Hired",
      score: 78
    },
    {
      id: 4,
      name: "Pham Thi D",
      role: "Data Analyst",
      department: "Business Intelligence",
      employmentType: "Internship",
      workType: "Remote",
      appliedDate: "2025-04-22",
      attachments: ["Resume.pdf"],
      status: "Rejected",
      score: 60
    }
  ]

  const filteredCandidates = useMemo(() => {
    let result = [...candidates];
    if (activeTab !== "All") {
      result = result.filter(candidate =>
        activeTab === "Review"
          ? candidate.status === "In-Review"
          : candidate.status === activeTab
      );
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(candidate =>
        candidate.name.toLowerCase().includes(query) ||
        candidate.role.toLowerCase().includes(query) ||
        candidate.department.toLowerCase().includes(query)
      );
    }
    return result;
  }, [candidates, activeTab, searchQuery]);

  const sortedCandidates = useMemo(() => {
    const sortableItems = [...filteredCandidates];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredCandidates, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Hired":
        return "bg-indigo-100 text-indigo-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Interview":
        return "bg-lime-100 text-lime-700";
      case "In-Review":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDateRange = () => {
    if (sortedCandidates.length === 0) return "No date range";
    const dates = sortedCandidates.map(c => new Date(c.appliedDate));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    return `${minDate.getDate()} ${minDate.toLocaleString('default', { month: 'short' })} - ${maxDate.getDate()} ${maxDate.toLocaleString('default', { month: 'short' })}, ${maxDate.getFullYear()}`;
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-white p-4 shadow-sm flex justify-between items-center">
          <h1 className="text-xl font-medium text-gray-800">Candidates</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} className="text-gray-500" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
                AS
              </div>
              <div>
                <p className="text-sm font-medium">Andrew Sebastian</p>
                <p className="text-xs text-gray-500">Lead HR</p>
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates, names, roles, etc..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 bg-white hover:bg-gray-50">
                <span>Filter</span>
                <Filter size={16} />
              </button>

              <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 bg-white hover:bg-gray-50">
                <span>{getDateRange()}</span>
                <ChevronDown size={16} />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort By:</span>
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 bg-white hover:bg-gray-50"
                  onClick={() => requestSort("appliedDate")}
                >
                  <span>{sortConfig.direction === 'asc' ? 'Oldest' : 'Latest'}</span>
                  <ChevronDown size={16} className={`transition-transform ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <button
                className="px-4 py-2 bg-lime-400 text-gray-800 rounded-md font-medium hover:bg-lime-500 transition-colors"
                onClick={() => console.log("Add new candidate")}
              >
                Add
              </button>
            </div>
          </div>

          <div className="bg-white rounded-md shadow-sm">
            <div className="flex border-b overflow-x-auto">
              {["All", "In-Review", "Review", "Hired", "Rejected"].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === tab ? "text-gray-800 border-b-2 border-gray-800" : "text-gray-500 hover:text-gray-800"
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab} {tab !== "All" && `(${candidates.filter(c => tab === "Review" ? c.status === "In-Review" : c.status === tab).length})`}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    {[
                      { key: "name", label: "Name" },
                      { key: "role", label: "Applied Role" },
                      { key: "employmentType", label: "Employment Type" },
                      { key: "workType", label: "Work Type" },
                      { key: "appliedDate", label: "Applied Date" },
                      { key: "attachments", label: "Attachment" },
                      { key: "status", label: "Status" },
                      { key: "score", label: "Score(%)" },
                      { key: "", label: "" }
                    ].map((column) => (
                      <th
                        key={column.key || column.label}
                        className="px-4 py-3 text-left text-sm font-medium text-gray-600"
                      >
                        {column.key ? (
                          <button
                            className="flex items-center hover:text-gray-800"
                            onClick={() => requestSort(column.key)}
                          >
                            {column.label}
                            <ChevronDown
                              size={16}
                              className={`ml-1 transition-transform ${sortConfig.key === column.key && sortConfig.direction === 'asc' ? 'rotate-180' : ''
                                }`}
                            />
                          </button>
                        ) : (
                          column.label
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedCandidates.length > 0 ? (
                    sortedCandidates.map((candidate) => (
                      <tr key={candidate.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-gray-800">{candidate.name}</td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-gray-800">{candidate.role}</div>
                          <div className="text-xs text-gray-500">{candidate.department}</div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">{candidate.employmentType}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{candidate.workType}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{formatDate(candidate.appliedDate)}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {candidate.attachments.map((item, i) => (
                            <span key={i} className="mr-1 last:mr-0">{item}</span>
                          ))}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(candidate.status)}`}>
                            {candidate.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">{candidate.score}</td>
                        <td className="px-4 py-4 text-right">
                          <button className="text-gray-400 hover:text-gray-600">
                            <ChevronRight size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-4 py-6 text-center text-sm text-gray-500">
                        No candidates found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
