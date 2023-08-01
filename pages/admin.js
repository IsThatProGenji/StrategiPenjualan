import NextLink from 'next/link'
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button,
  Select,
  HStack,
  FormLabel,
  Input,
  Textarea
} from '@chakra-ui/react'
import MyContext from '../components/myContext'
import { useEffect, useContext, useState } from 'react'
import { SendEmail } from '../firebase/clientApp'
import ProductTable from '../components/productTable'
const Admin = () => {
  const { GetEmailsFromOrdersCollection, emailList } = useContext(MyContext)
  useEffect(() => {
    GetEmailsFromOrdersCollection()
  }, [])
  const [formValues, setFormValues] = useState({
    subject: '',
    html: '',
    email: ''
  })
  const handleChange = e => {
    const { name, value } = e.target
    setFormValues(prevValues => ({ ...prevValues, [name]: value }))
  }
  const handleEmailChange = e => {
    const { value } = e.target
    setFormValues(prevValues => ({ ...prevValues, email: value }))
  }
  const submitOrderHandler = async () => {
    SendEmail({
      html: formValues.html,
      subject: formValues.subject,
      to: formValues.email
    })
  }

  return (
    <Container>
      <Heading as="h1">Admin</Heading>

      <Select
        style={{
          borderColor: 'black', // Change this to your desired border color
          borderWidth: '2px' // You can adjust the border width as needed // Add padding inside the input for better visual appearance (optional)
        }}
        p={2}
        placeholder="Pilih Email"
        onChange={handleEmailChange}
      >
        {emailList.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <HStack p={2} paddingTop={5}>
        <FormLabel htmlFor="desc">Subject:</FormLabel>
        <Input
          name="subject"
          onChange={handleChange}
          style={{
            borderColor: 'black', // Change this to your desired border color
            borderWidth: '2px' // You can adjust the border width as needed // Add padding inside the input for better visual appearance (optional)
          }}
        />
      </HStack>
      <Box p={2}>
        <FormLabel htmlFor="desc"> Isi Email:</FormLabel>
        <Textarea
          id="desc"
          name="html"
          style={{
            borderColor: 'black', // Change this to your desired border color
            borderWidth: '2px' // You can adjust the border width as needed // Add padding inside the input for better visual appearance (optional)
          }}
          onChange={handleChange}
        />
      </Box>
      <Box my={6} align="center">
        <Button colorScheme="purple" onClick={submitOrderHandler}>
          Kirim
        </Button>
      </Box>
      <Heading as="h1" fontSize="xl">
        Hasil Peramalan Barang di Bulan Januari 2022
      </Heading>
      <ProductTable />
    </Container>
  )
}

export default Admin
