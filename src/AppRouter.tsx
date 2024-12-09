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
        path: "browse",
        children: [
          {
            path: "", // browse main page
            element: <Home />,
          },
          {
            path: "movies/:movieId", //detail modal for all movies
            element: <Home />,
          },
          {
            path: "series/:seriesId", //detail modal for all series
            element: <Home />,
          },
          {
            path: "movies", // movies category
            element: <Movies />,
          },
          {
            path: "series", // series category
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
