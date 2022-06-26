import { whoCollected } from '../../utils/getPublications';

export default async function handler(req, res) {

  const { publicationId, readerAddress, readerSignature } = req.body
  // get publicationId, signature and address from req

  // verify signature and address

  // query the lens GraphQl endpoint for the publicationId
  const collectors = await whoCollected(publicationId)
  console.log({collectors})

  // WhoCollectedPublicationRequest

  // check that address in one of the addresses who collected the publication

  // fetch the ipfs hash for the publicationId
  // and return it

  // otherwise return 403

  res.status(200).json({ 'collectors': collectors })
}
