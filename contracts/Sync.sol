// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.8;

contract Sync{

  address endUser;

  address payable publisher;
  address payable label;
  address payable[] songWriters;
  address payable[] featuredInstantiators;

  string projectType;
  uint songIdentifier;
  uint startInterval;
  uint endInterval;

  uint mastersPricing;
  uint publishingPricing;

  bool isSetPublisherPrice;
  bool isSetMastersPrice;

  
  function create(address payable _publisher, address payable _label, address payable[] memory _songWriters, address payable[] memory _featuredInstantiators, string memory _projectType,
              uint _songIdentifier, uint _startInterval, uint _endInterval) public{
                publisher = _publisher;
                label = _label;
                songWriters = _songWriters;
                featuredInstantiators = _featuredInstantiators;
                projectType = _projectType;
                songIdentifier = _songIdentifier;
                startInterval = _startInterval;
                endInterval = _endInterval;
                endUser = msg.sender;
              }


  function setMastersPricing(uint _mastersPricing) public{
    require(msg.sender == label);
    mastersPricing = _mastersPricing;
    isSetMastersPrice = true;
  }

  function setPublishingPricing(uint _publishingPrice) public{
    require(msg.sender == publisher);
    publishingPricing = _publishingPrice;
    isSetPublisherPrice = true;
  }

  function getMastersPricing() public view returns(uint){
      return mastersPricing;
  }

  function getPublisherPricing() public view returns(uint){
      return publishingPricing;
  }


  function receivePayment() external payable{
    require(msg.sender == endUser && (msg.value == (mastersPricing + publishingPricing)) && isSetPublisherPrice && isSetMastersPrice);
    
    uint publisherShare = publishingPricing / 10;
    publisher.transfer(publisherShare);

    uint publishingShare = (publishingPricing - publisherShare) / songWriters.length;
    for(uint i=0; i < songWriters.length; i++){
      songWriters[i].transfer(publishingShare);
    }
    uint labelShare = mastersPricing / 20;
    label.transfer(labelShare);

    uint mastersShare = (mastersPricing - labelShare) / featuredInstantiators.length;
    for(uint i=0; i < featuredInstantiators.length; i++){
      featuredInstantiators[i].transfer(mastersShare);
    }

  }
    
}

