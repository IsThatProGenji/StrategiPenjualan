import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import React, { useEffect, useState } from 'react'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'

const firebaseConfig = {
  apiKey: 'AIzaSyDE-1OZl0wNOQxxrZST194KD3U1kLW9Qy4',
  authDomain: 'restaurant-7305c.firebaseapp.com',
  projectId: 'restaurant-7305c',
  storageBucket: 'restaurant-7305c.appspot.com',
  messagingSenderId: '872390095470',
  appId: '1:872390095470:web:ef12a7ed5bfe5d2ddd2c7f',
  measurementId: 'G-9DGLGTQ0X0'
}

async function getPic() {
  const app = initializeApp(firebaseConfig)

  const storage = getStorage(app)
  getDownloadURL(ref(storage, 'Ayam Popcorn.jpg'))
    .then(url => {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      const xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      xhr.onload = event => {
        const blob = xhr.response
      }
      xhr.open('GET', url)
      xhr.send()

      // Or inserted into an <img> element
      const img = document.getElementById('myimg')
      img.setAttribute('src', url)
      console.log(xhr)
      return url
    })
    .catch(error => {
      // Handle any errors
    })
}
export default getPic
