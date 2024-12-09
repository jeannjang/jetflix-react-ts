import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Movies from "./routes/Movies";
import Series from "./routes/Series";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "movies/:movieId",
            element: <Home />, // 홈페이지에서 영화 상세 모달
          },
          {
            path: "series/:seriesId",
            element: <Home />, // 홈페이지에서 시리즈 상세 모달
          },
        ],
      },
      {
        path: "movies",
        element: <Movies />, // 영화 전용 페이지
        children: [
          {
            path: ":movieId",
            element: <Movies />,
          },
        ],
      },
      {
        path: "series",
        element: <Series />, // 시리즈 전용 페이지
        children: [
          {
            path: ":seriesId",
            element: <Series />,
          },
        ],
      },
      {
        path: "search",
        element: <Search />,
        children: [
          {
            path: "movies/:movieId",
            element: <Search />,
          },
          {
            path: "series/:seriesId",
            element: <Search />,
          },
        ],
      },
    ],
  },
]);

export default AppRouter;


//jetflix
