import react from 'react'
import { ReactNode } from 'react'
import {
  Image,
  Flex,
  HStack,
  useDisclosure,
  VStack,
  Link,
} from '@chakra-ui/react'
import Head from 'next/head'
import ConnectButton from './ConnectButton'
import AccountModal from './AccountModal'
import NextLink from 'next/link'

type Props = {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const title = 'DorkNet'

  return (
    <Flex flexDirection="column" h="100vh" width="100%" bg="whitesmoke">
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <HStack p={10} justifyContent="space-between">
        <NextLink href={'/'} passHref>
          <Link>
            <Image h={'100px'} src="/images/Logo.png" />
          </Link>
        </NextLink>
        <HStack>
          <ConnectButton handleOpenModal={onOpen} />
          <AccountModal isOpen={isOpen} onClose={onClose} />
        </HStack>
      </HStack>
      <VStack
        p={10}
        // width="100%"
        alignItems="center"
        justifyContent="center"
        mb={'30%'}
      >
        {children}
      </VStack>
    </Flex>
  )
}
