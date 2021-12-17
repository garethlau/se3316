import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = ({ children }) => (
  <Box>
    <Header />
    {children}
    <Footer />
  </Box>
);

export default Layout;
