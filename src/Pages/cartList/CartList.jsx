import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { useNavigate } from "react-router-dom";
import CartTile from "../../Components/productTile/CartTile";

function CartList() {
  const { cartItems } = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  return (
    <div className="max-w-5xl mx-auto max-md:max-w-xl py-4">
      <h1 className="text-2xl font-bold text-gray-900 text-center">
        My Cart Page
      </h1>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2 space-y-4">
          {cartItems?.length ? (
            cartItems.map((singleCartItem) => (
              <CartTile singleCartItem={singleCartItem} />
            ))
          ) : (
            <h2>No Cart Item available Add product to Cart</h2>
          )}
        </div>
        <div className="bg-gray-100 rounded-sm p-4 h-max">
          <h3 className="text-xl text-gray-900 font-extrabold ">
            Order Summary
          </h3>
          <ul className="text-gray-700 mt-4 space-y-2">
            <p
              className="flex flex-wrap agp4
             text-sm font-bold"
            >
              Total{" "}
              <span>
                $
                {cartItems
                  .reduce((acc, curr) => acc + curr.totalprice, 0)
                  .toFixed(2)}
              </span>
            </p>
          </ul>
          <div className="mt-5  flex gap-5">
            <button className="text-sm px-4 py-3 bg-black text-white font-extrabold rounded-md">
              Checkout
            </button>
            <button
              onClick={() => navigate("/product-list")}
              className="text-sm px-4 py-3 bg-black text-white font-extrabold rounded-md"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartList;
