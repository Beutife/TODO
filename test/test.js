const {expect} = require ("chai");
const { ethers } = require("hardhat");

describe("Test Contract", function(){
    this.timeout("6000")

    let Test,test;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        const Test = await ethers.getContractFactory("Test");
        test =     await Test.deploy();
          await test.waitForDeployment();

        it("should deploy successfully", async function(){
            expect(test.address).to.be.a("string");
            expect(test.address).to.have.lengthOf(42);
        });
    });
})