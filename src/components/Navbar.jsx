import { Link, useNavigate } from "react-router-dom";
import "../navbar.css";

import { SessionContext } from "../contexts/SessionContext";
import { useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";
import { Box, Flex, Spacer, Text, UnorderedList } from "@chakra-ui/layout";

function NavBar() {
  const { token, tokenInfo } = useContext(SessionContext);

  return (
    <div>
      <Flex className="navBar" align={"center"} justify={"center"}>
        <Link to="/">
          <Flex
            className="logo"
            fontSize={{ base: "1rem", md: "1.7rem", lg: "2.5rem" }}
            wrap={"no-wrap"}
            gap={"10px"}
            align={"center"}
            justify={"center"}
          >
            <Text
              fontSize={{ base: "1.5rem", md: "2.2rem", lg: "4rem" }}
              align={"center"}
            >
              <span>Why</span>
            </Text>
            <Text align={"center"}>Do You Know that?</Text>
          </Flex>
        </Link>
        <Spacer />
        <Box display={{ base: "none", md: "block" }}>
          <UnorderedList fontSize={{ base: "1rem", md: "1rem", lg: "1.5rem" }}>
            {!token && (
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            )}
            {!token && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {token && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            {tokenInfo && tokenInfo.payload && (
              <li>
                <Link to={`/decklist/${tokenInfo.payload._id}`}>Decks</Link>
              </li>
            )}
            {token && (
              <li>
                <Link to="/createdeck">Create a New Deck</Link>
              </li>
            )}
            <li>
              <Link to="/game">Play</Link>
            </li>
          </UnorderedList>
        </Box>
        <Box display={{ base: "block", md: "none" }}>
          <Menu>
            <MenuButton
              colorScheme="blue"
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
            />
            <MenuList>
              {!token && (
                <Link to="/signup">
                  <MenuItem>Sign Up</MenuItem>
                </Link>
              )}
              {!token && (
                <Link to="/login">
                  <MenuItem>Login</MenuItem>
                </Link>
              )}
              {token && (
                <Link to="/profile">
                  <MenuItem>Profile</MenuItem>
                </Link>
              )}
              {tokenInfo && tokenInfo.payload && (
                <Link to={`/decklist/${tokenInfo.payload._id}`}>
                  <MenuItem>Decks</MenuItem>
                </Link>
              )}
              {token && (
                <Link to="/createdeck">
                  <MenuItem>Create a New Deck</MenuItem>
                </Link>
              )}

              <Link to="/game">
                <MenuItem>Play</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </div>
  );
}

export default NavBar;
