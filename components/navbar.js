import { forwardRef, use, useContext } from 'react'
import Logo from './logo'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue,
  Button
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'
import { IoLogoGithub } from 'react-icons/io5'
import DrawerExample from './drawer'
import MyContext from './myContext'
const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  return (
    <Link
      as={NextLink}
      href={href}
      scroll={false}
      p={2}
      bg={active ? 'grassTeal' : undefined}
      color={active ? '#202023' : inactiveColor}
      target={target}
      {...props}
    >
      {children}
    </Link>
  )
}

const MenuLink = forwardRef((props, ref) => (
  <Link ref={ref} as={NextLink} {...props} />
))

const Navbar = props => {
  const { path } = props
  const { someValue } = useContext(MyContext)
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      zIndex={2}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="100%"
        wrap="wrap"
        justifyContent={'center'}

        // Center the content horizontally
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        <Button
          as="a" // Render the Button as an anchor tag to mimic the link behavior
          href="/login"
          fontSize="16px"
          fontWeight="bold"
          colorScheme="purple"
          marginRight={3}
        >
          Admin
        </Button>
        <DrawerExample />
      </Container>
    </Box>
  )
}

export default Navbar
