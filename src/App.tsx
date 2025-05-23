
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantDetails from "./pages/RestaurantDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import FAQ from "./pages/FAQ";
import PartnerPage from "./pages/PartnerPage";

// Create a responsive query client with improved configurations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1, // Reduce retries to avoid excessive network requests on mobile
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<RestaurantsPage />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/partner" element={<PartnerPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
