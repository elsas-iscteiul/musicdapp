// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.8;

contract Pro{
    
    struct PerfContract{
        uint id;
        address business;
        uint capacity;
        address payable publisher;
    }

    event ContractCreated(
        uint id,
        address business, 
        address label,
        uint ammountPayed
    );

    mapping(address => mapping(uint => PerfContract)) public contracts;
    mapping(address => uint) public contractsCount;

    function createContract(uint _capacity, address payable _label) external payable{
        uint contractCount = contractsCount[_label];
        contracts[_label][contractCount] = PerfContract(contractCount, msg.sender, _capacity, _label);
        uint ammount = address(this).balance;
        _label.transfer(ammount);
        emit ContractCreated(contractCount, msg.sender, _label, ammount);
        contractsCount[_label]++;

    }


}
