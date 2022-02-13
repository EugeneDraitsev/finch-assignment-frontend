import React from 'react'
import ReactDOM from 'react-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { lightBlue } from '@mui/material/colors'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: lightBlue[200],
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
