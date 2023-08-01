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
function NumberInput({ nama }) {
  const { setJumlah, orders, minJumlah, deleteOrder } = useContext(MyContext)

  const [value, setValue] = useState(1)
  let order = null
  for (const o of orders) {
    if (o.nama === nama) {
      order = o
      break
    }
  }
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
      {order != null && order.jumlah && order.jumlah === 1 ? (
        <IconButton
          aria-label="Call Segun"
          icon={<LuTrash2 />}
          size={'sm'}
          borderRadius={'full'}
          onClick={handleDelete}
        />
      ) : (
        <IconButton
          aria-label="Call Segun"
          icon={<LuMinus />}
          size={'sm'}
          borderRadius={'full'}
          onClick={handleDecrement}
        />
      )}
      <Input
        size={'sm'}
        value={order != null ? order.jumlah : 0}
        onChange={handleInputChange}
        borderRadius={'full'}
        min={0}
      />

      <IconButton
        borderRadius={'full'}
        aria-label="Call Segun"
        icon={<LuPlus />}
        size={'sm'}
        onClick={handleIncrement}
      />
    </HStack>
  )
}
export default NumberInput
