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
  Button
} from '@chakra-ui/react'
import { ChevronRightIcon, EmailIcon, StarIcon } from '@chakra-ui/icons'
import NumberInput from '../components/numberinput'
import Layout from '../components/layouts/article'
import Section from '../components/section'

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

function AirbnbCard() {
  const property = {
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/restaurant-7305c.appspot.com/o/Ayam%20Katsu.jpg?alt=media&token=d53dbb75-69e9-4dbb-8e47-e4426c096b48',
    imageAlt: 'food katsu',
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4
  }

  return (
    <Box paddingX={{ base: 1, md: 2 }}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Img
          src={property.imageUrl}
          alt={property.imageAlt}
          borderRadius="lg"
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
              noOfLines={1}
            >
              {property.beds} beds &bull; {property.baths} baths
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {property.title}
          </Box>

          <Box>
            {property.formattedPrice}
            <Box as="span" color="gray.600" fontSize="sm">
              / wk
            </Box>
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < property.rating ? 'teal.500' : 'gray.300'}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm" noOfLines={1}>
              {property.reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
// Function to generate a random color

function Home() {
  const { orders, addOrder } = useContext(MyContext)

  // Function to render NumberInput if orders are not null

  function foodCard(nama, harga, jenis, url, totalp, disukai, index) {
    const property = {
      imageUrl: url,
      imageAlt: 'food katsu',
      title: nama,
      formattedPrice: harga
    }
    const handleSubmit = () => {
      addOrder(
        property.title,
        property.formattedPrice,
        property.imageUrl,
        1,
        jenis
      )

      // console.log(orders)
    }
    const renderInputOrButton = () => {
      const hasTitle = orders.some(order => order.nama === property.title)
      if (!hasTitle) {
        return (
          <Button borderRadius="full" size="sm" onClick={handleSubmit}>
            Add To Cart
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
      <Box key={index} paddingX={{ base: 1, md: 2 }}>
        <Box borderWidth="2px" borderRadius="lg" overflow="hidden">
          <Img
            src={property.imageUrl}
            alt={property.imageAlt}
            borderRadius="lg"
            objectFit="cover"
          />

          <Box p={5}>
            <Box display="flex" alignItems="baseline" noOfLines={1}>
              {jenis.map((item, index) => (
                <Badge
                  borderRadius="full"
                  px="2"
                  colorScheme={
                    index === 0 ? 'teal' : index === 1 ? 'red' : 'purple'
                  }
                  key={index}
                  mr={2}
                >
                  {jenis[index]}
                </Badge>
              ))}
            </Box>

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
                {totalp} terjual | Disukai {disukai}
              </Box>
            </Box>
            {renderInputOrButton()}
          </Box>
        </Box>
      </Box>
    )
  }

  const {
    someValue,
    updateContextValue,
    GetFullMenu,
    fullMenu,
    topSeller,
    favorite,
    filteredItems,
    recommendationItems,
    GetFullDrink,
    fullDrink,
    promo
  } = useContext(MyContext)
  const [newValue, setNewValue] = useState('')

  const handleChange = event => {
    setNewValue(event.target.value)
  }

  const handleSubmit = () => {
    updateContextValue(newValue)
  }

  const [seasonal, setSeasonal] = useState([])

  useEffect(() => {
    GetFullMenu()
    GetFullDrink()
    // const newItem = { firstname: 'Kaylee', lastname: 'Frye' }
    // setItems(prevItems => [...prevItems, newItem])
    // console.log(items)
  }, [])

  return (
    <Layout>
      {/* <div>
        <div>Current Value: {someValue}</div>
        <input type="text" value={newValue} onChange={handleChange} />
        <button onClick={handleSubmit}>Update Value</button>
      </div> */}
      {/* <div>
        {' '}
        {recommendationItems.map(
          (data, index) =>
            // Step 2: Use map function to loop through the array and create a box with text
            data.nama
        )}
      </div> */}
      <Container maxW="x1" flexDirection="row">
        {/* Left Carousel */}
        <Section delay={0.4}>
          <Flex pt={5} direction={{ base: 'column', md: 'row' }}>
            {/* Left Carousel */}
            <Box flex={1} px={2} w={{ base: '100%', md: '50%' }}>
              <Heading as="h3" variant="section-title" pl={2}>
                Top Seller
              </Heading>
              <Carousel
                // swipeable={false}
                draggable={false}
                responsive={responsive}
                ssr={true}
                itemClass="carousel-item-padding-40-px"
              >
                {topSeller.map((data, index) =>
                  // Step 2: Use map function to loop through the array and create a box with text
                  foodCard(
                    data.nama,
                    data.harga,
                    data.jenis,
                    data.url,
                    data.totalp,
                    data.disukai,
                    index
                  )
                )}
              </Carousel>

              {/* Rest of the left side content */}
            </Box>

            {/* Right Carousel */}
            <Box flex={1} w={{ base: '100%', md: '50%' }} px={2}>
              <Heading as="h3" variant="section-title" pl={2}>
                Favorite
              </Heading>
              <Carousel
                responsive={responsive}
                draggable={false}
                ssr={true}
                itemClass="carousel-item-padding-40-px"
              >
                {favorite.map((data, index) =>
                  // Step 2: Use map function to loop through the array and create a box with text
                  foodCard(
                    data.nama,
                    data.harga,
                    data.jenis,
                    data.url,
                    data.totalp,
                    data.disukai,
                    index
                  )
                )}
              </Carousel>

              {/* Rest of the right side content */}
            </Box>
          </Flex>
        </Section>
        <Section delay={0.5}>
          <Flex pt={5} direction={{ base: 'column', md: 'row' }}>
            {/* Left Carousel */}
            <Box flex={1} px={2} w={{ base: '100%', md: '50%' }}>
              <Heading as="h3" variant="section-title" pl={2}>
                Seasonal Menu
              </Heading>
              <Carousel
                draggable={false}
                responsive={responsive}
                ssr={true}
                itemClass="carousel-item-padding-40-px"
              >
                {filteredItems.map((data, index) =>
                  // Step 2: Use map function to loop through the array and create a box with text
                  foodCard(
                    data.nama,
                    data.harga,
                    data.jenis,
                    data.url,
                    data.totalp,
                    data.disukai,
                    index
                  )
                )}
              </Carousel>

              {/* Rest of the left side content */}
            </Box>

            {/* Right Carousel */}
            <Box flex={1} w={{ base: '100%', md: '50%' }} px={2}>
              <Heading as="h3" variant="section-title" pl={2}>
                Promo Deals
              </Heading>
              <Carousel
                draggable={false}
                responsive={responsive}
                ssr={true}
                itemClass="carousel-item-padding-40-px"
              >
                {promo.map((data, index) =>
                  // Step 2: Use map function to loop through the array and create a box with text
                  foodCard(
                    data.nama,
                    data.harga,
                    data.jenis,
                    data.url,
                    data.totalp,
                    data.disukai,
                    index
                  )
                )}
              </Carousel>

              {/* Rest of the right side content */}
            </Box>
          </Flex>
        </Section>
        <Box
          flex={1}
          px={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Heading as="h3" variant="section-title" pl={2}>
            Makanan
          </Heading>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing={2}>
            {fullMenu.map((data, index) =>
              foodCard(
                data.nama,
                data.harga,
                data.jenis,
                data.url,
                data.totalp,
                data.disukai,
                index
              )
            )}
          </SimpleGrid>
        </Box>
        <Box
          flex={1}
          px={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Heading as="h3" variant="section-title" pl={2}>
            Minuman
          </Heading>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing={2}>
            {fullDrink.map((data, index) =>
              foodCard(
                data.nama,
                data.harga,
                data.jenis,
                data.url,
                data.totalp,
                data.disukai,
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
