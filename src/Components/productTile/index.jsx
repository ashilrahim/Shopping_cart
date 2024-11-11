import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";


/* eslint-disable react/prop-types */
function ProductTile({ singleProduct }) {
  const navigate = useNavigate();
  const { handletoGoCart, cartItems } = useContext(ShoppingCartContext);
  function handleProductDetailsClick(getProductid) {
    navigate(`/product-details/${getProductid}`);
  }
  return (
    <div className="relative group border border-cyan-900 p-6 cursor-pointer">
      <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <img
          onClick={() => handleProductDetailsClick(singleProduct?.id)}
          src={singleProduct?.thumbnail}
          alt={singleProduct?.title}
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex items-start justify-between mt-4 space-x-4">
        <div className="font-bold text-gray-900 sm:text-sm text-xs md:text-base">
          <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap ">
            {singleProduct?.title}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-[14px]">
            {" "}
            {singleProduct?.price}{" "}
          </p>
        </div>
      </div>
      <button
        onClick={() => handleProductDetailsClick(singleProduct?.id)}
        className="px-5 mt-5 w-full bg-black text-white py-2 rounded-lg font-bold text-lg  hover:bg-slate-900"
      >
        View Details
      </button>
      <button
        onClick={() => handletoGoCart(singleProduct)}
        disabled={cartItems.some((item) => item.id === singleProduct.id)}
        className="disabled:opacity-65 px-5 mt-5 w-full bg-black text-white py-2 rounded-lg font-bold text-lg  hover:bg-slate-900"
      >
        Add to Cart
      </button>
    </div>
  );
}
export default ProductTile;
