import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  IconButton,
  Box,
  FormLabel,
  Select,
  Stack,
  Textarea,
  Image,
  Flex,
  Text,
  HStack,
  ScrollView,
  Heading,
  Img,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import { LuShoppingCart } from 'react-icons/lu'
import { useDisclosure } from '@chakra-ui/react'
import React, { useRef, useContext, useState, useEffect } from 'react'
import NumberInput from './numberinput'
import MyContext from './myContext'
import { formatToRupiah } from './formatPrice'
import firebaseConfig from './firebaseConfig'
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
import Carousel from 'react-multi-carousel'
import submitOrder from '../firebase/clientApp'
function DrawerExample() {
  const {
    orders,
    calculateTotalPrice,
    addOrder,
    seasonal,
    topSeller,
    recommendationItems,
    setOrders,
    resetOrder
  } = useContext(MyContext)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  }

  function foodCard(nama, harga, jenis, url, totalp, disukai, index) {
    const property = {
      imageUrl: url,
      imageAlt:
        'https://firebasestorage.googleapis.com/v0/b/restaurant-7305c.appspot.com/o/Nasi%20Goreng%20Special.jpg?alt=media&token=3d21ba80-0665-43d7-bf52-1476eca203c9',
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

  const { isOpen, onOpen, onClose } = useDisclosure()
  const totalPrice = formatToRupiah(calculateTotalPrice())

  const [formValues, setFormValues] = useState({
    nama: '',
    noMeja: '',
    option: 'dinein', // Default value for the "Choose an Option" select
    orderNote: '',
    feedback: ''
  })
  const handleChange = e => {
    const { name, value } = e.target
    setFormValues(prevValues => ({ ...prevValues, [name]: value }))
  }
  const submitOrderHandler = async () => {
    submitOrder({
      order: orders,
      nama: formValues.nama,
      feedback: formValues.feedback,
      nomeja: formValues.noMeja,
      note: formValues.orderNote,
      opsi: formValues.option,
      total: totalPrice
    })
    onClose()
    resetOrder([])
  }
  const btnRef = React.useRef()
  const OrderItem = ({ item, index }) => {
    return (
      <Flex alignItems="center" pb={3}>
        <Box flex={1} key={index}>
          <Image src={item.url} borderRadius="lg" alt="ayam katsu" />
        </Box>
        <Box
          flex={1}
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          pl={5}
        >
          <Text pb={1}>{item.nama}</Text>
          <Text pb={2}> {formatToRupiah(item.harga)}</Text>
          <Box maxW="125px" pb={2}>
            {' '}
            <NumberInput nama={item.nama} />
          </Box>
        </Box>
      </Flex>
    )
  }
  return (
    <>
      <IconButton
        colorScheme="teal"
        aria-label="Call Segun"
        ref={btnRef}
        onClick={onOpen}
        icon={<LuShoppingCart />}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={'sm'}
        style={{
          // Set a fixed height and allow the content to scroll vertically
          // Adjust the height to fit your requirements
          overflowY: 'auto'
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Shopping Cart</DrawerHeader>
          <DrawerBody>
            {orders.length === 0 ? ( // Check if the orders array is empty
              <Text textAlign="center" fontWeight="bold" fontSize="xl" py={6}>
                Add Items To Your Cart First.
              </Text>
            ) : (
              <Stack spacing="24px" pt={3}>
                {/* Rendering Flex with Image for each item in orders */}
                {orders.map((item, index) => (
                  <OrderItem key={index} item={item} /> // Use index as the key prop
                ))}
                <FormLabel htmlFor="option">You May Like :</FormLabel>
                <Box flex={1}>
                  <Carousel
                    draggable={false}
                    responsive={responsive}
                    ssr={true}
                    itemClass="carousel-item-padding-40-px"
                  >
                    {recommendationItems.map((data, index) =>
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
                <Box>
                  <FormLabel htmlFor="desc">Nama</FormLabel>
                  <Input name="nama" onChange={handleChange} />
                </Box>
                <Flex>
                  <Box maxW={'30%'}>
                    <FormLabel htmlFor="option">No Meja</FormLabel>
                    <Input name="noMeja" onChange={handleChange} />
                  </Box>
                  <Box pl={5}>
                    <FormLabel htmlFor="option">Choose an Option</FormLabel>
                    <Select
                      id="option"
                      name="option"
                      defaultValue="dinein"
                      onChange={handleChange}
                    >
                      <option value="dinein">Dine In</option>
                      <option value="takeaway">Take Away</option>
                    </Select>
                  </Box>
                </Flex>

                <Box>
                  <FormLabel htmlFor="desc">Order Note</FormLabel>
                  <Textarea
                    id="desc"
                    name="orderNote"
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="desc">Feedback</FormLabel>
                  <Textarea id="desc" name="feedback" onChange={handleChange} />
                </Box>

                <Box
                  flex={1}
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                >
                  <Text pb={1}>Total : {totalPrice}</Text>
                </Box>
              </Stack>
            )}
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>

            {orders.length > 0 && (
              <Button colorScheme="blue" onClick={submitOrderHandler}>
                Order
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
export default DrawerExample
