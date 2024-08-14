import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_LOC = import.meta.env.VITE_API_LOCATION;
let API_PORT = '';

const ENV_PORT = import.meta.env.VITE_API_PORT;

// TODO Testing Remove Token when finished testing
const TOKEN = 'F5yHCjMWqeXSMZcznVfaDdpi4hX3.U.Ma6UUiEFnInj4t.crBnfYp5iX6usyCA.H';

if (ENV_PORT) {
  API_PORT = ENV_PORT;
}

const API_SUFFIX = import.meta.env.VITE_API_SUFFIX;

const getPizzas = async () => {
  const entity = 'pizza-model';
  const response =
    await fetch(`${API_LOC}:${API_PORT}${API_SUFFIX}${entity}`, {
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

  const entity = 'pizza-model';

  // POST, unless id is present
  let api = `${API_LOC}:${API_PORT}${API_SUFFIX}${entity}`;
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