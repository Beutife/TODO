// contracts/Test.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Test {
  uint public value;

  function set(uint _value) public {
    value = _value;
  }
}
