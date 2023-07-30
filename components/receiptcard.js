import { Box, Text, Badge } from '@chakra-ui/react'

const ReceiptCard = ({ orderData }) => {
  const { feedback, nama, nomeja, note, opsi, order, date, total } = orderData
  const milliseconds =
    date.seconds * 1000 + Math.floor(date.nanoseconds / 1000000)

  // Create a new Date object using the milliseconds
  const formattedDate = new Date(milliseconds)

  // Extract the components of the date
  const year = formattedDate.getFullYear()
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0') // Months are zero-based, so we add 1
  const day = String(formattedDate.getDate()).padStart(2, '0')
  const hours = String(formattedDate.getHours()).padStart(2, '0')
  const minutes = String(formattedDate.getMinutes()).padStart(2, '0')
  const seconds = String(formattedDate.getSeconds()).padStart(2, '0')

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box borderWidth="1px" borderRadius="md" p={4} mb={4} maxWidth="600px">
        {/* Order Feedback */}
        {feedback && (
          <Box mb={4}>
            <Badge colorScheme="teal" fontSize="sm" mb={2}>
              Feedback
            </Badge>
            <Text>{feedback}</Text>
          </Box>
        )}
        {/* Order Details */}
        <Box mb={4}>
          <Badge colorScheme="teal" fontSize="sm" mb={2}>
            Order Details
          </Badge>
          <Text>
            Nama: {nama} - No Meja: {nomeja}
          </Text>
          <Text>Note: {note}</Text>
          <Text>Opsi: {opsi}</Text>
        </Box>
        {/* Ordered Items */}
        <Box>
          <Badge colorScheme="teal" fontSize="sm" mb={2}>
            Ordered Items
          </Badge>
          {order.map((item, index) => (
            <Text key={index}>
              {item.nama} - Qty: {item.jumlah} - Price: ${item.harga}
            </Text>
          ))}
        </Box>{' '}
        <Text>
          Total: {total} - No Meja: {year}-{month}-{day} ({hours}.{minutes})WIB
        </Text>
      </Box>
    </div>
  )
}

export default ReceiptCard
