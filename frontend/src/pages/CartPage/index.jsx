import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  payProducts,
  removeCartItem,
} from "../../store/thunkFunctions";
import CartTable from "./Sections/CartTable";

const CartPage = () => {
  const userData = useSelector((state) => state.user?.userData);
  const cartDetail = useSelector((state) => state.user?.cartDetail);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cartItems = [];

    if (userData?.cart && userData.cart.length > 0) {
      userData.cart.forEach((item) => {
        cartItems.push(item.id);
      });

      const body = {
        cartItems,
        userCart: userData.cart,
      };
      dispatch(getCartItems(body));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    calcTotal(cartDetail);
  }, [cartDetail]);

  const calcTotal = (cartItems) => {
    let total = 0;
    cartItems.map((item) => (total += item.price * item.quantity));
    setTotal(total);
  };

  const handleDelete = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const handlePaymentClick = () => {
    dispatch(payProducts({ cartDetail }));
  };

  return (
    <section>
      <div className="text-center m-7">
        <h2 className="text-2xl">나의 장바구니</h2>
      </div>
      {cartDetail?.length > 0 ? (
        <>
          <CartTable products={cartDetail} onRemoveItem={handleDelete} />

          <div className="mt-10">
            <p>
              <span className="font-bold">합계 : </span>${total}
            </p>

            <button
              className="px-4 py-2 text-white bg-black rounded-md mt-5 hover:bg-gray-500"
              onClick={handlePaymentClick}
            >
              결제하기
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <p>장바구니가 비었습니다.</p>
        </div>
      )}
    </section>
  );
};

export default CartPage;
