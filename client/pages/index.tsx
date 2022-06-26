import Head from 'next/head'
import Layout from '../components/Layout'
import ConnectButton from '../components/ConnectButton'
import { HStack, useDisclosure, VStack } from '@chakra-ui/react'
import AccountModal from '../components/AccountModal'
import Paper from '../components/Paper'

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const title = 'Ethereum dApps Next.js Boiletplate'
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <VStack width='100%' height="100vh" p={10}>
        <HStack alignSelf="flex-end">
          <ConnectButton handleOpenModal={onOpen} />
        </HStack>
        <Paper />
        <AccountModal isOpen={isOpen} onClose={onClose} />
      </VStack>
    </Layout>
  )
}

export default Home
