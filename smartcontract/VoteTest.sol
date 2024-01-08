// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Election {
    // Data structures
    struct Contestant {
        string name;
        uint256 id;
        uint256 votes;
    }

    struct ElectionInfo {
        uint256 id;
        address creator;
        string title;
        uint256 startDate;
        uint256 duration;
        uint256 endDate;
        string status;
    }

    // State variables
    uint256 public electionCounter;
    mapping(uint256 => Contestant[]) public electionsContestants;
    ElectionInfo[] public elections;

    // Events
    event ElectionCreated(
        uint256 indexed electionId,
        address indexed creator,
        string title,
        uint256 startDate,
        uint256 duration,
        uint256 endDate,
        string status,
        Contestant[] contestants
    );

    // Function to create a new election
 function createElection(
    string memory title,
    uint256 duration,
    string[] memory names,
    uint256[] memory ids,
    uint256[] memory votes
) public {
    require(duration >= 900000, "Election duration must be at least 900 seconds");
    require(names.length == ids.length && ids.length == votes.length, "Invalid contestant data");

    uint256 electionStartDate = block.timestamp;
    uint256 electionEndDate = electionStartDate + duration;
    string memory electionStatus = "pending";

    // Create contestants for the election
    Contestant[] memory contestants = new Contestant[](names.length);
    for (uint256 i = 0; i < names.length; i++) {
        contestants[i] = Contestant({
            name: names[i],
            id: ids[i],
            votes: votes[i]
        });
    }

    // Save contestants and create the election
    Contestant[] storage electionContestantsRef = electionsContestants[electionCounter];
    // electionContestantsRef.length = contestants.length;
    for (uint256 i = 0; i < contestants.length; i++) {
        electionContestantsRef[i] = contestants[i];
    }

    elections.push(
        ElectionInfo({
            id: electionCounter,
            creator: msg.sender,
            title: title,
            startDate: electionStartDate,
            duration: duration,
            endDate: electionEndDate,
            status: electionStatus
        })
    );

    emit ElectionCreated(
        electionCounter,
        msg.sender,
        title,
        electionStartDate,
        duration,
        electionEndDate,
        electionStatus,
        contestants
    );

    // Increment the election counter
    electionCounter += 1;
}


    // Additional functions (e.g., voting) can be added here

    function convertToMilli(uint256 timestamp) internal pure returns (uint256) {
        return timestamp * 1000;
    }
}
