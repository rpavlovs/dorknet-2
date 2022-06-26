import react from 'react'
import { Text, Button, Heading, Flex, VStack, Spinner } from '@chakra-ui/react'
import { useCallback, useContext, useState } from 'react'
import { globalContext } from '../store'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

const PAPER_TO_PUBLICATION_ID: { [key: string]: string } = {
  '1': '0x3173-0x03',
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
      return result as string
    },
  })

  const handleSign = useCallback(async () => {
    const messageHash = web3.eth.accounts.hashMessage('dork 123')
    const signature = await web3.eth.sign(messageHash, account)
    setSignature(signature)
    console.log({ signature })
  }, [account, web3?.eth])

  console.log({ data })

  if (!account) return <div />

  if (!signature)
    return (
      <VStack pt={20}>
        <Heading size="lg" pb={10}>
          Sign message to prove you have collected the publication
        </Heading>
        <Button size="lg" variant="solid" bg={'red.100'} onClick={handleSign}>
          Sign
        </Button>
      </VStack>
    )

  if (!data || isLoading) return <Spinner />

  const text = data as string
  return <Text>{'asdf'}</Text>
}

export default Paper
