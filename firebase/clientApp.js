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
import firebaseConfig from '../components/firebaseConfig'

async function getCities() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  var foodName = 'Correction Tape V-tec Kecil'
  try {
    const docRef = await addDoc(collection(db, 'item'), {
      nama: foodName,
      kode: 'A118',
      totalp: 9,
      harga: 3000,
      url: 'https://firebasestorage.googleapis.com/v0/b/strategipenjualan-b6f42.appspot.com/o/Correction%20Tape%20V-tec%20Kecil.jpg?alt=media&token=0fc778e9-0fdf-4c80-88d8-1c47b41a3a6e'
    })
    console.log('Document written with ID: ', docRef.id)
    console.log(foodName)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}
export async function SendEmail({ to, subject, html }) {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  console.log('to:', to)
  console.log('subject:', subject)
  console.log('html:', html)
  try {
    const docRef = await addDoc(collection(db, 'mail'), {
      to: to,
      message: {
        subject: subject,
        html: html
      }
    })
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}
async function submitOrder({ order, nama, note, email, total }) {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const currentDate = new Date()

  console.log('order:', order)
  console.log('nama:', nama)
  console.log('note:', note)
  console.log('email:', email)
  console.log('total:', total)
  console.log('date:', currentDate)
  try {
    const docRef = await addDoc(collection(db, 'order'), {
      nama: nama,
      order: order,
      note: note,
      email: email,
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
