// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

// pragma experimental ABIEncoderV2;

contract Election {
    constructor() {}

    struct contestant {
        string name;
        uint256 id;
        uint256 votes;
    }
     enum Electionstatus {
        Pending,
        ongoing,
        completed
    }
    struct Electioninfo {
        uint256 id;
        address electionCreator;
        string electionTitle;
        uint256 electionStartDate;
        uint256 electionDuration;
        uint256 electionEndDate;
        Electionstatus electionStatus;
    }

    

    uint256 electionCounter;

    mapping(uint256 => contestant[]) electionContestants;
    Electioninfo[] elections;

    event electionCreated(
        uint256 id,
        address electionCreator,
        string title,
        uint256 startDate,
        uint256 duration,
        uint256 electionEndDate,
        Electionstatus status,
        contestant[] contestants
    );

    function createElection(
        string memory title,
        uint256 duration,
        string[] memory names,
        uint256[] memory ids,
        uint256[] memory votes
    ) public {

        require(duration >= 900, "Election duration must be at least 900 seconds-(15minutes)");
        require(names.length == ids.length && ids.length == votes.length, "Invalid contestant data");

        uint256 electionStartDate = block.timestamp;
        uint256 electionEndDate = electionStartDate + duration;
        Electionstatus electionStatus = Electionstatus.ongoing;
        // Electionstatus  status ;
        // string memory electionStatus = status.ongoing;

        for (uint i = 0; i < names.length; i++) {
            electionContestants[electionCounter].push(
                contestant(names[i], ids[i], votes[i])
            );
        }
     

        elections.push(
            Electioninfo(
                electionCounter,
                msg.sender,
                title,
                electionStartDate,
                electionEndDate,
                electionEndDate,
                electionStatus
            )
        );
        emit electionCreated(
            electionCounter,
            msg.sender,
            title,
            block.timestamp,
            electionStartDate,
            electionEndDate,
            electionStatus,
            electionContestants[electionCounter]
        );

         // Increment the election counter
    electionCounter += 1;
    }

    function getElections(uint256 index) public view  returns (Electioninfo memory) {
         require(index < elections.length, "Invalid election index");
        return elections[index];
    }

    // function vote(address electionId, uint256 contestantId)  public  {

    //    Electioninfo storage currentElection = elections[electionId];

    // require(contestantId < currentElection.electionContestants.length, "Invalid contestant index");

    // currentElection.electionContestants[contestantId].votes += 1;

    // }

    function convertToMilli(uint256 timestamp) internal pure returns (uint256) {
        return (timestamp * 1000);
    }
}
