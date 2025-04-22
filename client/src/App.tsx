import React from "react";
import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/not-found";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Toaster />
      </main>
    </QueryClientProvider>
  );
}