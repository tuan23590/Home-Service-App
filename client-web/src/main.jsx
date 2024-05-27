import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import router from './router'
import { Container } from '@mui/material'
import './firebase/config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Container maxWidth='lg' sx={{textAlign: 'center'}}>

  </Container>
  <RouterProvider router={router}/>
  </React.StrictMode>,
)
