import { useLoaderData } from "react-router-dom";

const ViewApplicant = () => {
  const applicant = useLoaderData();
  console.log(applicant);

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
            </tr>
          </thead>
          <tbody>
            {applicant.map((job, index) => (
              <tr className="hover:bg-base-300">
                <th>{index + 1}</th>
                <td>{job.applicant_email}</td>
                <td>{job.github}</td>
                <td>{job.linkedin}</td>
                <td>{job.resume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplicant;
