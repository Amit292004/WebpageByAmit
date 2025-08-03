import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import QuestionPapers from "@/pages/question-papers";
import Videos from "@/pages/videos";
import Login from "@/pages/login";
import Admin from "@/pages/admin";
import Feedback from "@/pages/feedback";
import Premium from "@/pages/premium";
import Enroll from "@/pages/enroll";
import { Switch, Route } from "wouter";
import Notes from "@/pages/notes";
import ViewPDF from "@/pages/view-pdf";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/view-pdf" component={ViewPDF} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/question-papers" component={QuestionPapers} />
      <Route path="/videos" component={Videos} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route path="/feedback" component={Feedback} />
      <Route path="/premium" component={Premium} />
      <Route path="/enroll" component={Enroll} />
      <Route path="/notes" component={Notes} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
