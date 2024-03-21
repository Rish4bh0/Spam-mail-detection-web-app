import React, { useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  RadioGroup,
  Stack,
  Radio,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from '@chakra-ui/react';

function Example() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('top');

  return (
    <>
      <RadioGroup value={placement} onChange={(value) => setPlacement(value as typeof placement)} my={4}>
        <Stack direction='row' mb='4'>
          <Radio value="top">Top</Radio>
          <Radio value="bottom">Bottom</Radio>
          <Radio value="left">Left</Radio>
          <Radio value="right">Right</Radio>
        </Stack>
      </RadioGroup>
      <Button onClick={onOpen} w={"full"} my={8} color={"white"} bg={useColorModeValue("gray.dark", "gray.dark")}>
        Click to get test data that you can copy for prediction.
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue('white', 'gray.dark')}>
          <DrawerHeader borderBottomWidth='1px'>Data for prediction</DrawerHeader>
          <DrawerBody>
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                      Spam mail example
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon color='green.500' />
                      XXXMobileMovieClub: To use your credit, click the WAP link in the next txt message or click here http://wap. xxxmobilemovieclub.com?n=QJKGIGHJJGCBL
                    </ListItem>
                    <ListItem>
                      <ListIcon color='green.500' />
                      07732584351 - Rodger Burns - MSG = We tried to call you re your reply to our sms for a free nokia mobile + free camcorder. Please call now 08000930705 for delivery tomorrow
                    </ListItem>
                    <ListItem>
                      <ListIcon color='green.500' />
                      This is the 2nd time we have tried 2 contact u. U have won the å£750 Pound prize. 2 claim is easy, call 087187272008 NOW1! Only 10p per minute. BT-national-rate.
                    </ListItem>
                  </List>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                      Ham mail example
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon color='green.500' />
                      Aft i finish my lunch then i go str down lor. Ard 3 smth lor. U finish ur lunch already?
                    </ListItem>
                    <ListItem>
                      <ListIcon color='green.500' />
                      Great! I hope you like your man well endowed. I am &lt;#&gt; inches...
                    </ListItem>
                    <ListItem>
                      <ListIcon color='green.500' />
                      The guy did some bitching but I acted like i'd be interested in buying something else next week and he gave it to us for free
                    </ListItem>
                  </List>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Example;
