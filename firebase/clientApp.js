import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Tab } from 'react-md'
const firebaseConfig = {
  apiKey: 'AIzaSyDE-1OZl0wNOQxxrZST194KD3U1kLW9Qy4',
  authDomain: 'restaurant-7305c.firebaseapp.com',
  projectId: 'restaurant-7305c',
  storageBucket: 'restaurant-7305c.appspot.com',
  messagingSenderId: '872390095470',
  appId: '1:872390095470:web:ef12a7ed5bfe5d2ddd2c7f',
  measurementId: 'G-9DGLGTQ0X0'
}

async function getCities() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  var foodName = 'Brown Sugar Iced Coffe'
  try {
    const docRef = await addDoc(collection(db, 'minuman'), {
      nama: foodName,
      jenis: ['Dingin'],
      harga: 14500,
      totalp: 15,
      disukai: 2
    })
    console.log('Document written with ID: ', docRef.id)
    console.log(foodName)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

async function submitOrder({
  order,
  nama,
  nomeja,
  opsi,
  note,
  feedback,
  total
}) {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const currentDate = new Date()
  try {
    const docRef = await addDoc(collection(db, 'order'), {
      nama: nama,
      order: order,
      nomeja: nomeja,
      opsi: opsi,
      note: note,
      feedback: feedback,
      total: total,
      date: currentDate
    })
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

async function GetMenu() {
  const [items, setItems] = useState()
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const q = query(collection(db, 'makanan'), orderBy('nama', 'asc'), limit(5))
  try {
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const newItem = { nama: doc.data().nama, harga: doc.data().harga }
      setItems([...items, newItem])
      console.log(doc.id, ' => ', doc.data())
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }
  console.log(items)
  return items
}
export default submitOrder
