import {
  HStack,
  Button,
  Input,
  useNumberInput,
  IconButton,
  Text
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import MyContext from './myContext'
import { LuTrash2, LuPlus, LuMinus } from 'react-icons/lu'
function NumberInput2({ nama }) {
  const { setJumlah, orders, minJumlah, deleteOrder } = useContext(MyContext)

  const [value, setValue] = useState(1)
  const order = orders.find(order => order.nama === nama)
  const handleIncrement = () => {
    // When the "+" button is clicked, increment the value and update the context
    const newValue = value + 1
    setValue(newValue)
    setJumlah(nama, newValue)
  }

  const handleDecrement = () => {
    // When the "-" button is clicked, decrement the value and update the context
    const newValue = Math.max(0, value - 1)
    setValue(newValue)
    minJumlah(nama, newValue)
  }
  const handleDelete = () => {
    deleteOrder((nama = { nama }))
  }

  const handleInputChange = event => {
    // When the input value is changed, update the state and context
    const newValue = parseInt(event.target.value, 10)
    setValue(newValue)
    setJumlah(nama, newValue)
  }

  return (
    <HStack>
      {order.jumlah === 1 ? (
        <IconButton
          aria-label="Call Segun"
          icon={<LuTrash2 />}
          size={'sm'}
          onClick={handleDelete}
        />
      ) : (
        <IconButton
          aria-label="Call Segun"
          icon={<LuMinus />}
          size={'sm'}
          onClick={handleDecrement}
        />
      )}
      <Input
        size={'sm'}
        value={order.jumlah}
        onChange={handleInputChange}
        min={0}
      />

      <IconButton
        aria-label="Call Segun"
        icon={<LuPlus />}
        size={'sm'}
        onClick={handleIncrement}
      />
    </HStack>
  )
}
export default NumberInput2
