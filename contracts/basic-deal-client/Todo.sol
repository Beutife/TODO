// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



contract ToDo {


    struct TodoBox {
    string title;
    uint256 id;
    string tasks;
    bool isDone;
  }

  mapping(address => TodoBox[]) public todos;
  

 function addTodo(uint256 _id, string memory _title, string memory _tasks) public {
        TodoBox memory newTodo = TodoBox({
            id: _id,
            title: _title,
            tasks: _tasks,
            isDone: false
        });

        todos[msg.sender].push(newTodo);
    }

  function markDone(uint256 _id) public {
    TodoBox[] storage userTodos = todos[msg.sender];
    for (uint i = 0; i < userTodos.length; i++) {
        if (userTodos[i].id == _id) {
            userTodos[i].isDone = true;
            return;
        }
    }
    revert("Todo not found");
}

function removeTodo(uint256 _id) public {
    TodoBox[] storage userTodos = todos[msg.sender];
    for (uint i = 0; i < userTodos.length; i++) {
        if (userTodos[i].id == _id) {
            require(userTodos[i].isDone == true, "Complete task first");
            userTodos[i] = userTodos[userTodos.length - 1];
            userTodos.pop();
            return;
        }
    }
    revert("Todo not found");
}

function getTodos() public view returns (TodoBox[] memory) {
    return todos[msg.sender];
}

}

