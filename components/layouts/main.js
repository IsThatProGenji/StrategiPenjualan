import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import { createContext, useContext } from 'react'
import MyContextProvider from '../myContextProvider'
const Main = ({ children, router }) => {
  // const orders = 'boom'
  // const OrderContext = createContext(orders)

  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Arka Multi Synergi</title>
      </Head>
      <MyContextProvider>
        <NavBar path={router.asPath} />

        <Container maxW="2x1" pt={14}>
          {children}
          <Footer />
        </Container>
      </MyContextProvider>
    </Box>
  )
}

export default Main
