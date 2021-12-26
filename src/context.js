import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  news: {},
  currentPage: 0,
  totalPage: 0,
  query: "React",
  loading: true,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchNews = async () => {
      const url = `${API_ENDPOINT}query=${state.query}&page=${state.currentPage}`;
      console.log(url);
      try {
        dispatch({ type: SET_LOADING, payload: true });
        const response = await fetch(url);
        const data = await response.json();
        dispatch({
          type: SET_STORIES,
          payload: { allNews: data.hits, allPages: data.nbPages },
        });
        dispatch({ type: SET_LOADING, payload: false });
      } catch (e) {
        console.log(e);
        dispatch({ type: SET_LOADING, payload: false });
      }
    };
    fetchNews();
  }, [state.currentPage, state.query]);

  const handleChangeQuery = (e) => {
    dispatch({ type: HANDLE_PAGE, payload: 0 });
    dispatch({ type: HANDLE_SEARCH, payload: e.target.value });
  };

  const handleRemove = React.useCallback((id) => {
    dispatch({ type: REMOVE_STORY, payload: id });
  }, []);

  const handleChangePage = (method) => {
    if (method === "INCREASE") {
      dispatch({ type: HANDLE_PAGE, payload: state.currentPage + 1 });
      return;
    }

    if (method === "DECREASE") {
      dispatch({ type: HANDLE_PAGE, payload: state.currentPage - 1 });
      return;
    }
  };

  return (
    <AppContext.Provider
      value={{
        query: state.query,
        news: state.news,
        loading: state.loading,
        currentPage: state.currentPage,
        totalPages: state.totalPage,
        handleChangeQuery,
        handleRemove,
        handleChangePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
