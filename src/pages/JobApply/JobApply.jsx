import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const JobApply = () => {
  const { id } = useParams();
  const { user } = useAuth();
  //   console.log(id, user);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const linkedin = form.linkedin.value;
    const github = form.github.value;
    const resume = form.resume.value;

    const application = {
      job_id: id,
      applicant_email: user.email,
      linkedin,
      github,
      resume,
    };

    fetch("http://localhost:3000/job-application", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(application),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire("Success!");
          form.reset();
        }
      });
  };

  return (
    <div className="hero mt-20">
      <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="fieldset">
            <label className="label">LinkedIn URL</label>
            <input
              type="url"
              name="linkedin"
              className="input"
              placeholder="enter linkedin url"
            />
            <label className="label">Github URL</label>
            <input
              type="url"
              name="github"
              className="input"
              placeholder="enter github url"
            />
            <label className="label">Resume</label>
            <input
              type="url"
              name="resume"
              className="input"
              placeholder="enter resume url"
            />
            <button className="btn btn-neutral mt-4">Apply</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApply;
