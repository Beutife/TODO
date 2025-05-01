const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ToDo Contract", function () {
    console.log("Starting deployment...");
    this.timeout(300000);
    let Todo, todo, owner;

    beforeEach(async () => {
        [owner] = await ethers.getSigners();
        console.log("Owner address:", await owner.getAddress());

        Todo = await ethers.getContractFactory("ToDo");
        todo = await Todo.deploy();
        console.log("Deployment initiated...");
        await todo.waitForDeployment();
        console.log("Deployment completed! Contract address:", await todo.getAddress());
    });

    it("should deploy successfully", async function () {
        const address = await todo.getAddress();
        expect(address).to.be.a("string");
        expect(address).to.have.lengthOf(42);
    });

    it("should add task", async function () {
        const _id = 1;
        const _title = "Study hardhat";
        const _task = "Learn how to test with hardhat";

        console.log("Adding todo...");
        const addTx = await todo.addTodo(_id, _title, _task);
        console.log("Waiting for add transaction to be mined...");
        await addTx.wait();
        console.log("Add transaction mined");
        
        const todos = await todo.getTodos();
        console.log("Todos array length:", todos.length);
        console.log("Todos:", todos);

        expect(todos.length).to.equal(1);
        expect(todos[0].id).to.equal(_id);
        expect(todos[0].tasks).to.equal(_task);
        expect(todos[0].title).to.equal(_title);
        expect(todos[0].isDone).to.equal(false);
    });

    it("should mark task as done", async function () {
        const _id = 2;
        const _task = "Mark as done";
        const _title = "Mark test as complete";

        console.log("Adding todo for marking as done...");
        const addTx = await todo.addTodo(_id, _title, _task);
        console.log("Waiting for add transaction to be mined...");
        await addTx.wait();
        console.log("Add transaction mined");

        console.log("Marking todo as done...");
        const markTx = await todo.markDone(_id);
        console.log("Waiting for mark done transaction to be mined...");
        await markTx.wait();
        console.log("Mark done transaction mined");

        const todos = await todo.getTodos();
        console.log("Todos after marking done:", todos);

        expect(todos.length).to.equal(1);
        expect(todos[0].isDone).to.equal(true);
    });

    it("should remove task when done", async function () {
        const _id = 3;
        const _task = "Remove task";
        const _title = "Completed task is removed";

        console.log("Adding todo for removal...");
        const addTx = await todo.addTodo(_id, _title, _task);
        console.log("Waiting for add transaction to be mined...");
        await addTx.wait();
        console.log("Add transaction mined");

        console.log("Marking todo as done...");
        const markTx = await todo.markDone(_id);
        console.log("Waiting for mark done transaction to be mined...");
        await markTx.wait();
        console.log("Mark done transaction mined");

        console.log("Removing todo...");
        const removeTx = await todo.removeTodo(_id);
        console.log("Waiting for remove transaction to be mined...");
        await removeTx.wait();
        console.log("Remove transaction mined");

        const todos = await todo.getTodos();
        console.log("Todos after removal:", todos);
        expect(todos.length).to.equal(0);
    });
});
