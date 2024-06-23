import React, { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const UserInput: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [predictions, setPredictions] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue: string = e.target.value;
    setText(inputValue);
  };

  const handleClassify = () => {
    setLoading(true);
    axios
      .post("https://spam-mail-detection-web-app.vercel.app/classify", { text })
      .then((response) => {
        setPredictions(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(()=>{
        setLoading(false);
      });
  };

  return (
    <>
      <VStack>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Box>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              Spam mail detection
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"sm"}>Hyper</Text>
              <Text
                fontSize={{
                  base: "xs",
                  md: "sm",
                  lg: "md",
                }}
                bg={useColorModeValue("gray.dark", "gray.dark")}
                color={useColorModeValue("white", "gray.light")}
                p={1}
                borderRadius={"full"}
              >
                www.hyper.net
              </Text>
            </Flex>
          </Box>
          <Box>
            <Avatar
              name="Hyper"
              //src="/zuck-avatar.png"
              size={"lg"}
            />
          </Box>
        </Flex>

        <Divider my={4} />

        <Flex w={"full"} justifyContent={"center"} gap={4}>
          <Box w={"full"}>
            <Text fontSize={"2xl"} fontWeight={"bold"} my={2}>
              Enter spam/ham email:
            </Text>
            <Flex w={"full"} alignItems={"center"}>
              <Textarea
                value={text}
                onChange={handleInputChange}
                placeholder="Please enter sentences or email that you want to classify as spam or not spam."
                size="sm"
                w={"full"}
              />
            </Flex>
            <Button onClick={handleClassify} my={4} w={"full"}  color={"white"} bg={useColorModeValue("gray.dark", "gray.dark")}>
              Classify Text
            </Button>
          </Box>
        </Flex>
        
        {loading ? ( 

<Box padding='6' boxShadow='lg' bg={useColorModeValue("white", "gray.dark")} w={"full"}>
<SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
</Box>
           
        ) : (
          predictions && (
          <Card w={"full"} bg={useColorModeValue("white", "gray.dark")}>
            <CardHeader>
              <Heading size="md">Predictions</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Naive Bayes
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    Prediction: {predictions["Naive Bayes"]}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    SVM
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    Prediction: {predictions["SVM"]}
                    KNN Prediction: {predictions["KNN"]}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    KNN
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    Prediction: {predictions["KNN"]}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
          )
        )}

        <Divider my={4} />
      </VStack>
    </>
  );
};

export default UserInput;
