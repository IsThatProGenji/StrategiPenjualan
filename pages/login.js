import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Container, FormLabel, Heading, Input } from '@chakra-ui/react'

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const router = useRouter()

  const handleChange = e => {
    const { name, value } = e.target
    setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    // Check if the username and password are correct
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      // If the credentials are correct, navigate to the Admin page
      router.push('/admin')
    } else {
      // If the credentials are incorrect, show an error message to the user
      alert('Invalid username or password. Please try again.')
    }
  }

  return (
    <Container>
      <Heading p={2} as="h1">
        Login
      </Heading>
      <FormLabel p={2} htmlFor="desc">
        Username
      </FormLabel>

      <Input
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleChange}
        style={{
          borderColor: 'black', // Change this to your desired border color
          borderWidth: '2px' // You can adjust the border width as needed // Add padding inside the input for better visual appearance (optional)
        }}
      />
      <FormLabel p={2} htmlFor="desc">
        Password
      </FormLabel>

      <Input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        style={{
          borderColor: 'black', // Change this to your desired border color
          borderWidth: '2px' // You can adjust the border width as needed // Add padding inside the input for better visual appearance (optional)
        }}
      />

      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      >
        <Button onClick={handleSubmit} colorScheme="purple">
          Login
        </Button>
      </div>
    </Container>
  )
}

export default LoginPage
