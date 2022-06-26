import { Text, Button, Heading, Flex, VStack } from "@chakra-ui/react"
import { useCallback, useContext, useState } from "react"
import { globalContext } from '../store'


const Paper = () => {
  const { globalState, dispatch } = useContext(globalContext)
  const { account, web3 } = globalState

  const [signature, setSignature] = useState<string>()

  const handleSign = useCallback(async () => {
    const messageHash = web3.eth.accounts.hashMessage('dork 123')
    const signature = await web3.eth.sign(messageHash, account)
    setSignature(signature)
    console.log({ signature})
  }, [account, web3?.eth])

  if (!account) return null

  if (!signature) return (
    <VStack pt={20}>
      <Heading size='lg' pb={10}>Sign message to prove you have collected the publication</Heading>
      <Button size='lg' variant='solid' bg={'red.100'} onClick={handleSign}>Sign</Button>
    </VStack>
  )

  const text = 'asdf'
  return <Text>{text}</Text>
}

export default Paper
