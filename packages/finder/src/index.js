import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render((<App/>), document.getElementById('container'))

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}
