import type { NextPage } from 'next'
import Head from 'next/head'
import {  Stack, HStack,  Text, Spinner, Spacer, Box} from '@chakra-ui/react'
import React from 'react'
import { loadPro } from '../src/funcs'


const ProList: NextPage = () => {
    const [addressAccount, setAddressAccount] = React.useState<string>('');
    const [contracts, setContracts] = React.useState<any[]>([]);
    const [refresh, setRefresh] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (!refresh) return;
        setRefresh(false);
        loadPro().then((e) => {
            setAddressAccount(e.account);
            setContracts(e.contracts);
        });
    });

    return (
        <Stack>
            {
            contracts == null ? <Spinner />
                :contracts.map((contract, idx) => 
                    <HStack key={idx} w='md' bg='gray.100' borderRadius={7}>
                        <Box w='5px' />
                        <Text>{contract[1]}</Text>
                        <Spacer />
                    </HStack>
                )
        }
        </Stack>
    )

}
export default ProList;
