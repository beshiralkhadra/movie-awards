import React, { Suspense, lazy } from "react";
import Spinner from "./shareableComponents/spinner/Spinner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const NoMatch = lazy(() => import("./shareableComponents/404Page/404Page"));
const NavigationBar = lazy(
  () => import("./shareableComponents/navigationBar/NavigationBar")
);
const LandingPage = lazy(() => import("./components/homePage/pages"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="*" element={<NoMatch />} />

          <Route element={<NavigationBar />}>
            <Route path="/">
              <Route index element={<LandingPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
