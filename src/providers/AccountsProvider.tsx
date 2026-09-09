import {
  LoginUserService,
  LogoutUserService,
  RegisterUserService,
  AuthoriseUserService,
} from "@/services/AuthService";
import HttpService from "@/services/HttpService";
import storage from "@/storage";
import axios from "axios";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type AccountType = {
  loading: Loading;
  login: Login;
  isAuthenticated: () => IsAuthenticated;
  logout: Logout;
  register: Register;
  updateAccount: UpdateAccount;
  authorise: Authorise;
};

const AccountContext = createContext<AccountType>({
  loading: false,
  login: async ({}) => ({ error: "Not implemented.", }),
  isAuthenticated: async () => (false),
  logout: async () => ({ error: "", }),
  register: async ({}) => ({ error: "Not implemented.", }),
  updateAccount: async () => (({ error: "Not implemented", })),
  authorise: async () => (({ error: "Not implemented", })),
});

const AccountsProvider = ({ children, }: PropsWithChildren) => {
  const [loading, setLoading] = useState<Loading>(false);

  const login = async (loginCreds: LoginCredentials): Promise<LoginResponse|CustomError> => {
    setLoading(true);
    const response = await LoginUserService(loginCreds)
      .then(res => res)
      .catch((err: Error) => err);
    if (response instanceof Error) {
      if (axios.isAxiosError<ServerError>(response)) {
        if ("ERR_NETWORK" === response.code) {
          setLoading(false);
          return { error: "Server unavailable.", };
        } else {
          setLoading(false);
          return { error: response.response?.data?.message, };
        }
      } else {
        setLoading(false);
        return { error: response.message, };
      }
    } else {
      setLoading(false);
      return response;
    }
  };

  const register = async (registerCreds: RegisterCredentials): Promise<RegisterResponse|CustomError> => {
    setLoading(true);
    const response = await RegisterUserService(registerCreds)
      .then(res => res)
      .catch((err: Error) => err);
    
    if (response instanceof Error) {
      if (axios.isAxiosError<ServerError>(response)) {
        if ("ERR_NETWORK" === response.code) {
          setLoading(false);
          return { error: "Server unavailable.", };
        } else {
          setLoading(false);
          return { error: response.response?.data?.message, };
        }
      } else {
        setLoading(false);
        return { error: response.message, };
      }
    } else {
      setLoading(false);
      return response;
    }
  };

  const isAuthenticated = async (): IsAuthenticated => {
    let tokenInMemory = false;
    try {
      const res = await storage.load({
        key: "user-token",
      });
      if (res.authToken) {
        tokenInMemory = true;
      }
      return tokenInMemory;
    } catch (err) {
      return tokenInMemory;
    }
  };

  const logout = async (): Promise<LogoutResponse|CustomError> => {
    setLoading(true);
    try {
      const res = await storage.load({
        key: "user-token",
      });
      if (res.authToken) {
        const logoutResponse = await LogoutUserService();
        setLoading(false);
        if (false === logoutResponse) {
          return { error: "Failed to log out.", };
        }
        return logoutResponse as LogoutResponse;
      } else {
        setLoading(false);
        return { message: "Something unexpected happened. Please try again.", };
      }
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        if (axios.isAxiosError<ServerError>(err)) {
          if ("ERR_NETWORK" === err.code) {
            return { error: "Server unavailable.", };
          } else {
            return { error: err.response?.data?.message, };
          }
        } else {
          return { error: err.message, };
        }
      }
      return { message: "Success" };
    }
  };

  const updateAccount = async (updateCreds: UpdateAccountCredentials): Promise<UpdateAccountResponse|CustomError> => {
    setLoading(true);
    const http = new HttpService();
    try {
      const storageRes = await storage.load<StorageResponse>({
        key: "user-token",
      });
      const params: {[key: string]: any} = {};
      if (updateCreds.firstName) {
        params.firstName = updateCreds.firstName;
      }
      if (updateCreds.lastName) {
        params.lastName = updateCreds.lastName;
      }
      if (updateCreds.email) {
        params.email = updateCreds.email;
      }
      if (updateCreds.password) {
        params.password = updateCreds.password;
      }
      if (updateCreds.passwordConfirmation) {
        params.passwordConfirmation = updateCreds.passwordConfirmation;
      }
      const updateAccountResult = await http.patchData<UpdateAccountResponse>(
          '/user',
          params,
          "user-token",
        )
        .then(async response => {
          try {
            await storage.save({
              key: "user-token",
              data: {
                token: storageRes.token,
                user: {
                  id: response.data.user?.id,
                  email: response.data.user?.email,
                  firstName: response.data.user?.firstName,
                  lastName: response.data.user?.lastName,
                  avatarPath: response.data.user?.avatarPath,
                  createdAt: response.data.user?.createdAt,
                  updatedAt: response.data.user?.updatedAt,
                },
              },
            })
          } catch (err) {
            return err;
          }
          return response.data;
        })
        .catch((err: Error) => err);
      
      if (updateAccountResult instanceof Error) {
        if (axios.isAxiosError<ServerError>(updateAccountResult)) {
          if ("ERR_NETWORK" === updateAccountResult.code) {
            setLoading(false);
            return { error: "Server unavailable.", };
          } else {
            setLoading(false);
            return { error: updateAccountResult.response?.data?.message, };
          }
        } else {
          setLoading(false);
          return { error: updateAccountResult.message };
        }
      } else {
        setLoading(false);
        return updateAccountResult as UpdateAccountResponse;
      }
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        return { error: err.message };
      }
    }
    return { error: "Something unexpected happened. Please try again.", };
  };

  const authorise = async (): Promise<AuthoriseResponse|CustomError> => {
    setLoading(true);
    const response = await AuthoriseUserService()
      .then(res => res)
      .catch((err: Error) => err);
    if (response instanceof Error) {
      if (axios.isAxiosError<ServerError>(response)) {
        if ("ERR_NETWORK" === response.code) {
          setLoading(false);
          return { error: "Server unavailable.", };
        } else {
          setLoading(false);
          return { error: response.response?.data?.message, };
        }
      } else {
        setLoading(false);
        return { error: response.message, };
      }
    } else {
      setLoading(false);
      return response;
    }
  };

  return (
    <AccountContext.Provider 
      value={{
        loading,
        login,
        isAuthenticated,
        logout,
        register,
        updateAccount,
        authorise,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountsProvider;

export const useAccounts = () => useContext(AccountContext);