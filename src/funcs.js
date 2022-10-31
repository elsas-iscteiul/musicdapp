import RegisterWorkJSON from '../build/contracts/RegisterWork.json';
import SyncJSON from '../build/contracts/Sync.json'
import ProJSON from '../build/contracts/Pro.json'
import Web3 from 'web3';


var contract = require('@truffle/contract');

export const loadPro = async() => {
    await loadWeb3();
    const account = await loadAccount();
    const label = "0xdBBc593B7D667836488A4f7D67c5557f26AaA300"; //In real world wouldnt be hardcoded;
    const {proContract, contracts} = await loadProContract(account);

    return {account, proContract, contracts, label}
}

export const loadWork = async () => {
    await loadWeb3();
    const account = await loadAccount();
    const workContract = await loadWorkContract();

    const songs = await loadSongs(workContract);
    return {account, workContract, songs};
}

export const loadSync = async () => {
    await loadWeb3();
    const account = await loadAccount();
    const workContract = await loadWorkContract();
    const {syncContract, totalPrice} = await loadSyncContract();
    const songs = await loadSongs(workContract);

    return {account, workContract, syncContract, songs, totalPrice};
}

const loadSyncContract = async () => {
    const registerSyncContract = contract(SyncJSON);
    registerSyncContract.setProvider(web3.eth.currentProvider);
    const syncContract = await registerSyncContract.deployed();
    const mastersPrice = await syncContract.getMastersPricing();
    const publisherPrice = await syncContract.getPublisherPricing();

    const totalPrice = +mastersPrice + +publisherPrice;

    return {syncContract, totalPrice};
}

const loadProContract = async(addressAccount) => {
    const registerProContract = contract(ProJSON);
    registerProContract.setProvider(web3.eth.currentProvider);
    const proContract = await registerProContract.deployed();
    const contracts = await loadProContracts(proContract, addressAccount);

    return {proContract, contracts}

}

const loadProContracts = async (mainContract, addressAccount) => {
    const contractsCount = await mainContract.contractsCount(addressAccount);
    const contracts = [];
    for (var i = 0; i < contractsCount; i++) {
        const proContract  = await mainContract.contracts(addressAccount, i);
        contracts.push(proContract);
    }
    return contracts;
}


const loadSongs = async (contract) => {
    const songs = await contract.getAll();
    return songs;
}

const loadWorkContract = async () => {
    const registerWorkContract = contract(RegisterWorkJSON);
    registerWorkContract.setProvider(web3.eth.currentProvider);
    const workContract = await registerWorkContract.deployed();


    return workContract;

}

const loadAccount = async () => {
    const account = await web3.eth.getCoinbase();
    return account;
}

export const transferToContract = async(contract, value) => {
    contract.receivePayment({
        from: await loadAccount(),
        value: value
    })
}





const loadWeb3 = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}
