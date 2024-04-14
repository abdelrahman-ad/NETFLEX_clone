import {Route, createRoutesFromElements,createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import HomePage from "../page/HomePage";
import MoviesPage from "../page/MoviesPage";
import ShowsPage from "../page/ShowsPage";
import SearchPage from "../page/SearchPage";
import DetailsMove from "../page/DetailsMove";
import WatchList from "../page/WatchList";
import ProdectedRoute from "./ProdectedRoute";


export const router = createBrowserRouter(
 
    createRoutesFromElements(
 <Route path="/" element={<RootLayout/>} >
   <Route index  element={<HomePage/>} />
   <Route path="/movies"  element={<MoviesPage/>} />
   <Route path="/shows"  element={<ShowsPage/>} />
   <Route path="/search"  element={<SearchPage/>} />
   <Route path="/:type/:id"  element={<DetailsMove/>} />
   
   <Route path="/watchlist"  element={
   <ProdectedRoute>
    <WatchList/> 
   </ProdectedRoute>
   
  }/>
  
 </Route>

    
    
    ))