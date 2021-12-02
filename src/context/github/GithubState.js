import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
} from '../types';

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  let githubclientID;
  let gitclientSECRET;

  if (process.env.NODE_ENV !== 'production') {
    githubclientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
    gitclientSECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
  } else {
    githubclientID = process.env.GITHUB_CLIENT_ID;
    gitclientSECRET = process.env.GITHUB_CLIENT_SECRET;
  }

  //useReducer
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //set Users
  const searchUsers = async (text) => {
    //set loading
    setLoading();

    //fetch data
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubclientID}&client_secret=${gitclientSECRET}`
    );

    //dispatch to reducer app
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  //clearUser
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  //get single github user
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubclientID}&client_secret=${gitclientSECRET}`
    );

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  //get user repos
  const getUserRepos = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:src&client_id=${githubclientID}&client_secret=${gitclientSECRET}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  //set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUserRepos,
        getUser,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
