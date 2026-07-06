import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider }  from "@/contexts/AuthContext";
import { OfflineProvider } from "@/contexts/OfflineContext";
import { AquaOpsEntry } from "@/components/aquaops-entry";
import WaterFactoryApp from "@/components/water-factory-app";
import { ForgotPasswordScreen } from "@/components/screens/forgot-password";
import { ResetPasswordScreen } from "@/components/screens/reset-password";
import { JoinFactory } from "@/components/screens/join-factory";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={AquaOpsEntry} />
      <Route path="/aquaops" component={WaterFactoryApp} />
      <Route path="/forgot-password" component={ForgotPasswordScreen} />
      <Route path="/reset-password" component={ResetPasswordScreen} />
      <Route path="/join" component={JoinFactory} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
           <OfflineProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          </OfflineProvider>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
