const { error } = require("console");
const hre = require("hardhat");

async function main() {
    const Message = await hre.ethers.getContractFactory("Message")
    const messageStore = await Message.deploy("Hello, It's Beu");

    await messageStore.waitForDeployment();

    const contractAddress = await messageStore.getAddress();
    console.log("MessageStorage deployed to:", contractAddress);

} 

main().catch((error)=>{
    console.error(error);
    process.exitCode=1;
})