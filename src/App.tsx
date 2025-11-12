import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Products from "./pages/Products";
import ServiceOrders from "./pages/ServiceOrders";
import Orders from "./pages/Orders";
import DeliveryHub from "./pages/DeliveryHub";
import Customer from "./pages/delivery/Customer";
import StoreOwner from "./pages/delivery/StoreOwner";
import Driver from "./pages/delivery/Driver";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}>
            <Route index element={<Dashboard />} />
            <Route path="sales" element={<Sales />} />
            <Route path="products" element={<Products />} />
            <Route path="service-orders" element={<ServiceOrders />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path="/delivery" element={<DeliveryHub />} />
          <Route path="/delivery/customer" element={<Customer />} />
          <Route path="/delivery/store" element={<StoreOwner />} />
          <Route path="/delivery/driver" element={<Driver />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
