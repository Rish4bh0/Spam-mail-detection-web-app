import { Flex, Image, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
    const {colorMode, toggleColorMode} = useColorMode()
  return (
  <Flex justifyContent={"center"} mt={6} mb="12" >
    <Image
        cursor={"pointer"}
        alt='logo'
        w={10}
        src={colorMode === "dark" ? "/spam-light.png": "/spam-dark.png"}
        onClick={toggleColorMode}
    />
  </Flex>
  )
}

export default Header