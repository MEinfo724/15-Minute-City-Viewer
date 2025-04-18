import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const HomeView = React.lazy(() => import("./home/page"));

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home/*" element={<HomeView />} />
        {/* Catch-all route to redirect to home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};
