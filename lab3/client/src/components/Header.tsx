import React from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Grid,
  Text,
} from "@chakra-ui/react";
import { CONTENT_MAX_WIDTH, HEADER_HEIGHT } from "../constants";
import { FaUser } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import useLogout from "../mutations/useLogout";
import useUser from "../queries/useUser";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { data: user, isLoading } = useUser();
  const { mutateAsync: logout } = useLogout();
  const navigate = useNavigate();
  async function tryLogout() {
    await logout();
    navigate("/");
  }

  return (
    <>
      <Box bg="white">
        <Grid
          templateColumns="1fr auto 1fr"
          h={HEADER_HEIGHT}
          mx="auto"
          maxW={CONTENT_MAX_WIDTH}
          py={4}
          px={8}
        >
          <Flex justify="flex-start" align="center"></Flex>
          <Flex justify="center" align="center">
            <Text fontWeight="bold">DOODLE</Text>
          </Flex>
          <Flex align="center" justify="flex-end">
            {!user || isLoading ? (
              <Button
                variant="link"
                as="a"
                href="/login"
                leftIcon={<Icon as={FaUser} />}
              >
                Login
              </Button>
            ) : (
              <Box textAlign="right">
                <Text color="gray.500" fontSize="xs">
                  Logged in as
                </Text>
                <Menu>
                  <MenuButton>
                    <Text color="gray.500" fontSize="sm">
                      {user.username}
                    </Text>
                  </MenuButton>
                  <MenuList>
                    <MenuItem icon={<Icon as={FaUser} />}>My Polls</MenuItem>
                    <MenuItem
                      onClick={tryLogout}
                      icon={<Icon as={GoSignOut} />}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            )}
          </Flex>
        </Grid>
        <Divider />
      </Box>
    </>
  );
};

export default Header;
