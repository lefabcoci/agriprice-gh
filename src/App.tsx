import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import PricesPage from "@/pages/PricesPage";
import Compare from "@/pages/Compare";
import AdminPanel from "@/pages/AdminPanel";
import SMSDemo from "@/pages/SMSDemo";
import USSDDemo from "@/pages/USSDDemo";
import InstallPage from "@/pages/InstallPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prices" element={<PricesPage />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/sms" element={<SMSDemo />} />
          <Route path="/ussd" element={<USSDDemo />} />
          <Route path="/install" element={<InstallPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
