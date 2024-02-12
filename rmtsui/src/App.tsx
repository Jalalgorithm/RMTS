import React from "react";
import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar/navbar.component";
import { Route, Routes } from "react-router-dom";
import CustomLinearProgress from "./components/custom-linear-progress/customerlinearprogress.component";
import { TokenProvider } from "./components/tokenprovider/tokenprovider.component";
import { AuthProvider } from "./components/authprovider/authprovider.component";

const Home = lazy(() => import("./pages/home/home.page"));
const Companies = lazy(() => import("./pages/companies/companies.page"));
const AddCompany = lazy(() => import("./pages/companies/addcompany"));
const Jobs = lazy(() => import("./jobs/jobs.page"));
const AddJob = lazy(() => import("./jobs/addjob"));
const Candidates = lazy(() => import("./pages/candidates/candidates.page"));
const AddCandidate = lazy(
  () => import("./pages/candidates/addcandidates.page")
);
const LogIn = lazy(() => import("./login/login.page"));
const SignUp = lazy(() => import("./signup/signup.page"));
const Autherror = lazy(() => import("./helpers/auth.page"));

const App = () => {
  const { darkMode } = useContext(ThemeContext);
  const appStyles = darkMode ? "app dark" : "app";

  return (
    <div className={appStyles}>
      <AuthProvider>
        <TokenProvider>
          <Navbar />
          <div className="wrapper">
            <Suspense fallback={<CustomLinearProgress />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/companies">
                  <Route index element={<Companies />} />
                  <Route path="add" element={<AddCompany />} />
                </Route>
                <Route path="/jobs">
                  <Route index element={<Jobs />} />
                  <Route path="add" element={<AddJob />} />
                </Route>
                <Route path="/candidates">
                  <Route index element={<Candidates />} />
                  <Route path="add" element={<AddCandidate />} />
                </Route>
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/autherror" element={<Autherror />} />
              </Routes>
            </Suspense>
          </div>
        </TokenProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
