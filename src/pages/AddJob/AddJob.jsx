import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const jobTypes = [
    { value: "hybrid", label: "Hybrid" },
    { value: "remote", label: "Remote" },
    { value: "contractual", label: "Contractual" },
    { value: "intern", label: "Intern" },
    { value: "part-time", label: "Part-time" },
    { value: "full-time", label: "Full-time" },
  ];
  const jobCategory = [
    { value: "engineering", label: "Engineering" },
    { value: "marketing", label: "Marketing" },
    { value: "finance", label: "Finance" },
    { value: "teaching", label: "Teaching" },
    { value: "management", label: "Management" },
    { value: "design", label: "Design" },
    { value: "data-science", label: "Data-science" },
  ];

  const handleAddJob = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());

    const { min, max, currency, ...newJob } = initialData;
    newJob.salaryRange = { min, max, currency };
    newJob.requirements = newJob.requirements.split(",");
    newJob.responsibilities = newJob.responsibilities.split(",");

    fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire("Success!");
          // formData.reset();
          navigate("/myPostedJobs");
        }
      });
  };

  return (
    <section className="max-w-5xl p-6 mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-2xl text-center font-semibold text-gray-700 mb-6">
        Add a Job
      </h2>

      <form onSubmit={handleAddJob}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          {/* title */}
          <div>
            <label className="text-gray-700 ">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Job title"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
            />
          </div>
          {/* location */}
          <div>
            <label className="text-gray-700 ">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter job location"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
            />
          </div>
          {/* company */}
          <div>
            <label className="text-gray-700 ">Company Name</label>
            <input
              type="text"
              placeholder="Company name"
              name="company"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
            />
          </div>
          {/* company logo */}
          <div>
            <label className="text-gray-700 ">Company Logo</label>
            <input
              type="text"
              name="company_logo"
              placeholder="Company logo URL"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
            />
          </div>
          {/* job type selector */}
          <div>
            <label className="text-gray-700 ">Job Type</label>
            <select
              name="jobType"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            >
              <option value="" disabled>
                -- Select a Job Type --
              </option>
              {jobTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          {/* job category selector */}
          <div>
            <label className="text-gray-700">Job Category</label>
            <select
              name="category"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            >
              <option value="" disabled>
                -- Select Job Category --
              </option>
              {jobCategory.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          {/* job requirements */}
          <div>
            <label className="text-gray-700 ">Job Requirements</label>
            <input
              type="text"
              name="requirements"
              placeholder="Job requirements: ',' comma separated"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
            />
          </div>
          {/* job responsibilities */}
          <div>
            <label className="text-gray-700 ">Job Responsibilities</label>
            <input
              type="text"
              name="responsibilities"
              placeholder="Job responsibilities: ',' comma separated"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
            />
          </div>
          {/* hr_name */}
          <div>
            <label className="text-gray-700 ">HR Name</label>
            <input
              type="text"
              name="hr_name"
              placeholder="HR name"
              defaultValue={user?.displayName || ""}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
            />
          </div>
          {/* hr_email */}
          <div>
            <label className="text-gray-700 ">HR Email</label>
            <input
              type="email"
              name="hr_email"
              placeholder="HR email"
              defaultValue={user?.email}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
            />
          </div>
          {/* application deadline */}
          <div>
            <label className="text-gray-700 ">Application Deadline</label>
            <input
              type="date"
              name="applicationDeadline"
              placeholder="Deadline"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
            />
          </div>
          {/* salary range */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Salary Range</span>
              </label>
              <input
                type="number"
                name="min"
                placeholder="Min"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                required
              />
            </div>
            <div className="form-control">
              <input
                type="number"
                name="max"
                placeholder="Max "
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                required
              />
            </div>
            <div className="">
              <select
                defaultValue="Currency"
                name="currency"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              >
                <option disabled>Currency</option>
                <option>bdt</option>
                <option>usd</option>
                <option>inr</option>
              </select>
            </div>
          </div>
          {/* job description */}
          <div className="sm:col-span-2">
            <label className="text-gray-700">Job Description</label>
            <textarea
              rows="5"
              name="description"
              placeholder="Enter job description"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
            Add Job
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddJob;
