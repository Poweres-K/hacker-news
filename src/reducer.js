import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === HANDLE_PAGE) {
    let newPage = action.payload;
    if (newPage === state.totalPage) {
      newPage = 0;
    }
    if (newPage === -1) {
      newPage = state.totalPage - 1;
    }

    return { ...state, currentPage: newPage };
  }
  if (action.type === SET_STORIES) {
    return {
      ...state,
      news: action.payload.allNews,
      totalPage: action.payload.allPages,
    };
  }

  if (action.type === HANDLE_SEARCH) {
    return { ...state, query: action.payload };
  }

  if (action.type === SET_LOADING) {
    return { ...state, loading: action.payload };
  }

  if (action.type === REMOVE_STORY) {
    const newStory = state.news.filter(
      (story) => story.objectID !== action.payload
    );
    return { ...state, news: newStory };
  }
};
export default reducer;
