import { Fragment, useContext } from "react";
import { ShoppingCartContext } from "../../../context";

function CartTile({ singleCartItem }) {
  console.log(singleCartItem);

  const { handleRemoveCartItem,handletoGoCart } = useContext(ShoppingCartContext);

  return (
    <Fragment>
        <div className="grid grid-cols-3 items-start gap-5">
      <div className="col-span-2 flex items-start gap-4">
        <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-600 p-1 rounded-sm">
          <img
            src={singleCartItem?.thumbnail}
            alt="no item to show off"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="">
          <h3 className="text-base font-bold text-gray-900">
            {singleCartItem?.title}{" "}
          </h3>
          <button onClick={() => handleRemoveCartItem(singleCartItem, true)} className="mt-2 bg-black text-white rounded-sm px-4 py-3 text-sm">
            Remove
          </button>
        </div>
      </div>
      <div className="ml-auto">
        <h3 className="text-lg font-bold text-gray-900">
          ${singleCartItem?.totalprice.toFixed(2)}
        </h3>
        <p>Quantity: {singleCartItem?.Quantity} </p>
        <div className="mt-3 flex items-center space-x-2">
          <button onClick={() => handleRemoveCartItem(singleCartItem, false)} className="disabled:opacity-70 px-3 py-1 border border-black rounded-lg text-black hover:bg-gray-200"
            disabled={singleCartItem?.Quantity === 1}>
            -
          </button>
          <button onClick={() => handletoGoCart(singleCartItem)} className="px-3 py-1 border border-black rounded-lg text-black hover:bg-gray-200">
            +
          </button>
        </div>
      </div>
    </div>
    <hr className="border-gray-500"/>
    </Fragment>
  );
}

export default CartTile;
