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
  const [topSeller, setTopSeller] = useState([])
  const [favorite, setFavorite] = useState([])
  const [promo, setPromo] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [recommendationItems, setRecommendationItems] = useState([])
  const [fullDrink, setFullDrink] = useState([])

  // Function to update the context state
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  async function GetFullMenu() {
    const full = query(collection(db, 'makanan'), orderBy('nama', 'asc'))
    const fullSnapshot = await getDocs(full)
    // console.log(season)
    const newFulls = []

    fullSnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const newFull = {
        nama: doc.data().nama,
        harga: doc.data().harga,
        jenis: doc.data().jenis,
        disukai: doc.data().disukai,
        totalp: doc.data().totalp,
        url: doc.data().url
      }
      newFulls.push(newFull)
      // console.log(doc.id, ' => ', doc.data())
    })
    // console.log('FUll Menu:', newFulls) //
    setFullMenu(newFulls)
    GetTopSeller(newFulls)
    GetFavorite(newFulls)
    GetFilteredItems(newFulls)
    GetPromoItems(newFulls)
  }
  async function GetFullDrink() {
    const full = query(collection(db, 'minuman'), orderBy('nama', 'asc'))
    const fullSnapshot = await getDocs(full)
    // console.log(season)
    const newFulls = []

    fullSnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const newFull = {
        nama: doc.data().nama,
        harga: doc.data().harga,
        jenis: doc.data().jenis,
        disukai: doc.data().disukai,
        totalp: doc.data().totalp,
        url: doc.data().url
      }
      newFulls.push(newFull)
      // console.log(doc.id, ' => ', doc.data())
    })
    // console.log('FUll Menu:', newFulls) //
    setFullDrink(newFulls)
  }
  const GetTopSeller = items => {
    // Sort the items based on "totalp" property in descending order
    const sortedItems = [...items].sort((a, b) => b.totalp - a.totalp)

    // Get the top 10 items
    const top10Items = sortedItems.slice(0, 10)
    setTopSeller(top10Items)
    // console.log('tiop Menu:', top10Items) //
  }
  const GetFavorite = items => {
    // Sort the items based on "totalp" property in descending order
    const sortedItems = [...items].sort((a, b) => b.disukai - a.disukai)

    // Get the top 10 items
    const top10Items = sortedItems.slice(0, 10)
    setFavorite(top10Items)
    // console.log('fav Menu:', top10Items) //
  }
  const GetFilteredItems = items => {
    // Filter the items with jenis 'Sate' or 'Nasi Goreng'
    const filteredItems = items.filter(
      item => item.jenis.includes('Seafood') || item.jenis.includes('Sate')
    )

    // Limit the result to 10 items
    const limitedItems = filteredItems.slice(0, 20)
    setFilteredItems(limitedItems)
    // console.log('filter Menu:', limitedItems) //
  }
  const GetPromoItems = items => {
    // Filter the items with jenis 'Sate' or 'Nasi Goreng'
    const filteredItems = items.filter(item => item.jenis.includes('promo'))

    // Limit the result to 10 items
    const limitedItems = filteredItems.slice(0, 10)
    setPromo(limitedItems)
    // console.log('filter Menu:', limitedItems) //
  }
  const CombinedJenis = items => {
    // Create a Set to store unique "jenis" values
    const jenisSet = new Set()

    // Loop through the items and add each "jenis" value to the set

    if (Array.isArray(items)) {
      items.forEach(item => {
        if (Array.isArray(item.jenis)) {
          item.jenis.forEach(jenis => jenisSet.add(jenis))
        }
      })
    }
    // Convert the Set back to an array
    const combinedJenisArray = Array.from(jenisSet)

    const itemsWithTargetJenis = fullMenu
      .filter(item =>
        item.jenis.some(jenis => combinedJenisArray.includes(jenis))
      )
      .slice(0, 20)
    // console.log('jenis', combinedJenisArray)
    // console.log('itemjenis', itemsWithTargetJenis)
    setRecommendationItems(itemsWithTargetJenis)
  }
  const updateContextValue = newValue => {
    setData(prevData => ({
      ...prevData,
      someValue: newValue
    }))
  }
  const addOrder = (nama, harga, url, jumlah, jenis) => {
    const newOrder = { nama, harga, url, jumlah, jenis }
    // Step 1: Create a copy of the current orders array
    const updatedOrders = [...orders]

    // Step 2: Add the new order to the copy of the orders array
    updatedOrders.push(newOrder)

    // Step 3: Call CombinedJenis function with the updated orders array
    CombinedJenis(updatedOrders)

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
    CombinedJenis(updatedOrders)
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
        topSeller,
        favorite,
        filteredItems,
        recommendationItems,
        GetFullDrink,
        fullDrink,
        promo,
        resetOrder
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

export default MyContextProvider
