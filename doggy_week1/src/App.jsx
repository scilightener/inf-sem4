import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardPage from "./CardPage";
import MainPage from "./MainPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/dog/:id" element={<CardPage />} />
        </Routes>
      </Router>
    </>
  )
}
export default App;