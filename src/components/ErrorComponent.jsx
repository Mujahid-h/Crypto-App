import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorComponent = ({message}) => {
  return (
    <Alert
    pos={'fixed'}
    status={'error'}
    w={'container.lg'}
    bottom={'8'}
    left={'50%'}
    transform={'translateX(-50%)'}
    >

      <AlertIcon />
      {message}

    </Alert>    
  )
}

export default ErrorComponent
