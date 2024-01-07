import React, { useState } from 'react';
import "./STYLES/VotingForm.css"

const VotingForm = () => {
  // Sample election data
  const election = {
    id: 1,
    title: 'Election 1',
    status: 'Ongoing',
    startDate: '2023-04-01',
    endDate: '2023-04-15',
    contestants: [
      {
        id: 1,
        name: 'John Doe',
        party: 'Unity Party',
      },
      {
        id: 2,
        name: 'Jane Smith',
        party: 'Progressive Alliance',
      },
      {
        id: 3,
        name: 'Robert Johnson',
        party: 'Freedom Party',
      },
    ],
  };

  const [selectedContestant, setSelectedContestant] = useState(null);

  const handleVote = () => {
    // Handle the vote submission logic here
    if (selectedContestant) {
      alert(`Vote submitted for ${selectedContestant.name}`);
      // You can send the vote to the server or perform any other actions
    } else {
      alert('Please select a contestant before submitting your vote.');
    }
  };

  return (
    <div className="voting-form">
      <h2>{election.title}</h2>
      <p>Status: {election.status}</p>
      <p>Start Date: {election.startDate}</p>
      <p>End Date: {election.endDate}</p>

      <form>
        <h3>Contestants:</h3>
        <ul>
          {election.contestants.map((contestant) => (
            <li key={contestant.id}>
              <label>
                <input
                  type="radio"
                  name="contestant"
                  value={contestant.id}
                  checked={selectedContestant === contestant}
                  onChange={() => setSelectedContestant(contestant)}
                />
                {contestant.name} - {contestant.party}
              </label>
            </li>
          ))}
        </ul>

        <button type="button" onClick={handleVote}>
          Submit Vote
        </button>
      </form>
    </div>
  );
};

export default VotingForm;
