import Link from 'next/link'
import { Text, useColorModeValue } from '@chakra-ui/react'
import FootprintIcon from './icons/footprint'
import styled from '@emotion/styled'
import Image from 'next/image'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  > svg {
    transition: 200ms ease;
  }

  &:hover > svg {
    transform: rotate(20deg);
  }
`

const Logo = () => {
  const printimg = '/apple-touch-icon.png'
  return (
    <Link href="/" scroll={false}>
      <LogoBox>
        <Image src={printimg} width={20} height={20} />
        <Text
          color={useColorModeValue('gray.800', 'whiteAlpha.900')}
          fontFamily='M PLUS Rounded 1c", sans-serif'
          fontWeight="bold"
          ml={3}
          fontSize="xs"
        >
          Atok Rizal Jagonya Sate
        </Text>
      </LogoBox>
    </Link>
  )
}

export default Logo
