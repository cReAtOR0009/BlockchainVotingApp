import React, { useState } from 'react';
import "./STYLES/CreateElection.css";

const CreateElectionForm = () => {
  const [electionData, setElectionData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    contestants: [''],
  });

  
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElectionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleContestantChange = (e, index) => {
    const newContestants = [...electionData.contestants];
    newContestants[index] = e.target.value;
    setElectionData((prevData) => ({
      ...prevData,
      contestants: newContestants,
    }));
  };
  
  const handleAddContestant = () => {
    setElectionData((prevData) => ({
      ...prevData,
      contestants: [...prevData.contestants, ''],
    }));
  };
  
  const handleDeleteContestant = (index) => {
    const newContestants = [...electionData.contestants];
    newContestants.splice(index, 1);
    setElectionData((prevData) => ({
      ...prevData,
      contestants: newContestants,
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validate title
    if (!electionData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    // Validate start date
    if (!electionData.startDate) {
      newErrors.startDate = 'Start date is required';
    } else if (new Date(electionData.startDate) < new Date()) {
      newErrors.startDate = 'Start date must not be in the past';
    }
    
    // Validate end date
    if (!electionData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (new Date(electionData.endDate) <= new Date(electionData.startDate)) {
      newErrors.endDate = 'End date must be greater than the start date';
    }
    
    // Validate at least one contestant
    if (electionData.contestants.length === 0 || electionData.contestants.every(contestant => !contestant.trim())) {
      newErrors.contestants = 'At least one contestant is required';
    }
    
    setErrors(newErrors);
    
    // Return true if there are no errors, indicating the form is valid
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    console.log("electionData:", electionData)
    e.preventDefault();
    
    // Validate the form before submitting
    if (validateForm()) {
      // Handle the form submission logic here
      alert('Form submitted!');
      // You can send the form data to the server or perform any other actions
    }
  };

  return (
    <form className="create-election-form" onSubmit={handleSubmit}>
      <label>
        Election Title:
        <input
          type="text"
          name="title"
          value={electionData.title}
          onChange={handleInputChange}
        />
        {errors.title && <p className="error">{errors.title}</p>}
      </label>

      <label>
        Start Date:
        <input
          type="date"
          name="startDate"
          value={electionData.startDate}
          onChange={handleInputChange}
        />
        {errors.startDate && <p className="error">{errors.startDate}</p>}
      </label>

      <label>
        End Date:
        <input
          type="date"
          name="endDate"
          value={electionData.endDate}
          onChange={handleInputChange}
        />
        {errors.endDate && <p className="error">{errors.endDate}</p>}
      </label>

      <label>
        Contestants:
        <ul>
          {electionData.contestants.map((contestant, index) => (
            <li key={index}>
              <input
                type="text"
                value={contestant}
                onChange={(e) => handleContestantChange(e, index)}
              />
              <button
                type="button"
                onClick={() => handleDeleteContestant(index)}
                className="delete-button"
              >
                Delete Contestant
              </button>
            </li>
          ))}
        </ul>
        {errors.contestants && <p className="error">{errors.contestants}</p>}
      </label>

      <div className='buttonContainer'>
        <button type="button" onClick={handleAddContestant} className="add-button">
          Add Contestant
        </button>
        <button type="submit" className="submit-button">
          Create Election
        </button>
      </div>
    </form>
  );
};

export default CreateElectionForm;
