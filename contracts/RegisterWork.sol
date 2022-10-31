// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.8;



contract RegisterWork{

  event Registered(uint identifier);

  struct Instance{
    string title;
    string artist;
    uint duration;
    address creator;
    address composer;
    address publisher;
    address label;
    //address engineer; Disabled for demonstration purposes
    //address producer;
    //address arranger;
    address[] featuredInstantiators;
    address[] nonFeaturedInstantiators;
    uint identifier; //change to string and use ISRC(?)
}


  

  mapping(uint => Instance) private instances; //used to get the a song by ID
  uint[] private identifiers;
  


  function initialRegistry(string memory _title, string memory _artist, uint _duration, uint _identifier, address _composer, address _creator, address _publisher, address _label) public{
    if( !(instances[_identifier].creator == address(0)) ){
      revert("Instance is already registered");
    }
    instances[_identifier] = Instance({
      title: _title,
      artist: _artist,
      duration: _duration,
      identifier: _identifier,
      composer: _composer,
      creator: _creator,
      publisher: _publisher,
      label: _label,
      featuredInstantiators: new address[](0),
      nonFeaturedInstantiators: new address[](0)
    });
    identifiers.push(_identifier);
    emit Registered(_identifier);
  }

  function registerArtist(uint _identifier, address _artistAdress, bool _featured) public{
    if(_featured){
      instances[_identifier].featuredInstantiators.push(_artistAdress);
    }
    else{
      instances[_identifier].nonFeaturedInstantiators.push(_artistAdress);
    }
  }

  function getAll() public view returns(Instance[] memory){
    Instance[] memory aux = new Instance[](identifiers.length);
    for(uint i = 0; i < identifiers.length; i++){
      aux[i] = instances[identifiers[i]];
    }
    return (aux);
  }

  function getInstance(uint _identifier) public view returns(Instance memory){
    return instances[_identifier];
  }

  function getSongWriters(uint _identifier) public view returns(address[] memory){
    address[] memory aux = new address[](2); //1 writer and 1 composer for demonstration purposes
    aux[0] = (instances[_identifier].composer);
    aux[1] = (instances[_identifier].creator);
    return aux;
  }

  function getFeaturedInstantiators(uint _identifier) public view returns(address[] memory){
    return instances[_identifier].featuredInstantiators;
  }

  function getPublisher(uint _identifier) public view returns(address){
      return instances[_identifier].publisher;
  }

  function getLabel(uint _identifier) public view returns(address){
      return instances[_identifier].label;
  }

}
