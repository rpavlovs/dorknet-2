import Head from 'next/head'
import Layout from '../components/Layout'
import ConnectButton from '../components/ConnectButton'
import { Text, useDisclosure, VStack } from '@chakra-ui/react'
import AccountModal from '../components/AccountModal'
import Paper from '../components/Paper'

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const title = 'Ethereum dApps Next.js Boiletplate'
  return (
    <Layout>
      <Text>Home</Text>
    </Layout>
  )
}

export default Home
