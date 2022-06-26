import react from 'react'
import { ReactNode } from 'react'
import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import ConnectButton from './ConnectButton'
import AccountModal from './AccountModal'

type Props = {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const title = 'DorkNet'

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      bg="white"
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <VStack width="100%" height="100vh" p={10}>
        <HStack alignSelf="flex-end">
          <ConnectButton handleOpenModal={onOpen} />
          <AccountModal isOpen={isOpen} onClose={onClose} />
        </HStack>
        {children}
      </VStack>
    </Flex>
  )
}
