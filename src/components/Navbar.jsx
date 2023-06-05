import { Link } from "react-router-dom";
import "../styles/navbar.css";

import { SessionContext } from "../contexts/SessionContext";
import { useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";
import { Box, Flex, Spacer, Text, UnorderedList } from "@chakra-ui/layout";
import { useWindowSize } from "@uidotdev/usehooks";
import { FaHome } from "react-icons/fa";

function NavBar({ children, gameNav }) {
  const { token, tokenInfo, logout } = useContext(SessionContext);
  const windowProps = useWindowSize();

  if (gameNav) {
    return (
      <div className="banner-turn-mobile">
        <Flex align={"center"} justify={"space-between"}>
          <Link to="/">
            <Box color={"white"} ml={"10px"}>
              <FaHome size={"30px"} />
            </Box>
          </Link>
          {children}
          <Menu>
            <MenuButton
              colorScheme=""
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon boxSize={6} />}
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
                  <MenuItem>New Deck</MenuItem>
                </Link>
              )}
              {token && (
                <Link to="/" onClick={logout}>
                  <MenuItem>Log out</MenuItem>
                </Link>
              )}
              <Link to="/game">
                <MenuItem>Play</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Flex>
      </div>
    );
  } else {
    return (
      <div className="banner">
        <Flex className="navBar " align={"center"} justify={"center"}>
          <Link to="/">
            <Flex
              className="logo"
              fontSize={{ base: "1.2rem", md: "1.7rem", lg: "2rem" }}
              wrap={"no-wrap"}
              gap={"10px"}
              align={"center"}
              justify={"center"}
            >
              <Text
                fontSize={{ base: "1.7rem", md: "2.2rem", lg: "3.5rem" }}
                align={"center"}
              >
                <span>Why</span>
              </Text>
              <Text align={"center"}>Do You Know that?</Text>
            </Flex>
          </Link>
          <Spacer />
          <Box display={{ base: "none", md: "block" }}>
            <UnorderedList
              fontSize={{ base: "1rem", md: "1rem", lg: "1.5rem" }}
            >
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
                  <Link to="/createdeck">New Deck</Link>
                </li>
              )}
              {token && (
                <li onClick={logout}>
                  <Link to="/">Log out</Link>
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
                colorScheme=""
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon boxSize={6} />}
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
                    <MenuItem>New Deck</MenuItem>
                  </Link>
                )}
                {token && (
                  <Link to="/" onClick={logout}>
                    <MenuItem>Log out</MenuItem>
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
}

export default NavBar;
