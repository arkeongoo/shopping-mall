import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  authUser,
  getCartItems,
  loginUser,
  logoutUser,
  payProducts,
  registerUser,
  removeCartItem,
} from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
  userData: {
    id: "",
    email: "",
    name: "",
    role: 0,
    image: "",
  },
  isAuth: false,
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
      toast.info("회원가입을 성공했습니다.");
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
      state.isAuth = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.userData = initialState.userData;
      state.isAuth = false;
      localStorage.removeItem("accessToken");
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    builder.addCase(authUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
      state.isAuth = true;
    });
    builder.addCase(authUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.userData = initialState.userData;
      state.isAuth = false;
      localStorage.removeItem("accessToken");
    });

    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData.cart = action.payload;
      toast.info("장바구니에 추가되었습니다.");
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    builder.addCase(getCartItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartDetail = action.payload;
      //   console.log(action.payload);
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    builder.addCase(removeCartItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartDetail = action.payload.productInfo;
      state.userData.cart = action.payload.cart;
      toast.info("상품이 장바구니에서 삭제되었습니다.");
    });
    builder.addCase(removeCartItem.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    builder.addCase(payProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(payProducts.fulfilled, (state) => {
      state.isLoading = false;
      state.cartDetail = [];
      state.userData.cart = [];
      toast.info("성공적으로 상품을 구매했습니다.");
    });
    builder.addCase(payProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });
  },
});

export default userSlice.reducer;
