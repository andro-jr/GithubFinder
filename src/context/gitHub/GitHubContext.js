import { createContext, useReducer } from 'react';
import githubReducer from './GitHubReducers';

const GitHubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
    user: {},
    repos: [],
  };

  const [state, dispatchReducer] = useReducer(githubReducer, initialState);

  const fetchUsers = async (text) => {
    dispatchReducer({ type: 'SET_LOADING' });

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

    const { items } = await response.json();

    dispatchReducer({
      type: 'GET_USERS',
      payload: items,
    });
  };

  const getSingleUser = async (login) => {
    dispatchReducer({ type: 'SET_LOADING' });

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token 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`,
      },
    });

    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();

      dispatchReducer({
        type: 'GET_SINGLE_USER',
        payload: data,
      });
    }
  };

  const getUsersRepo = async (login) => {
    dispatchReducer({ type: 'SET_LOADING' });

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`
    );

    const data = await response.json();

    dispatchReducer({
      type: 'GET_REPO',
      payload: data,
    });
  };

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        fetchUsers,
        dispatchReducer,
        getSingleUser,
        repos: state.repos,
        getUsersRepo,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export default GitHubContext;
