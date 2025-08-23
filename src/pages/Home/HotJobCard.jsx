import React from "react";
import { Link } from "react-router-dom";

const HotJobCard = ({ job }) => {
  const {
    _id,
    title,
    company,
    company_logo,
    requirements,
    description,
    location,
    salaryRange,
  } = job;
  return (
    <div className="card bg-base-100 w-96 p-4 shadow-sm">
      <div className="flex gap-3">
        <figure>
          <img className="w-12" src={company_logo} alt={company} />
        </figure>
        <div>
          <h4 className="text-2xl">{company}</h4>
          <p>{location}</p>
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="badge badge-secondary">NEW</div>
        <p>{description}</p>
        <div className="flex gap-2 flex-wrap">
          {requirements.map((skill, i) => (
            <p className="border rounded-md" key={i}>
              {skill}
            </p>
          ))}
        </div>
        <div className="card-actions justify-end items-center">
          <p>
            Salary: {salaryRange.min} - {salaryRange.max} {salaryRange.currency}
          </p>
          <Link to={`/jobs/${_id}`}>
            <button className="btn btn-primary">Apply</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotJobCard;
