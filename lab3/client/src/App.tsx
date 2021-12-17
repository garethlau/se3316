import "@fontsource/oxygen/400.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import theme from "./theme";
import Layout from "./components/Layout";
import LoginPage from "./pages/Login";
import CreatePage from "./pages/Create";
import PollPage from "./pages/Poll";
import SignupPage from "./pages/Signup";
import HomePage from "./pages/Home";
import { QueryClientProvider, QueryClient } from "react-query";
import Guardian from "./components/Guardian";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/create"
              element={
                <Guardian redirect="/create">
                  <CreatePage />
                </Guardian>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/poll/:pollId" element={<PollPage />} />
          </Routes>
        </Layout>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
