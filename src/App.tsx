
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Vilkår from "./pages/Vilkår";
import Personvern from "./pages/Personvern";
import CookieBanner from "./components/CookieBanner";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll til toppen av siden når path endres
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};


import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Index />
        <ScrollToTop />
      </>
    ),
  },
  {
    path: "/om-prispilot",
    element: (
      <>
        <About />
        <ScrollToTop />
      </>
    ),
  },
  {
    path: "/hvordan-det-fungerer",
    element: (
      <>
        <HowItWorks />
        <ScrollToTop />
      </>
    ),
  },
  {
    path: "/kontakt-oss",
    element: (
      <>
        <Contact />
        <ScrollToTop />
      </>
    ),
  },
  {
    path: "/blogg",
    element: (
      <>
        <Blog />
        <ScrollToTop />
      </>
    ),
  },
  {
    path: "/vilkår",
    element: (
      <>
        <Vilkår />
        <ScrollToTop />
      </>
    ),
  },
  {
    path: "/personvern",
    element: (
      <>
        <Personvern />
        <ScrollToTop />
      </>
    ),
  },
  {
    path: "/:kategori",
    element: (
      <>
        <CategoryPage />
        <ScrollToTop />
      </>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <NotFound />
        <ScrollToTop />
      </>
    ),
  },
]);

const App = () => {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <TooltipProvider>
              <ErrorBoundary>
                <div className="min-h-screen flex flex-col">
                  <Toaster />
                  <Sonner />
                  <div className="flex-1">
                    <RouterProvider
                      router={router}
                      future={{
                        v7_startTransition: true
                      }}
                    />
                  </div>
                </div>
              </ErrorBoundary>
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
