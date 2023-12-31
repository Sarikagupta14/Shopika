import { Box, Button, Flex, Heading, Image, Input, InputGroup, InputLeftElement, SimpleGrid, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FcSearch } from "react-icons/fc";
const Footware = () => {
  const result = JSON.parse(localStorage.getItem('email'))
    const[data, setData] = useState([])
    const [userData, setUser] = useState({ search: '' });
    const fetchApi = async () => {
      try {
        const res = await fetch('https://data-j8xq.onrender.com/footwareData');
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    const handlechange = (event) => {
      const { name, value } = event.target;
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value
      }));
    };
    useEffect(()=>{
        fetchApi()
        console.log(data)
    })
  return (
    <Box  backgroundColor={'#F6F7F9'}>
    <Box w={'95%'} m={'auto'}>
                                  {/* Input group */}
<Flex ml="20px" mb={'-14'} w={{ base: "80%", md: "50%", lg: "30%" }}>
<InputGroup>
<InputLeftElement
    ml="12px"
    mt="13px"
    h="35px"
    bgColor="transparent"
    pointerEvents="none"
    children={<FcSearch />}
    color="gray.300"
  />
  <Input
  mb={'20px'}
    bgColor="gray.100"
    border="2px solid teal"
    mt="10px"
    h="40px"
    w="100%"
    name="search"
    value={userData.search}
    ml="10px"
    onChange={handlechange}
    color="black"
    type="search"
    placeholder="Search here"
/>
</InputGroup>
</Flex>
        {/* <Heading color={'white'}>Men's wear</Heading> */}
    <SimpleGrid gap={'30px'}  mt={'50px'} 
    columns={[1,2,3,4]}>{
      data && data.filter((item) => {
        if (!userData.search) { 
          console.log(userData.searchitem)
          return item;
       
        } else if (
          item.brand?.toLowerCase().includes(userData.search.toLowerCase())
        ) {
          return item;
        } else if (
          item.name?.toLowerCase().includes(userData.search.toLowerCase())
        ) {
          return item;
        } else {
        
          return null;
        
        }
      }
      )
        .map((item)=>{
            return(
              <Box

           
              p="20px"
              borderRadius={'20px'}
              backgroundColor={'white'}
            
              // borderTopLeftRadius={'30px'}
              // borderBottomRightRadius={'30px'}
              > 
               
              <Image borderRadius={'20px'}  h={'270px'} w={'250px'} src={item.image} alt=''/>
              <Heading p={'5px'} color={'#5F6A6A'} fontSize={'18px'}>{item.name}</Heading>
              <Text p={'5px'} color={'black'} fontSize={'15px'} fontWeight={'400'}>{item.brand}</Text>
              <Flex ml={'5px'} gap={'10px'}>
               <Text fontSize={'15px'} fontWeight={'600'} color={'black'}>₹{item.price}</Text>
               {/* <Text fontWeight={'500'} color={'black'}>-</Text> */}
               <Text fontSize={'15px'} fontWeight={'500'} color={'gray'} textDecoration="line-through" textDecorationColor="red">(₹{item.discount_price})</Text>
              </Flex>
      
              <Link to={result ? "/details": '/signup'} state={item}>
              <Button border={'1px solid black'} bg={'gray.300'} mb="20px" color={'black'}>View more</Button>
              </Link>
      </Box>
            )
        })
        
    }
    </SimpleGrid>
    </Box>
    </Box>
  )
}

export default Footware