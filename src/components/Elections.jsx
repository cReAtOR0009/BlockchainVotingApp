import React from "react";
import { elections } from "../assets/textAsset";
import { Link, useNavigate } from "react-router-dom";
import "./STYLES/elections.css"

const ElectionCard = ({ election }) => {
  // Assuming you have the router context available
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the election details route with the election's ID as a parameter
    navigate(`/elections/${election.id}`);
  };

  return (
    <div
      className="election-card"
      style={{
        backgroundColor:
          election.status === "Upcoming"
            ? "#703BF7"
            : election.status === "Ongoing"
            ? "#29AB87"
            : election.status === "Completed"
            ? "red"
            : "#d9edf7",
      }}
     
    >
      <h2>{election.title}</h2>
      <p>Status: {election.status}</p>
      <p>Start Date: {election.startDate}</p>
      <p>End Date: {election.endDate}</p>

      <h3>Contestants:</h3>
      {/* <ul>
        {election.contestants.map((contestant, index) => (
          <li key={index}>
            {contestant.name} - {contestant.party} ({contestant.votes} votes)
          </li>
        ))}
      </ul> */}

      <p>Total Votes: ....</p>
      <p>Location:.....</p>
      <Link to={`/elections/${election.id}`}  onClick={handleClick} className="election-card-link">
        <p className="learMore">view details....</p>
      </Link>
    </div>
  );
};

export default function ElectionList() {
  return (
    <div className="containers election-list">
      {elections.map((election, index) => (
        <ElectionCard key={index} election={election} />
      ))}
    </div>
  );
}
