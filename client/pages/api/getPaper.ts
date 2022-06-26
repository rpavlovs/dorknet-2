import _ from 'lodash'
import { whoCollected } from '../../utils/getPublications'
import { PrivyClient, SiweSession } from '@privy-io/privy-browser'
import { ethers } from 'ethers'

export default async function handler(req, res) {
  const { publicationId, readerAddress, readerSignature } = JSON.parse(req.body)

  console.log({ body: req.body })
  // get publicationId, signature and address from req

  // verify signature and address

  // query the lens GraphQl endpoint for the publicationId
  const collectors = await whoCollected(publicationId)
  console.log({ collectors })

  if (!collectors.map(_.toLower).includes(_.toLower(readerAddress))) {
    res.status(200).json({ body: 'Forbidden' })
    return
  }

  const infuraProjectId = process.env.NEXT_PUBLIC_INFURA_SECRET
  const provider = new ethers.providers.InfuraProvider(
    'polygon',
    infuraProjectId
  )

  const session = new SiweSession(
    process.env.NEXT_PUBLIC_PRIVY_API_KEY,
    provider
  )
  const client = new PrivyClient({ session: session })

  /* Write the user's name and favorite color to Privy and personalizes the app */
  const submitDataToPrivy = async () => {
    const [firstName, full_ipfs, abstract_ipfs] = await client.put(
      readerAddress,
      [
        {
          field: 'pub-name',
          // value: nameInput
          value: 'THE BITCOIN PAPER',
        },
        {
          field: 'ipfs-full',
          value:
            'https://storageapi.fleek.co/3734967f-0120-45bd-bc88-c7a4970f87ca-bucket/file-1656214807349',
        },
        {
          field: 'ipfs-abstract-id-1',
          value:
            'https://storageapi.fleek.co/3734967f-0120-45bd-bc88-c7a4970f87ca-bucket/paws_abstract.pdf',
        },
      ]
    )
  }

  //get publication data (name, abstract link, full link)

  //put publication data in privy (name, abstract link, full link)

  // fetch the ipfs hash for the publicationId
  res.status(200).json({ body: 'THE BITCOIN WHITEPAPER!' })
}
