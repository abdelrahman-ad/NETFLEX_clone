import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider ,ColorModeScript} from '@chakra-ui/react'
import { theme } from '../themes.js'
import {
 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AuthProvider } from './context/authProvider.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
 <ChakraProvider theme={theme}>
  <AuthProvider>
    <App />
  </AuthProvider>
  </ChakraProvider>
  </QueryClientProvider> 
)
