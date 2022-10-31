import type { NextPage } from 'next'
import Head from 'next/head'
import { Stack, VStack, HStack, Heading, Text, Button, Input, Box, CheckboxGroup, Switch, Checkbox } from '@chakra-ui/react'
import React from 'react'
import { loadPro } from '../src/funcs'


const ProPage: NextPage = () => {

    const [refresh, setRefresh] = React.useState<boolean>(true);

    const [name, setName] = React.useState<string>('');
    const handleName =  (e: any) => setName(e.currentTarget.value);

    const [capacity, setCapacity] = React.useState<number>(0);
    const handleCapacity =  (e: any) => setCapacity(e.currentTarget.value);

    const [addressAccount, setAddressAccount] = React.useState<string>('');
    const [label, setLabel] = React.useState<string>('');
    const [proContract, setProContract] = React.useState<any>(null);
    const [rate, setRate] = React.useState<number>();


    React.useEffect(() =>{
        if(!refresh) return;
        setRefresh(false);
        loadPro().then((e) => {
            setAddressAccount(e.account);
            setProContract(e.proContract),
            setLabel(e.label);
        });
    });

    const pay = async() => {
        const rateWei = rate*1000000000000000000;
        await proContract.createContract(capacity,
            label,
            {from: addressAccount,
            value: rateWei});

    }

    const getRate = () => {
        if(capacity <= 25){
            setRate(0.17);
        }
        if(capacity > 25 && capacity <= 50){
            setRate(0.23);
        }
        if(capacity > 50 && capacity <= 100){
            setRate(0.35)
        }
        if(capacity > 100 && capacity <= 200){
            setRate(0.47)
        }
        if(capacity > 200 && capacity <= 300){
            setRate(0.58)
        }
        if(capacity > 300){
            const multiplier = Math.floor(capacity/100) - 3;
            setRate(0.58 + (0.17*multiplier));
        }
    }



    return (
        <VStack align='stretch'>
            <Heading align='center'>Performance Rights</Heading>
            <Box h='40px'/>
            <Heading size='md'>Activity Period</Heading>
            <HStack>
                <Input
                    placeholder='Business Name'
                    type='string'
                    value={name}
                    onChange={handleName}
                    />
            </HStack>
            <HStack>
                <Text>Did the establishment begin activity in the current year</Text>
                <Switch/>
            </HStack>
            <HStack>
                <VStack>
                    <Text>Start-up date of the company or organization</Text>
                </VStack>
                <VStack>
                    <Input type="date"/>
                </VStack>
            </HStack>
            <HStack>
                <Text>What is the start date of using recorded music/music videos?</Text>
                <VStack>
                    <Input type="date"/>
                </VStack>
            </HStack>
            <HStack>
                <Text>Confirm the operating months for the current year</Text>
            </HStack>
            <HStack>
                <Box w='20px'/>
                <CheckboxGroup colorScheme='teal'>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                        <Checkbox value='all'>All</Checkbox>
                        <Checkbox value='january'>January</Checkbox>
                        <Checkbox value='february'>February</Checkbox>
                        <Checkbox value='march'>March</Checkbox>
                        <Checkbox value='april'>April</Checkbox>
                        <Checkbox value='may'>May</Checkbox>
                        <Checkbox value='june'>June</Checkbox>
                        <Checkbox value='july'>July</Checkbox>
                        <Checkbox value='august'>August</Checkbox>
                        <Checkbox value='september'>September</Checkbox>
                        <Checkbox value='october'>October</Checkbox>
                        <Checkbox value='november'>November</Checkbox>
                        <Checkbox value='december'>December</Checkbox>
                    </Stack>
                </CheckboxGroup>
            </HStack>
            <HStack>
                <Heading size='md'>Usage Type</Heading>
            </HStack>
            <HStack>
                <CheckboxGroup colorScheme='teal'>
                    <Stack spacing={[1,5]} direction={['column', 'row']}>
                        <Checkbox>Thematic Channels</Checkbox>
                        <Checkbox>Ambient Music Service</Checkbox>
                        <Checkbox>Other</Checkbox>
                        <Checkbox>Radio</Checkbox>
                        <Checkbox>Music Files</Checkbox>
                        <Checkbox>CD</Checkbox>
                    </Stack>
                </CheckboxGroup>
            </HStack>
            <HStack>
                <Text>Recorded Music (Phonograms)</Text>
                <Switch/>
            </HStack>
            <HStack>
                <Text>Music Video</Text>
                <Switch/>
            </HStack>
            <HStack>
                <Text>Karaoke</Text>
                <Switch/>
            </HStack>
            <HStack>
                <Text>Television</Text>
                <Switch/>
            </HStack>
            <Heading size='md'>Space Characteristics</Heading>
            <HStack>
                <Text>Meal Serving</Text>
                <Switch/>
            </HStack>
            <HStack>
                <Text>Table Service</Text>
                <Switch/>
            </HStack>
            <HStack>
                <Text>Is there a dance floor</Text>
                <Switch/>
            </HStack>
            <HStack>
                <Text>Do you have a DJ and/or Minimum Consumption?</Text>
                <Switch/>
            </HStack>
            <HStack>
                <Text>Do you use light control systems (chromatic mutation systems)?</Text>
                <Switch/>
            </HStack>
            <HStack>
                <Text>Business Hours</Text>
                <Input type='time'/>
            </HStack>
            <HStack>
                <Text>Capacity</Text>
                <Input
                    type='number'
                    value={capacity}
                    onChange={handleCapacity}
                    />
            </HStack>
            <HStack>
                <Button onClick={getRate}>Get Rate</Button>
                <Text>{rate}</Text>
            </HStack>
            <HStack>
                <Button onClick={pay}> Agree and Pay</Button>
            </HStack>
        </VStack>
    )
}

export default ProPage;
