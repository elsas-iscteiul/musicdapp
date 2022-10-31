import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, HStack, Heading, Text, Button, Input, Box, Spacer, FormControl, FormLabel, Select } from '@chakra-ui/react'
import React from 'react'


const Home: NextPage = () => {

  return(
  <VStack>
    <Heading>Select Song</Heading> 
    <FormControl> 
        <FormLabel>Song</FormLabel>
        <Select placeholder='Select Desired Song'>
        {
        songs.map((song:Array<Any>, idx:numer) =>
          <option>{song[0]} - {song[1]}</option>
        )
        }
        </Select>
    </FormControl>

  </VStack>
  )
}
