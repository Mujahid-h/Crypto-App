import { Badge, Box, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../index'
import ErrorComponent from './ErrorComponent'
import Loader from './Loader'

const CoinDetails = () => {

  const [coin, setCoin] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currency, setCurrency] = useState('pkr')  

  const params = useParams();

  const currencySymbol = currency === 'pkr' ? '₹' : currency === "eur" ? '€' : '$'


  useEffect(() => {

    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);       

        
        setCoin(data);        
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }

    }
    fetchCoin();

  }, [params.id])

  if (error) return <ErrorComponent message={'Error while fetching Coin'} />


  return (
    <Container maxW={'container.xl'} >
      {
        loading ?
          (<Loader />) :
          (
            <>             

              <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
                <HStack spacing={'4'}>
                  <Radio value={'pkr'} >PKR</Radio>
                  <Radio value={'usd'} >USD</Radio>
                  <Radio value={'eur'} >EUR</Radio>
                </HStack>
              </RadioGroup>

              <VStack p={'16'} alignItems={'flex-start'} spacing={'4'}>

                <Text
                  alignSelf={'center'}
                  fontSize={'small'}
                  opacity={'0.7'}
                  bgColor={'blackAlpha.500'}
                  color={'black'}
                >
                  Last Updated on: {Date(coin.market_data.last_updated).split('G')[0]}
                </Text>

                <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'} />

                <Stat>
                  <StatLabel>{coin.name}</StatLabel>
                  <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>

                  <StatHelpText>
                    <StatArrow type={coin.market_data.price_change_24h > 0 ? 'increase' : 'decrease'} />
                    {coin.market_data.price_change_24h}%
                  </StatHelpText>

                </Stat>

                <Badge
                  fontSize={'2xl'}
                  bgColor={'blackAlpha.700'}
                  color={'white'}
                >
                  {`#${coin.market_cap_rank}`}
                </Badge>

                <CustomBar
                  high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                  low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
                />

                <Box w={'full'} p={'4'} >
                  <Item title={'Max Supply'} value={coin.market_data.max_supply} />
                  <Item title={'Max Circulation'} value={coin.market_data.circulating_supply} />
                  <Item title={'Market Capital'}
                    value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
                  <Item title={'All Time Low'} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
                  <Item title={'All Time High'} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
                                        
                </Box>

              </VStack>
            </>
          )
      }
    </Container>
  )
}

const Item = ({ title, value }) => (
  <HStack justifyContent={'space-between'} w={'full'} my={'4'}>

    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Text>
    <Text>{value}</Text>
  </HStack>

)



const CustomBar = ({ high, low }) => (
  <VStack w={'full'}>
    <Progress w={'full'} value={50} colorScheme={'teal'} />
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge colorScheme={'red'} children={low} />
      <Text fontSize={'sm'}>24H Range</Text>
      <Badge colorScheme={'green'} children={high} />
    </HStack>
  </VStack>
)

export default CoinDetails
