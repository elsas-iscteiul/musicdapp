import type { NextPage } from 'next'
import { loadSync, transferToContract } from '../src/funcs'
import Head from 'next/head'
import { VStack, HStack, Heading, Text, Button, Input, Box, Spacer, FormControl, FormLabel, Select } from '@chakra-ui/react'
import React from 'react'


const SyncPage: NextPage = () => {

    const [refresh, setRefresh] = React.useState<boolean>(true);
    const [songs, setSongs] = React.useState<any>([]);
    const [songId, setSongId] = React.useState<number>();
    const [projectType, setProjectType] = React.useState<string>();
    const [startInterval, setStartInterval] = React.useState<number>(0);
    const [endInterval, setEndInterval] = React.useState<number>(0);

    const [publishingPrice, setPublishingPrice] = React.useState<string>();
    const [mastersPrice, setMastersPrice] = React.useState<string>();
    const [payment, setPayment] = React.useState<number>();

    const [addressAccount, setAddressAccount] = React.useState<any>(null);
    const [syncContract, setSyncContract] = React.useState<any>(null);
    const [workContract, setWorkContract] = React.useState<any>(null);

    const handleProjectTypeChange = (e:any) => setProjectType(e.currentTarget.value);
    const handleStartChange = (e:any) => setStartInterval(e.currentTarget.value);
    const handleEndChange = (e:any) => setEndInterval(e.currentTarget.value);
    const handleSongChange = (e:any) => setSongId(e.currentTarget.value);
    const handlePublishingPrice = (e:any) => setPublishingPrice(e.currentTarget.value);
    const handleMastersPrice = (e:any) => setMastersPrice(e.currentTarget.value);


    const handleRegisterContract = async () => {
        const songWriters = await workContract.getSongWriters(songId);
        const publisher = await workContract.getPublisher(songId);
        const label = await workContract.getLabel(songId);
        const featuredInstantiators= await workContract.getFeaturedInstantiators(songId);
        await syncContract.create(publisher, label, songWriters, featuredInstantiators,
            projectType, songId, startInterval, endInterval, {from: addressAccount});
        setProjectType('');
        setSongId(0);
        setStartInterval(0);
        setEndInterval(0);
        setPayment(0);
        setRefresh(true);

    }



    const pay = async () => {
        await transferToContract(syncContract, payment);
    }

    const definePublisherPrice = async() => {
        await syncContract.setPublishingPricing(publishingPrice, {from: addressAccount});
    }

    const defineMastersPrice = async() => {
        await syncContract.setMastersPricing(mastersPrice, {from: addressAccount});
    }



    React.useEffect(() =>{
        if(!refresh) return;
        setRefresh(false);
        loadSync().then((e) => {
            setAddressAccount(e.account);
            setSyncContract(e.syncContract),
            setWorkContract(e.workContract);
            setSongs(e.songs);
            setPayment(e.totalPrice);
        });
    });


    return(
        <VStack>
            <Heading>Synch-Master License</Heading> 
            <FormControl> 
                <FormLabel>Song</FormLabel>
                <Select 
                    value={songId}
                    onChange={handleSongChange}
                    placeholder='Select Desired Song'>
                    {
                    songs.map((song:Array<any>) =>
                        <option value={song[9]} >{song[0]} - {song[1]}</option>
                    )
                }
                </Select>
            </FormControl>
            <HStack w='md'>
                <Input
                    type='text'
                    size='md'
                    placeholder='Project Type'
                    onChange={handleProjectTypeChange}
                    value={projectType}
                    />
            </HStack>
            <HStack w='md'>
                <Input
                    type='number'
                    size='md'
                    placeholder='Start Interval'
                    onChange={handleStartChange}
                    value={startInterval}
                    />
            </HStack>
            <HStack w='md'>
                <Input
                    type='number'
                    size='md'
                    placeholder='End Interval'
                    onChange={handleEndChange}
                    value={endInterval}
                    />
            </HStack>
            <Button onClick={handleRegisterContract}>Register Contract</Button>                                                                                                                                                                                                                         aslkdsladlsadjljsaldlsadjla   
            <Box h='20px'/>
            <HStack w='md'>
                <Input
                    type='string'
                    size='md'
                    placeholder='Publishing Price'
                    onChange={handlePublishingPrice}
                    value={publishingPrice}
                    />
                    <Button onClick={definePublisherPrice}>Set Publisher Price</Button>
            </HStack>
            <HStack w='md'>
                <Input
                    type='string'
                    size='md'
                    placeholder='Masters Price'
                    onChange={handleMastersPrice}
                    value={mastersPrice}
                    />
                <Button onClick={defineMastersPrice}>Set Masters Price</Button>
            </HStack>
            <HStack w='md'>
                <Text>Price to pay: {payment}</Text> 
            </HStack>
            <HStack w='md'>
                <Button onClick={pay}>Pay</Button>
            </HStack>

        </VStack>
    )
}
export default SyncPage;
