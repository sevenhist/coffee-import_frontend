import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { IUser } from 'models/IUser'
import AuthService from 'api/services/AuthService'
import { AuthResponse } from 'models/response/AuthResponse'
import { toast } from "react-toastify";
import { AxiosError } from 'axios'
import { ICategory } from 'models/ICategory'

interface AuthInput {
  email: string,
  password: string,
  first_name?: string,
  last_name?: string
}

interface AuthProfileInput {
  email: string,
  first_name: string,
  last_name: string
}

interface AuthProfilePasswords {
  password: string,
  new_password: string,
  accessToken: string,
  refreshToken: string;
}
interface PasswordsInputs {
  password: string,
  new_password: string,
}

export const fetchLogin = createAsyncThunk(
  'user/fetchLogin',
  async (userData: AuthInput, { rejectWithValue }) => {
    const { email, password } = userData;
    try {
      const response = await AuthService.login(email, password);
      return response.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response?.data?.message || 'server error');
      } else {
        throw err;
      }
    }
  }
);

export const fetchRegistration = createAsyncThunk(
  'user/fetchRegistration',
  async (userData: AuthInput, { rejectWithValue }) => {
    const { email, password, first_name, last_name } = userData;
    try {
      const response = await AuthService.registration(email, password, first_name, last_name);
      return response.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response?.data?.message || 'server error');
      } else {
        throw err;
      }
    }
  }
)


export const fetchLogout = createAsyncThunk(
  'user/fetchLogout',
  async () => {
    const response = await AuthService.logout();
    console.log(response, "THIS IS ACTIVATE RESPONSE")
    return response;
  }
)



export const fetchSetProfileInfo = createAsyncThunk(
  'user/fetchSetProfileInfo',
  async (userData: AuthProfileInput, { rejectWithValue }) => {
    const { email, first_name, last_name } = userData;
    const response = await AuthService.setUserInfo(email, first_name, last_name);
    return response.data;
  }
)

export const fetchSetProfilePasswords = createAsyncThunk(
  'user/fetchSetProfilePasswords',
  async (userData: PasswordsInputs, { rejectWithValue }) => {
    try {
      const { password, new_password } = userData;
      const response = await AuthService.setUserPasswords(password, new_password);
      return response.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response?.data?.message || 'server error');
      } else {
        throw err;
      }
    }
  }
)


export const fetchSendCartToEmail = createAsyncThunk(
  'user/fetchSendCartToEmail',
  async (userData: any[], { rejectWithValue }) => {
    try {
      const obj = {
        last_name: userData[0].last_name,
        first_name: userData[0].first_name,
        phone_number: userData[0].phone_number,
        email: userData[0].email,
        city: userData[0].city,
        delivery: userData[0].delivery,
        cart: userData[0].cart,
        activePay: userData[0].activePay,
        totalPrice: userData[0].totalPrice,
        dateInfo: userData[0].date,
        timeInfo: userData[0].time
      }
      console.log(obj, "IT IS OBJ")
      const response = await AuthService.sendDataToEmail(
        obj.last_name, obj.first_name, obj.phone_number, obj.email, obj.city, 
        obj.delivery, obj.cart, obj.activePay, obj.totalPrice, obj.dateInfo, obj.timeInfo
      );
      return response.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response?.data?.message || 'server error');
      } else {
        throw err;
      }
    }
  }
)
 

interface UserState {
  user: IUser | null,
  isAuth: boolean,
  pageLoader: boolean
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  pageLoader: true
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
    },
    setPageLoader: (state, action: PayloadAction<boolean>) => {
      state.pageLoader = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      localStorage.setItem('token', action.payload.accessToken)
      state.isAuth = true
      state.user = action.payload.user
      toast("Success Login", {
        type: "success"
      });
    })
    builder.addCase(fetchLogin.rejected, (state, action: PayloadAction<any>) => {
      const errorMessage = action.payload
      toast(errorMessage, {
        type: "error"
      });
    })
    builder.addCase(fetchRegistration.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      localStorage.setItem('token', action.payload.accessToken)
      state.isAuth = true
      state.user = action.payload.user
      toast("Success Login", {
        type: "success"
      });
    })
    builder.addCase(fetchRegistration.rejected, (state, action: PayloadAction<any>) => {
      const errorMessage = action.payload
      toast(errorMessage, {
        type: "error"
      })
    })
    builder.addCase(fetchLogout.fulfilled, (state, action: PayloadAction<any>) => {
      state.isAuth = false;
    })
    builder.addCase(fetchSendCartToEmail.fulfilled, (state, action: PayloadAction<any>) => {
      console.log("Hello", action.payload)
    })
    builder.addCase(fetchSetProfileInfo.fulfilled, (state, action: PayloadAction<AuthProfileInput>) => {
      if (state.user) {
        state.user.first_name = action.payload.first_name;
        state.user.last_name = action.payload.last_name;
      }
    })
    builder.addCase(fetchSetProfileInfo.rejected, (state, action: PayloadAction<any>) => {
      const errorMessage = action.payload
      toast(errorMessage, {
        type: "error"
      })
    })
    builder.addCase(fetchSetProfilePasswords.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      console.log(action.payload, "THIS IS ACTION PAYLOAD")
      state.isAuth = true
      state.user = action.payload.user
      toast("Новий пароль успішно встановлено", {
        type: "success"
      });
    })
    builder.addCase(fetchSetProfilePasswords.rejected, (state, action: PayloadAction<any>) => {
      console.log(action.payload, "THIS IS TEXT OF ERROR")
      const errorMessage = action.payload
      toast(errorMessage, {
        type: "error"
      })
    })
  },
})

export const { setAuth, setUser, setPageLoader } = userSlice.actions
export const selectAuth = (state: RootState) => state.user.isAuth
export const selectUser = (state: RootState) => state.user.user
export const selectIsLoading = (state: RootState) => state.user.pageLoader

export default userSlice.reducer