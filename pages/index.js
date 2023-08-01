import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  SimpleGrid,
  Flex,
  Badge,
  IconButton,
  Img,
  Button,
  Text
} from '@chakra-ui/react'
import { ChevronRightIcon, EmailIcon, StarIcon } from '@chakra-ui/icons'
import NumberInput from '../components/numberinput'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import SendEmail from '../firebase/clientApp'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import MyContext from '../components/myContext'
import React, { createContext, useEffect, useState, useContext } from 'react'
import GetMenu from '../firebase/clientApp'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where
} from 'firebase/firestore'
import { formatToRupiah } from '../components/formatPrice'
import firebaseConfig from '../components/firebaseConfig'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  }
}

// Function to generate a random color

function Home() {
  const { orders, addOrder } = useContext(MyContext)

  // Function to render NumberInput if orders are not null

  function foodCard(nama, harga, url, totalp, kode, index) {
    const property = {
      imageUrl: url,
      imageAlt: 'food katsu',
      title: nama,
      formattedPrice: harga,
      kode: kode
    }
    const handleSubmit = () => {
      addOrder(property.title, property.formattedPrice, property.imageUrl, 1)

      // console.log(orders)
    }
    const renderInputOrButton = () => {
      const hasTitle = orders.some(order => order.nama === property.title)
      if (!hasTitle) {
        return (
          <Button
            borderRadius="md"
            size="sm"
            onClick={handleSubmit}
            colorScheme="purple"
          >
            Add to Cart
          </Button>
        )
      } else {
        return (
          <Box maxW="125px">
            <NumberInput nama={property.title} />
          </Box>
        )
      }
    }
    return (
      <Box key={index} paddingX={{ base: 1, md: 2 }} width="100%" py={2}>
        <Box
          borderWidth="2px"
          borderRadius="none"
          style={{ borderColor: 'darkgrey', borderWidth: '2px' }}
        >
          <Box
            // Set the desired height for the image container
            borderRadius="none"
            overflow="hidden"
            position="relative"
            pb="56.25%" // 16:9 aspect ratio, you can adjust this value as needed
          >
            <Box
              as="img"
              src={property.imageUrl}
              alt={property.imageAlt}
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Box>

          <Box p={5}>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {property.title}
            </Box>

            <Box>{formatToRupiah(property.formattedPrice)}</Box>

            <Box display="flex" mt="2" alignItems="center" pb={2}>
              <Box as="span" color="gray.600" fontSize="xs" noOfLines={1}>
                Kode : {kode} | Terjual : {totalp}
              </Box>
            </Box>
            {renderInputOrButton()}
          </Box>
        </Box>
      </Box>
    )
  }

  const { GetFullMenu, fullMenu } = useContext(MyContext)
  const [newValue, setNewValue] = useState('')

  const handleChange = event => {
    setNewValue(event.target.value)
  }

  const handleSubmit = () => {
    SendEmail()
  }

  const [seasonal, setSeasonal] = useState([])

  useEffect(() => {
    GetFullMenu()

    // const newItem = { firstname: 'Kaylee', lastname: 'Frye' }
    // setItems(prevItems => [...prevItems, newItem])
    // console.log(items)
  }, [])

  return (
    <Layout>
      {/* <div>
        {' '}
        {recommendationItems.map(
          (data, index) =>
            // Step 2: Use map function to loop through the array and create a box with text
            data.nama
        )}
      </div> */}
      <Container maxW="x1" flexDirection="row">
        <Box
          flex={1}
          px={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Text as="h1" fontSize="xl" fontWeight="bold" p={2}>
            Produk
          </Text>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing={2}>
            {fullMenu.map((data, index) =>
              foodCard(
                data.nama,
                data.harga,
                data.url,
                data.totalp,
                data.kode,
                index
              )
            )}
          </SimpleGrid>
        </Box>

        {/* Rest of the left side content */}
      </Container>
    </Layout>
  )
}

export default Home
export { getServerSideProps } from '../components/chakra'
