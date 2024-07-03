import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

// Define keyframes for the animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

function Homepage() {
  const history = useHistory();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Use the animation if the user doesn't prefer reduced motion
  const animation = prefersReducedMotion ? undefined : `${fadeIn} 1s ease-out`;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent className="neumorphism-container">
      <Text
        fontSize="3xl"
        fontWeight="bold"
        color="purple.400"
        animation={animation}
        mb={4}
      >
        Welcome to Talk Point
      </Text>
      <Box w="100%" p={4} className="neumorphism-box">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab _selected={{ color: "white", bg: "purple.400" }}>Login</Tab>
            <Tab _selected={{ color: "white", bg: "purple.400" }}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
