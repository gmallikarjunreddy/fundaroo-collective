import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const CreateProject = lazy(() => import("./pages/CreateProject"));
const StartProject = lazy(() => import("./pages/StartProject"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false, // Disable refetching on window focus
    },
  },
});

const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/create-project" element={<CreateProject />} />
              <Route path="/start-project" element={<StartProject />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/profile/:username" element={<UserProfile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
