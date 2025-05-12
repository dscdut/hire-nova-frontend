"use client"

import { useState, useMemo } from "react"
import { ChevronDown, Search, Filter, Plus } from "lucide-react"
import AddJobModal from "./Modal/AddJobModal"

export default function JobBoard() {
const [searchTerm, setSearchTerm] = useState("")
const [location, setLocation] = useState("All Locations")
const [status, setStatus] = useState("All Statuses")
const [showLocationDropdown, setShowLocationDropdown] = useState(false)
const [showStatusDropdown, setShowStatusDropdown] = useState(false)
const [showModal, setShowModal] = useState(false)

const locations = ["All Locations", "Remote", "New York", "San Francisco", "London", "Tokyo"]
const statuses = ["All Statuses", "To Do", "In Progress", "Done", "Closed"]

const jobPositions = [
{
category: "Technology",
jobs: [
{
title: "Senior React Developer",
description: "We are seeking an experienced React developer to build cutting-edge web applications with a focus on performance and user experience.",
status: "To Do",
location: "Remote",
openRoles: 2,
},
{
title: "Cloud Infrastructure Engineer",
description: "Design and implement scalable cloud infrastructure solutions using modern DevOps practices.",
status: "In Progress",
location: "San Francisco",
openRoles: 1,
}
]
},
{
category: "Operations",
jobs: [
{
title: "Project Manager",
description: "Coordinate cross-functional teams and manage complex project timelines and deliverables.",
status: "Done",
location: "New York",
openRoles: 1,
},
{
title: "Business Analyst",
description: "Analyze business processes and provide strategic insights to drive operational efficiency.",
status: "Open",
location: "London",
openRoles: 1,
}
]
}
]

// Filtered jobs with multiple criteria
const filteredJobs = useMemo(() => {
return jobPositions.map(category => ({
...category,
jobs: category.jobs.filter(job =>
(searchTerm === "" ||
job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
job.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
(location === "All Locations" || job.location === location) &&
(status === "All Statuses" || job.status === status)
)
})).filter(category => category.jobs.length > 0)
}, [searchTerm, location, status])

// Dropdown component to reduce repetition
const Dropdown = ({
options,
selectedValue,
onSelect,
showDropdown,
toggleDropdown,
placeholder
}) => (
<div className="relative">
  <button
    className="px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    onClick={() => toggleDropdown(!showDropdown)}
  >
    {selectedValue} <ChevronDown size={16} />
  </button>

  {showDropdown && (
    <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
      {options.map((option) => (
        <div
          key={option}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            onSelect(option)
            toggleDropdown(false)
          }}
        >
          {option}
        </div>
      ))}
    </div>
  )}
</div>
)

// Status color mapping
const getStatusColor = (status) => {
switch (status) {
case 'To Do': return 'bg-blue-100 text-blue-800'
case 'In Progress': return 'bg-yellow-100 text-yellow-800'
case 'Done': return 'bg-green-100 text-green-800'
case 'Closed': return 'bg-red-100 text-red-800'
default: return 'bg-gray-100 text-gray-800'
}
}

return (
<div className="min-h-screen bg-gray-50">
  {/* Header with image */}
  <div className="relative w-full h-64 bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
      <h1 className="text-3xl font-bold mb-4">Job Opportunities</h1>
      <p className="text-lg max-w-2xl">Explore exciting careers and find your next professional challenge.</p>
    </div>
  </div>

  {/* Search and Filter Section */}
  <div className="container mx-auto -mt-12 px-4">
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search Input */}
          <div className="relative flex-grow min-w-[250px]">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>

          {/* Location Dropdown */}
          <Dropdown
            options={locations}
            selectedValue={location}
            onSelect={setLocation}
            showDropdown={showLocationDropdown}
            toggleDropdown={setShowLocationDropdown}
          />

          {/* Status Dropdown */}
          <Dropdown
            options={statuses}
            selectedValue={status}
            onSelect={setStatus}
            showDropdown={showStatusDropdown}
            toggleDropdown={setShowStatusDropdown}
          />
        </div>

        {/* Add New Job Button */}
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Plus size={18} /> Add New Job
          </button>

          {showModal && (
            <AddJobModal onClose={() => setShowModal(false)} />
          )}
        </div>
      </div>
    </div>
  </div>

  {/* Job Listings */}
  <div className="container mx-auto p-6">
    {filteredJobs.length === 0 ? (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <Filter className="mx-auto mb-4 text-gray-400" size={48} />
        <p className="text-xl text-gray-600">No jobs match your current filters</p>
      </div>
    ) : (
      filteredJobs.map((category, index) => (
        <div key={index} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{category.category}</h2>
            <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
              {category.jobs.length} Open Role{category.jobs.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Job Cards */}
          {category.jobs.map((job, jobIndex) => (
            <div
              key={jobIndex}
              className="bg-white border border-gray-200 rounded-lg p-6 mb-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{job.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <span className="text-sm">{job.location}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className={`text-sm px-2 py-1 rounded ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {job.openRoles} Open Position{job.openRoles !== 1 ? 's' : ''}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{job.description}</p>
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ))
    )}
  </div>
</div>
)
}