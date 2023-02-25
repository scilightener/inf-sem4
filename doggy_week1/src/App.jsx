import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardPage from "./CardPage";
import MainPage from "./MainPage";
import ReviewPage from "./ReviewPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/dog/:id" element={<CardPage />} />
          <Route path="/review" element={<ReviewPage />} />
        </Routes>
      </Router>
    </>
  )
}
export default App;