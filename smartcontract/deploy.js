const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  let provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync("./Vote_sol_Election.abi", "utf8");
  const binary = fs.readFileSync("./Vote_sol_Election.bin", "utf8");
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("deploying, please wait....");
  const contract = await contractFactory.deploy();

  //  const transactionReceipt = await contract.deploymentTransaction.wait(1)
  await contract
    .waitForDeployment()
    .then((success) => console.log(`${success} success`))
    .catch((err) => console.log(err));

  console.log(" this is the contract: ", contract);

  await contract
    .getAddress()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  //get number
  const deployedAddress = await contract.getAddress();
  console.log("deployedAddress", deployedAddress);

  const election = await contract.createElection(
    "election1",
    1000,
    ["Ade", "Olu", "Tomiwa"],
    [0, 1, 2],
    [0, 0, 0]
  );

  const transactionReceipt = await election.wait(1);
  const getElection = await contract.getElections(0);
  console.log("election: ", getElection);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
