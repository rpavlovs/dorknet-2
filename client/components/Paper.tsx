import react from 'react'
import {
  Text,
  Button,
  Heading,
  Flex,
  VStack,
  Spinner,
  Link,
} from '@chakra-ui/react'
import { useCallback, useContext, useState } from 'react'
import { globalContext } from '../store'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import ReactPDF from 'react-pdf'

const PAPER_TO_PUBLICATION_ID: { [key: string]: string } = {
  '1': '0' + 'x84f7-0x03',
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

  console.log({ data, error })

  if (!account) return <div />

  if (!signature || data == 'Forbidden')
    return (
      <VStack pt={20}>
        {data == 'Forbidden' ? (
          <Heading color={'red.500'} pb={6}>
            You have to claim the publication first on{' '}
            <Link
              href="https://lenster.xyz/posts/0x84f7-0x03"
              color={'green.400'}
              textDecoration="underline"
            >
              Lenster
            </Link>
          </Heading>
        ) : (
          <Heading size="lg" pb={6}>
            Sign message to prove you have collected the publication
          </Heading>
        )}

        <Button size="lg" variant="solid" bg={'red.100'} onClick={handleSign}>
          Sign
        </Button>
      </VStack>
    )

  if (!data || isLoading) return <Spinner />

  const url = data

  // return (
  //   <object data={url} type="application/pdf" width="100%" height="100%">
  //     <p>
  //       Alternative text - include a link <a href={url}>to the PDF!</a>
  //     </p>
  //   </object>
  // )

  return (
    <>
      <Heading pb={6}>Your paper is Unlocked!</Heading>
      <Button
        size={'lg'}
        bg={'green.100'}
        onClick={() => {
          window.open(url, '_blank')
        }}
      >
        Download the Paper
      </Button>
    </>
  )

  // return (
  //   <NextLink href={url} passHref>
  //     <Link color="blue.300" fontWeight={'bold'}>
  //       {url}
  //     </Link>
  //   </NextLink>
  // )
}

export default Paper
