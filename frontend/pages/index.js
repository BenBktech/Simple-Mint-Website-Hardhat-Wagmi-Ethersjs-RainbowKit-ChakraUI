import Head from 'next/head'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Flex, Text, Button, useToast } from '@chakra-ui/react';
import { useAccount, useSigner } from 'wagmi'
import { ethers } from 'ethers';
import Contract from '../../backend/artifacts/contracts/NFTIsERC721A.sol/NFTIsERC721A.json'

export default function Home() {

  const { address, isConnected } = useAccount()
  const { data: signer } = useSigner()
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const toast = useToast()

  const mintNFT = async(number) => {
    try {
      const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
      let transaction = await contract.mint(number);
      transaction.wait()
      toast({
        title: 'Félicitations !',
        description: "Vous avez bien minté vos NFTs",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
    catch {
      toast({
        title: 'Erreur !',
        description: "Une erreur est survenue",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex height="15vh" justifyContent="space-between" alignItems="center" p="2rem">
        <Text>
          Logo
        </Text>
        <ConnectButton />
      </Flex>
      <Flex justifyContent="center" alignItems="center" height="85vh">
        {(isConnected ? (
          <Flex direction="column">
            <Text align="center">Tu es connecté et tu peux minter</Text>
            <Flex mt="2rem">
              <Button onClick={() => mintNFT(1)}>Mint 1 NFT</Button>
              <Button onClick={() => mintNFT(2)} ml="1rem">Mint 2 NFT</Button>
              <Button onClick={() => mintNFT(3)} ml="1rem">Mint 3 NFT</Button>
            </Flex>
          </Flex>
        ) : (
          <Text>Merci de vous connecter avec votre Wallet sur votre navigateur.</Text>
        ))}
      </Flex>
    </>
  )
}