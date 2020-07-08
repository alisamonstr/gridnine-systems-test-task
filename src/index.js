import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { ThemeProvider } from '@material-ui/core/styles'

import * as serviceWorker from './serviceWorker'
import Flights from './containers/Flights'
import { FlightsProvider } from './contexts'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#0076ff' },
    background: { default: '#fff' },
  },
  typography: {
    body1: {
      fontSize: '14px',
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <FlightsProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Flights />
      </ThemeProvider>
    </FlightsProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
