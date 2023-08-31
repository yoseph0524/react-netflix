import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isMobile, windowWidth } from "./atoms";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  const setWidth = useSetRecoilState(windowWidth);
  const setIsMobile = useSetRecoilState(isMobile);
  useEffect(() => {
    const debouncedResizeHandler = () => {
      setWidth(window.innerWidth);

      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    window.addEventListener("resize", debouncedResizeHandler);
    return () => window.removeEventListener("resize", debouncedResizeHandler);
  }, [setWidth, setIsMobile]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/search/:menuName/:id" element={<Search />}></Route>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/tv/banner/:id" element={<Tv />}></Route>
        <Route path="/tv/airingTodayList/:id" element={<Tv />}></Route>
        <Route path="/tv/tvShowList/:id" element={<Tv />}></Route>
        <Route path="/tv/topRatedList/:id" element={<Tv />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home/:listType/:id" element={<Home />}></Route>
        <Route path="/home/banner/:id" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
