import Layout from '../components/Layout'
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Layout>
      <HStack pl={5} pt={40}>
        <VStack alignSelf={'flex-start'} alignItems={'flex-start'}>
          <Heading size={'lg'}>
            DorkNet is an NFT-gated scientific publishing platform
          </Heading>
          <Text fontSize="xl">
            It allows authors to directly publish content to their readers{' '}
            instead of going through fee extracting publishing companies.
          </Text>
          <Box alignSelf={'center'} pt={'10%'}>
            <Heading size={'md'} pt={10}>
              Steps
            </Heading>
            <Text fontSize="xl" pl={4} pt={4}>
              1. Go to{' '}
              <NextLink href="https://lenster.xyz/posts/0x84f7-0x05" passHref>
                <Link color={'green.400'} textDecoration="underline" isExternal>
                  this Lenster Post
                </Link>
              </NextLink>{' '}
              to collect publication NFT for the Bitcoin whitepaper
            </Text>
            <Text fontSize="xl" pl={4} pt={4}>
              2. Come back to the{' '}
              <NextLink href="/paper/1" passHref>
                <Link color={'green.400'} textDecoration="underline">
                  paper page linked in publication
                </Link>
              </NextLink>
            </Text>
            <Text fontSize="xl" pl={4} pt={4}>
              3. Follow the flow to access the publication!
            </Text>
          </Box>
        </VStack>
      </HStack>
    </Layout>
  )
}

export default Home
