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
      },
      {
        path: "browse",
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "movies",
            children: [
              {
                path: "",
                element: <Movies />,
              },
              {
                path: ":movieId",
                element: <Movies />,
              },
            ],
          },
          {
            path: "series",
            children: [
              {
                path: "",
                element: <Series />,
              },
              {
                path: ":seriesId",
                element: <Series />,
              },
            ],
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
