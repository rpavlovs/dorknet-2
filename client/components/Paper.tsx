import react, { useMemo } from 'react'
import { Text, Button, Heading, Flex, VStack, Spinner } from '@chakra-ui/react'
import { useCallback, useContext, useState } from 'react'
import { globalContext } from '../store'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { PrivyClient, SiweSession } from '@privy-io/privy-browser'

const PAPER_TO_PUBLICATION_ID: { [key: string]: string } = {
  '1': '0' + 'x3173-0x03',
}

const Paper = () => {
  const { globalState, dispatch } = useContext(globalContext)
  const { account, web3 } = globalState

  const router = useRouter()
  const paperId = router.query.paperId as string | undefined
  const publicationId = paperId ? PAPER_TO_PUBLICATION_ID[paperId] : undefined

  const [signature, setSignature] = useState<string>()

  const { isLoading, error, data } = useQuery('paper', {
    enabled: !!signature,
    queryFn: async () => {
      const response = await fetch('/api/getPaper', {
        method: 'POST',
        body: JSON.stringify({
          publicationId,
          readerAddress: account,
          readerSignature: signature,
        }),
      })
      const result = await response.json()
      console.log({ result })
      return result?.body as string
    },
  })

  const handleSign = useCallback(async () => {
    const messageHash = web3.eth.accounts.hashMessage('dork 123')
    const signature = await web3.eth.sign(messageHash, account)
    setSignature(signature)
    console.log({ signature })
  }, [account, web3?.eth])

  ////

  const client = useMemo(() => {
    if (!web3?.eth?.currentProvider) return null

    const session = new SiweSession(
      process.env.NEXT_PUBLIC_PRIVY_API_KEY,
      // @ts-ignore
      web3.eth.currentProvider
    )
    return new PrivyClient({ session: session })
  }, [web3?.eth?.currentProvider])

  const fetchDataFromPrivy = useCallback(async () => {
    try {
      // Fetch user's name and favorite color from Privy
      const [firstName, full_ipfs, abstract_ipfs] = await client.get(account, [
        'pub-name',
        'ipfs-full',
        'ipfs-abstract-id-1',
      ])
      return {
        userId: account,
        firstName: firstName?.text(),
        full_ipfs: full_ipfs?.text(),
        abstract_ipfs: abstract_ipfs?.text(),
      }
    } catch (error) {
      console.error(error)
    }
  }, [client, account])

  const { data: privyData } = useQuery('privy', {
    queryFn: fetchDataFromPrivy,
    enabled: !!client && !!account,
  })

  console.log({ data, privyData, error })

  if (!account) return <div />

  if (!signature || data == 'Forbidden')
    return (
      <VStack pt={20}>
        <Heading size="lg" pb={10}>
          Sign message to prove you have collected the publication
        </Heading>
        <Button size="lg" variant="solid" bg={'red.100'} onClick={handleSign}>
          Sign
        </Button>
        {data == 'Forbidden' && (
          <Text>You have to claim the publication first</Text>
        )}
      </VStack>
    )

  if (!data || isLoading) return <Spinner />

  const text = data
  return <Text>{text}</Text>
}

export default Paper
