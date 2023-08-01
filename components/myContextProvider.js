// MyContextProvider.js
import React, { useState } from 'react'
import MyContext from './myContext'
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
const MyContextProvider = ({ children }) => {
  // Define the state or data you want to share
  const [data, setData] = useState({
    someValue: 'Hello from Context!'
    // add more values as needed
  })
  const getInitialOrders = () => []
  const [orders, setOrders] = useState(getInitialOrders)
  const [fullMenu, setFullMenu] = useState([])
  const [promo, setPromo] = useState([])
  const [emailList, setEmailList] = useState([])
  // Function to update the context state
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  async function GetEmailsFromOrdersCollection() {
    const full = query(collection(db, 'order'), orderBy('nama', 'asc'))
    const fullSnapshot = await getDocs(full)
    const uniqueEmails = new Set()

    fullSnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const email = doc.data().email
      uniqueEmails.add(email)
    })

    setEmailList(Array.from(uniqueEmails))
  }
  async function GetFullMenu() {
    const full = query(collection(db, 'item'), orderBy('nama', 'asc'))
    const fullSnapshot = await getDocs(full)
    // console.log(season)
    const newFulls = []

    fullSnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const newFull = {
        nama: doc.data().nama,
        harga: doc.data().harga,
        kode: doc.data().kode,
        totalp: doc.data().totalp,
        url: doc.data().url
      }
      newFulls.push(newFull)
      // console.log(doc.id, ' => ', doc.data())
    })
    // console.log('FUll Menu:', newFulls) //
    setFullMenu(newFulls)
  }

  const updateContextValue = newValue => {
    setData(prevData => ({
      ...prevData,
      someValue: newValue
    }))
  }
  const addOrder = (nama, harga, url, jumlah) => {
    const newOrder = { nama, harga, url, jumlah }
    // Step 1: Create a copy of the current orders array
    const updatedOrders = [...orders]

    // Step 2: Add the new order to the copy of the orders array
    updatedOrders.push(newOrder)

    // Step 4: Update the state with the modified orders array
    setOrders(updatedOrders)
  }
  const setJumlah = (nama, newJumlah) => {
    // Use the map function to create a new array with updated "jumlah" values
    const updatedOrders = orders.map(order => {
      if (order.nama === nama) {
        return { ...order, jumlah: order.jumlah + 1 } // Update the jumlah value
      }

      return order // Return the original order if the "nama" doesn't match
    })

    setOrders(updatedOrders)
    // console.log(orders) // Update the state with the new array
  }
  const deleteOrder = ({ nama }) => {
    const updatedOrders = orders.filter(order => order.nama !== nama)

    setOrders(updatedOrders)

    // console.log(nama)
  }
  const resetOrder = () => {
    setOrders(getInitialOrders())
    // console.log(nama)
  }

  const minJumlah = (nama, newJumlah) => {
    // Use the map function to create a new array with updated "jumlah" values
    const updatedOrders = orders.map(order => {
      if (order.nama === nama) {
        return { ...order, jumlah: order.jumlah - 1 } // Update the jumlah value
      }
      return order // Return the original order if the "nama" doesn't match
    })

    setOrders(updatedOrders)
    console.log(orders) // Update the state with the new array
  }
  const calculateTotalPrice = () => {
    return orders.reduce((total, order) => {
      return total + order.harga * order.jumlah
    }, 0)
  }

  return (
    <MyContext.Provider
      value={{
        ...data,
        updateContextValue,
        orders,
        addOrder,
        setJumlah,
        minJumlah,
        deleteOrder,
        calculateTotalPrice,
        GetFullMenu,
        fullMenu,
        promo,
        resetOrder,
        GetEmailsFromOrdersCollection,
        emailList
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

export default MyContextProvider
