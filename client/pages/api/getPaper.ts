import _ from 'lodash'
import { whoCollected } from '../../utils/getPublications'

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
  // fetch the ipfs hash for the publicationId
  res.status(200).json({ body: 'THE BITCOIN WHITEPAPER!' })
}
