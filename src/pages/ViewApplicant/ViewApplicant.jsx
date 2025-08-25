import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const ViewApplicant = () => {
  const applicant = useLoaderData();

  const handleUpdateStatus = (e, _id) => {
    console.log(e.target.value, _id);
    const data = {
      status: e.target.value,
    };

    fetch(`http://localhost:3000/job-application/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Status Updated Successfully");
        }
      });
  };

  return (
    <div className="container mx-auto">
      <h3 className="text-3xl">
        View Applicant for job: {applicant.length} Applicant
      </h3>
      {/* data table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Email</th>
              <th>Github</th>
              <th>Linkedin</th>
              <th>Resume</th>
              <th>Update status</th>
            </tr>
          </thead>
          <tbody>
            {applicant.map((job, index) => (
              <tr key={job._id} className="hover:bg-base-300">
                <th>{index + 1}</th>
                <td>{job.applicant_email}</td>
                <td>{job.github}</td>
                <td>{job.linkedin}</td>
                <td>{job.resume}</td>
                <td>
                  <div>
                    <select
                      onChange={(e) => handleUpdateStatus(e, job._id)}
                      defaultValue={job.status || "Change status"}
                      className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    >
                      <option disabled>Change status</option>
                      <option>Under review</option>
                      <option>Set interview</option>
                      <option>Hired</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplicant;
