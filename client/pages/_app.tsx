import react, { useState } from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { GlobalStore } from '../store'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStore>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </GlobalStore>
      </Hydrate>
    </QueryClientProvider>
  )
}
