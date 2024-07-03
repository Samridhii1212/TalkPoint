import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error occurred!",
        description: error.response?.data?.message || "Unknown Error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      return;
    }
    setPicLoading(true);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dvkx3llei");
      fetch("https://api.cloudinary.com/v1_1/dvkx3llei/image/upload", 
      {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="30px" align="stretch" w="100%">
      <FormControl id="first-name" isRequired>
        <Input
          placeholder="Enter Your Name"
          color="black"
          bg="rgba(255,255,255,0.1)" // Light background
          boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)" // Neumorphic shadow
          borderRadius="md"
          _focus={{
            bg: "white",
            borderColor: "purple.400",
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          color="black"
          bg="rgba(255,255,255,0.1)" // Light background
          boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)" // Neumorphic shadow
          borderRadius="md"
         _focus={{
            bg: "white",
            borderColor: "purple.400",
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password"
           color="black"
            bg="rgba(255,255,255,0.1)" 
            boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)"
            borderRadius="md"
           
            _focus={{
              bg: "white",
              borderColor: "purple.400",
              boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              colorScheme="purple"
              onClick={handleClick}
             
              _hover={{
                bg: "green.400",
                color: "white",
              }}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password-confirm" isRequired>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            color="black"
            bg="rgba(255,255,255,0.1)" // Light background
            boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)" // Neumorphic shadow
            borderRadius="md"
           
            _focus={{
              bg: "white",
              borderColor: "purple.400",
              boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
               h="1.75rem"
              size="sm"
              colorScheme="purple"
              onClick={handleClick}
             
              _hover={{
                bg: "green.400",
                color: "white",
              }}
              
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic" color="white">
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          color="black"
          bg="rgba(255,255,255,0.1)" // Light background
          boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)" // Neumorphic shadow
          borderRadius="md"
          
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
       variant="solid"
        width="100%"
        boxShadow="8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff"
        borderRadius="full"
        colorScheme="purple"
        onClick={submitHandler}
        isLoading={picLoading}
        bg="purple.400" 
        _hover={{
          bg: "purple.500",
        }}
      >
        {picLoading ? "Signing Up..." : "Sign Up"}
      </Button>
    </VStack>
  );
};

export default Signup;
