const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0x0AbBe41D45A2bb973db2E7026D4acE416EFe4b09";
    const Todo = await hre.ethers.getContractFactory("ToDo");
    const todo = await Todo.attach(contractAddress);
    console.log("ToDo deployed to:", await todo.getAddress());

    // Example interactions
    const tx = await todo.addTodo(1, "Buy groceries", "Buy 2kg of rice, 1kg of sugar, and 1kg of salt");
    await tx.wait();
    console.log("Todo added with ID:", 1);

    const todos = await todo.getTodos();
    console.log("Todos:", todos);

    const tx2 = await todo.markDone(1);
    await tx2.wait();
    console.log("Todo marked as done with ID:", 1);

    const todos2 = await todo.getTodos();
    console.log("Todos after marking done:", todos2);

    const tx3 = await todo.removeTodo(1);
    await tx3.wait();
    console.log("Todo removed with ID:", 1);

    const todos3 = await todo.getTodos();
    console.log("Todos after removal:", todos3);
    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

