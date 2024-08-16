import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

let API_PORT = '';
const ENTITY = 'pizza-model';
const API_LOC = import.meta.env.VITE_API_LOCATION;
const ENV_PORT = import.meta.env.VITE_API_PORT;
const API_SUFFIX = import.meta.env.VITE_API_SUFFIX;

// TODO Testing Remove Token when finished testing
const TOKEN = 'F5yHCjMWqeXSMZcznVfaDdpi4hX3.U.Ma6UUiEFnInj4t.crBnfYp5iX6usyCA.H';

if (ENV_PORT) {
  API_PORT = ':' + ENV_PORT;
}

const getPizzas = async () => {
  const response =
    await fetch(`${API_LOC}${API_PORT}${API_SUFFIX}${ENTITY}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`
      }
    });

  if (!response.ok) {
    throw new Error('Failed to get data');
  }

  const jsonResults = await response.json();
  return jsonResults;
};

const createOrUpdatePizza = async ({ id, data }) => {

  // POST, unless id is present
  let api = `${API_LOC}${API_PORT}${API_SUFFIX}${ENTITY}`;
  let methodType = 'POST';

  //if id is present, PUT/PATCH
  if (id) {
    api += `/${id}`;
    methodType = 'PUT';
  }

  const response = await fetch(api, {
    method: methodType,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to save data');
  }

  return await response.json();
};

const deletePizza = async ({ id }) => {
  let api = `${API_LOC}${API_PORT}${API_SUFFIX}${ENTITY}/${id}`;
  const response = await fetch(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (response.status === 404) {
    throw new Error('Cannot find data');
  }

  if (!response.ok) {
    throw new Error('Failed to delete data');
  }

  return { success: true, message: 'data deleted successfully' };
};

const loginUser = async ({ email, password }) => {
  const api = `${API_LOC}${API_PORT}${API_SUFFIX}auth/login`;
  const response = await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }

  const { user } = await response.json();
  return user;
};

const logoutUser = async ({ user }) => {
  const api = `${API_LOC}:${API_PORT}${API_SUFFIX}auth/logout`;

  const response = await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ user }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Logout failed');
  }

  return { success: true, message: 'user logged out successfully' };
};

export const usePizzasAPI = () => {
  const {
    data: dataFromQuery,
    error: getError,
    isLoading: getLoading,
    refetch: dataRefetch
  } = useQuery({ queryKey: ['getPizzas'], queryFn: getPizzas });

  return {
    dataFromQuery,
    getError,
    getLoading,
    dataRefetch,
  };
};

export const usePizzaMutationAPI = () => {
  const queryClient = useQueryClient();
  const {
    mutate: saveData,
    isLoading: saveLoading,
    isError: saveError,
    isSuccess: saveSuccess,
  } = useMutation({
    mutationFn: createOrUpdatePizza,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['getPizzas'] });
    },
    onError: (error) => {
      // Error actions
      console.log("error occured mutating w/ react query.", error);
    },
  });

  return {
    saveData,
    saveLoading,
    saveError,
    saveSuccess,
  };
};

export const useDeletePizzaAPI = () => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteData,
    isLoading: deleteLoading,
    error: deleteError,
    isSuccess: deleteSuccess,
  } = useMutation({
    mutationFn: deletePizza,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['getPizzas'] });
    },
    onError: (error) => {
      // Error actions
      console.log("error occured mutating w/ react query.", error);
    },
  });

  return {
    deleteData,
    deleteLoading,
    deleteError,
    deleteSuccess,
  };
};

export const loginUserAPI = () => {
  const { login } = useContext(UserContext);
  const {
    mutate: loginMutationFn,
    error: loginError,
    isSuccess: loginSuccess,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      //handle successful login
      login(data);
    },
    onError: (error) => {
      console.error('Login error: ', error.message);
    },
  });

  return {
    loginMutationFn,
    loginError,
    loginSuccess,
  };
};

export const logoutUserAPI = () => {
  const {
    mutate: logout,
    error: logoutError,
    isSuccess: logoutSuccess,
  } = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      //handle successful logout

      //NOTE:
      //the backend does not currently store the user logging in.  It is stored in the client/context level (for demo purposes).  If the back-end needs to logout, we would have additional logic here.  Otherwise, the context will clear the user.
    },
    onError: (error) => {
      console.error('Logout error: ', error.message);
    },
  });

  return {
    logout,
    logoutError,
    logoutSuccess,
  };
};