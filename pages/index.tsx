import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, HStack, Heading, Text, Button, Input, Box, Spacer, Checkbox } from '@chakra-ui/react'
import React from 'react'
import { loadWork } from '../src/funcs'

const Home: NextPage = () => {

    const [refresh, setRefresh] = React.useState<boolean>(true);

    const [title, setTitle] = React.useState<string>('');  
    const [artist, setArtist] = React.useState<string>('');  
    const [duration, setDuration] = React.useState<number>();  
    const [id, setId] = React.useState<number>(0);  
    const [composer, setComposer] = React.useState<string>('');  
    const [creator, setCreator] = React.useState<string>('');
    const [addressAccount, setAddressAccount] = React.useState<any>(null);
    const [contract, setContract] = React.useState<any>(null);
    const [songs, setSongs] = React.useState<any>([]);
    const [instantiator, setInstantiator] = React.useState<string>('');
    const [featured, setFeatured] = React.useState<boolean>();
    const [publisher, setPublisher] = React.useState<any>(null);
    const [label, setLabel] = React.useState<any>(null);

    const handleTitleChange = (e:any) => setTitle(e.currentTarget.value);
    const handleArtistChange = (e:any) => setArtist(e.currentTarget.value);
    const handleDurationChange = (e:any) => setDuration(e.currentTarget.value);
    const handleIdChange = (e:any) => setId(e.currentTarget.value);
    const handleComposerChange = (e:any) => setComposer(e.currentTarget.value);
    const handleCreatorChange = (e:any) => setCreator(e.currentTarget.value);
    const handleInstantiatorChange = (e:any) => setInstantiator(e.currentTarget.value);
    const handleFeatureChange = (e:any) => setFeatured(e.currentTarget.checked);
    const handlePublisherChange = (e:any) => setPublisher(e.currentTarget.value);
    const handleLabelChange = (e:any) => setLabel(e.currentTarget.value);

    const handleAddMusic = async () => {
        await contract.initialRegistry(title, artist, duration, id, composer, creator, publisher, label, {from: addressAccount});
        setTitle('');
        setArtist('');
        setDuration(0);
        setCreator('');
        setComposer('');
        setRefresh(true);
    };
    const handleAddInstantiator = async() => {
        await contract.registerArtist(id, instantiator, featured, {from: addressAccount});
        setInstantiator('');
        setFeatured(false);
    };


    React.useEffect(() => {
        if (!refresh) return;
        setRefresh(false);
        loadWork().then((e) => {
            setAddressAccount(e.account);
            setContract(e.workContract);
            setSongs(e.songs);
        }); 
    });



    return (
        <VStack>
            <Head>
                <title>Music Management</title>
                <meta name="description" content="Decentralized App for music royalty management" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Spacer />
            <VStack>
                <Heading>Music Registration</Heading>
                <Box h='30px'/>
                <HStack w='md'>
                    <Input
                        type='text'
                        size='md'
                        placeholder='Title'
                        onChange={handleTitleChange}
                        value={title}
                        />
                </HStack>
                <HStack w='md'>
                    <Input
                        type='text'
                        size='md'
                        placeholder='Artist'
                        onChange={handleArtistChange}
                        value={artist}
                        />
                </HStack>
                <HStack w='md'>
                    <Input
                        type='number'
                        size='md'
                        placeholder='Duration (s)'
                        onChange={handleDurationChange}
                        value={duration}
                        />
                </HStack>
                <HStack w='md'>
                    <Input
                        type='number'
                        size='md'
                        placeholder='Identification'
                        onChange={handleIdChange}
                        value={id}
                        />
                </HStack>
                <HStack w='md'>
                    <Input
                        type='text'
                        size='md'
                        placeholder='Composer Address'
                        onChange={handleComposerChange}
                        value={composer}
                        />
                </HStack>
                <HStack w='md'> 
                    <Input
                        type='text'
                        size='md'
                        placeholder='Creator Address'
                        onChange={handleCreatorChange}
                        value={creator}
                        />
                </HStack>
                 <HStack w='md'> 
                    <Input
                        type='text'
                        size='md'
                        placeholder='Publisher Address'
                        onChange={handlePublisherChange}
                        value={publisher}
                        />
                </HStack>
                <HStack w='md'> 
                    <Input
                        type='text'
                        size='md'
                        placeholder='Label Address'
                        onChange={handleLabelChange}
                        value={label}
                        />
                </HStack>
                <HStack>
                    <Button onClick={handleAddMusic}>Register Music</Button>
                </HStack>
                <Box h='5px' />
                <HStack w='md'>
                    <Input
                        type='text'
                        size='md'
                        placeholder='Instantiator Address'
                        onChange={handleInstantiatorChange}
                        value={instantiator}
                        />
                    <Checkbox
                        onChange={handleFeatureChange}
                        isChecked={featured}
                    >Featured</Checkbox>
                </HStack>
                <HStack>
                    <Button onClick={handleAddInstantiator}>Add Instantiator</Button>:w
                </HStack>

                <Box h='10px' />
                <Heading size="md">Registered Music</Heading>
                {
                songs.map((song:Array<any>) =>
                    <Text>{song[0]} - {song[1]}</Text>
                )

            }
            </VStack>

        </VStack>
    )

}

export default Home
