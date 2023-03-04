import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import btcSrc from '../assets/btc.png'
import { easeIn, motion } from 'framer-motion'

const Home = () => {
  return (
    <Box w={'full'} h={'85vh'} bgColor={'blackAlpha.900'}>

<motion.div
        style={{
          height: "80vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",                 
        }}
      >
        <Image
          w={"full"}
          h={"full"}
          objectFit={"contain"}
          src={btcSrc}
          filter={"grayscale(1)"}
        />
      </motion.div>

      <Text
        fontSize={'6xl'}
        fontWeight={'thin'}
        color={'whiteAlpha.600'}
        mt={'-20'}
        textAlign={'center'}
      >
        XCrypto
      </Text>
    </Box>
  )
}

export default Home