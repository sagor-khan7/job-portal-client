import { Link, useLoaderData } from "react-router-dom";
import {
  FaMoneyBill,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaEnvelope,
  FaUser,
  FaBuilding,
  FaTag,
  FaInfoCircle,
} from "react-icons/fa";

const JobDetails = () => {
  const {
    _id,
    title,
    location,
    jobType,
    category,
    applicationDeadline,
    salaryRange,
    description,
    company,
    requirements,
    responsibilities,
    status,
    hr_email,
    hr_name,
    company_logo,
  } = useLoaderData();

  // Format the application deadline to a more readable date string
  const formattedDeadline = new Date(applicationDeadline).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Header section with logo, title, and company */}
          <div className="flex items-center mb-6 border-b border-gray-200 pb-6">
            <div className="flex-shrink-0 mr-6">
              {/* Fallback for broken image or no logo */}
              {company_logo ? (
                <img
                  className="h-20 w-20 rounded-full object-contain ring-2 ring-gray-300"
                  src={company_logo}
                  alt={`${company} logo`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/80x80/d1d5db/4b5563?text=Logo";
                  }}
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  No Logo
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-1">
                {title}
              </h1>
              <div className="flex items-center text-xl text-gray-600">
                <FaBuilding className="mr-2 text-gray-400" />
                <span>{company}</span>
              </div>
            </div>
          </div>

          {/* Key details section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-700 mb-8">
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-gray-500 mr-3 text-lg" />
              <span>
                <span className="font-semibold">Location:</span> {location}
              </span>
            </div>
            <div className="flex items-center">
              <FaClock className="text-gray-500 mr-3 text-lg" />
              <span>
                <span className="font-semibold">Job Type:</span> {jobType}
              </span>
            </div>
            <div className="flex items-center">
              <FaMoneyBill className="text-gray-500 mr-3 text-lg" />
              <span>
                <span className="font-semibold">Salary:</span> {salaryRange.min}{" "}
                - {salaryRange.max} {salaryRange.currency.toUpperCase()}{" "}
                (monthly)
              </span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="text-gray-500 mr-3 text-lg" />
              <span>
                <span className="font-semibold">Deadline:</span>{" "}
                {formattedDeadline}
              </span>
            </div>
            <div className="flex items-center">
              <FaTag className="text-gray-500 mr-3 text-lg" />
              <span>
                <span className="font-semibold">Category:</span> {category}
              </span>
            </div>
            <div className="flex items-center">
              <FaInfoCircle className="text-gray-500 mr-3 text-lg" />
              <span>
                <span className="font-semibold">Status:</span> {status}
              </span>
            </div>
          </div>

          {/* Job Description section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>

          {/* Responsibilities section (conditionally rendered) */}
          {responsibilities && responsibilities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Responsibilities
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                {responsibilities.map((res, index) => (
                  <li key={index}>{res}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements section (conditionally rendered) */}
          {requirements && requirements.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Requirements
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                {requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* HR Contact section and Apply button */}
          <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                HR Contact Information
              </h2>
              <div className="flex items-center text-gray-700 mb-2">
                <FaUser className="text-gray-500 mr-3" />
                <span>
                  <span className="font-semibold">Contact Person:</span>{" "}
                  {hr_name}
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <FaEnvelope className="text-gray-500 mr-3" />
                <span>
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href={`mailto:${hr_email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {hr_email}
                  </a>
                </span>
              </div>
            </div>
            <Link to={`/jobApply/${_id}`}>
              <button className="btn btn-primary w-full md:w-auto text-lg font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
                Apply Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
