// ElectionDetails.jsx

import {useState} from 'react';
import { useParams } from 'react-router-dom';
import './STYLES/electionDetails.css'; // Import the CSS file

// Import your list of election objects
import { elections } from '../assets/textAsset'; // Update the path accordingly


// Example form component
  const ElectionVoteForm = ({election}) => {
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
       <div className="voting-form " >
        <div className='ongoingElecton'> THIS ELECTION IS CURRENTLY ONGOING, VOTE BELOW</div>
      <h2>{election.title}</h2>
      <p>Status: {election.status}</p>
      <p>Start Date: {election.startDate}</p>
      <p>End Date: {election.endDate}</p>

      <form>
        <h3>Contestants:</h3>
        <ul className='contestantsList'>
          {election.contestants.map((contestant, index) => (
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

        <button className="submitVote" type="button" onClick={handleVote}>
          Submit Vote
        </button>
      </form>
    </div>
  
    );
  };

const ElectionDetails = () => {

    function calculateTotalVotes(contestants) {
        let totalVotes = 0;
      
        contestants.forEach((contestant) => {
          totalVotes += contestant.votes;
        });
      
        return totalVotes;
      }

    const { electionId } = useParams();
  
    // Find the election object based on the electionId
    const election = elections.find((e) => e.id === parseInt(electionId));
  
    if (!election) {
      // Handle the case where the election is not found
      return <div>No election found for ID {electionId}</div>;
    }
  
    const isOngoing = election.status === 'Ongoing';
  
    return (
      <div className='election-details-container' style={{
        backgroundColor:
          election.status === "Upcoming"
            ? "#703BF7"
            : election.status === "Ongoing"
            ? "#29AB87"
            : election.status === "Completed"
            ? "red"
            : "#d9edf7",
      }}>
        <h2>{election.title}</h2>
        <p>Status: {election.status}</p>
        <p>Start Date: {election.startDate}</p>
        <p>End Date: {election.endDate}</p>
        <p>Total Votes: {calculateTotalVotes(election.contestants)}</p>
  
        <h3>Contestants:</h3>
        <ul>
          {election.contestants.map((contestant) => (
            <li key={contestant.id}>
              <strong>{contestant.name}</strong> - {contestant.party}
              <p>Votes: {contestant.votes}</p>
            </li>
          ))}
        </ul>
  
        {/* Conditional rendering of the form */}
        {isOngoing && <ElectionVoteForm election={election}/>}
      </div>
    );
  };
  

export default ElectionDetails;
