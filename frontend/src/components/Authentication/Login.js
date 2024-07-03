import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="40px">
      <FormControl id="email" isRequired color="white">
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
          width="100%" 
          color="black" 
          bg="rgba(255,255,255,0.1)" // Light background
          boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)" // Neumorphic shadow
          borderRadius="md"
          _focus={{
            bg: "white",
            borderColor: "purple.400",
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
           bg="rgba(255,255,255,0.1)" // Light background
          boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)" // Neumorphic shadow
          borderRadius="md"
          _focus={{
            bg: "white",
            borderColor: "purple.400",
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
            width="100%" 
            color="black" 
          />
          <InputRightElement width="4.5rem">
            <Button  h="1.75rem"
              size="sm"
              colorScheme="purple"
              onClick={handleClick}
             
              _hover={{
                bg: "green.400",
                color: "white",
              }}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="purple"
        width="100%"
        onClick={submitHandler}
        isLoading={loading}
        boxShadow="8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff"
        borderRadius="full"
      >
        {loading ? "Logging In..." : "Login"}
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
       
        boxShadow="8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff"
        borderRadius="full"
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
