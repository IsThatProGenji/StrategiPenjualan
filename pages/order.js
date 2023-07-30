import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import { useState, useEffect } from 'react'
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'
import firebaseConfig from '../components/firebaseConfig'
import { initializeApp } from 'firebase/app'
import ReceiptCard from '../components/receiptcard'

const Order = () => {
  const [orders, setOrders] = useState([])
  function listenForOrderChanges() {
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const orderCollection = collection(db, 'order')

    // Start listening for changes to the "order" collection
    const unsubscribe = onSnapshot(
      orderCollection,
      snapshot => {
        const updatedOrders = [] // Create a new array to store the updated data
        snapshot.forEach(doc => {
          const orderData = doc.data()
          updatedOrders.push(orderData) // Push the data to the updated array
        })
        setOrders(updatedOrders) // Update the state with the new data
      },
      error => {
        console.error('Error listening for order changes:', error)
      }
    )

    return unsubscribe // Return the unsubscribe function here
  }

  useEffect(() => {
    // Call the function to start listening for changes
    const unsubscribe = listenForOrderChanges()

    // The above function returns a function to unsubscribe the snapshot listener when the component is unmounted
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <Layout title="Order">
      <Heading as="h3" fontSize={20} mb={4}>
        Order
      </Heading>
      Total Order : {orders.length}
      {orders.map((orderData, index) => (
        <ReceiptCard key={index} orderData={orderData} />
      ))}
    </Layout>
  )
}

export default Order
export { getServerSideProps } from '../components/chakra'
