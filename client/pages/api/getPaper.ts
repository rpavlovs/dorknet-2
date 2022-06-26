import _ from 'lodash'
import { whoCollected } from '../../utils/getPublications'
import { Web3Storage } from 'web3.storage'

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return process.env.WEB3STORAGE_TOKEN
}

function makeStorageClient() {
  return new Web3Storage({
    token: getAccessToken(),
    endpoint: new URL('https://api.web3.storage'),
  })
}

async function retrieveFiles(cid) {
  const client = makeStorageClient()
  const res = await client.get(cid)
  console.log(`Got a response! [${res.status}] ${res.statusText}`)
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
  }

  // unpack File objects from the response
  const files = await res.files()
  return files[0].cid

  // for (const file of files) {
  //   console.log(`${file.cid} -- ${file.path} -- ${file.size}`)

  // }
}

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
  res.status(200).json({
    body:
      'https://' +
      (await retrieveFiles(
        'bafybeifdepfy5mtgkwcxsxt7xixpxfb3iizkywgd5mbh575lpxxnzqk6bi'
      )) +
      '.ipfs.dweb.link',
  })
}
