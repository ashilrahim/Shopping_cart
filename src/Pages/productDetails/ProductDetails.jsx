/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

import ThreeDots from "react-loading-icons/dist/esm/components/three-dots";

function ProductDetails() {
  const { id } = useParams();
  const {
    productDetails,
    SetProductDetails,
    loading,
    SetLoading,
    handletoGoCart,
    cartItems,
  } = useContext(ShoppingCartContext);

  async function fetchProductDetails() {
    const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await apiResponse.json();

    if (result) {
      SetProductDetails(result);
      SetLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <ThreeDots stroke="green" className="text-center" />
        <p className="mt-4 text-center text-gray-600">
          Loading, please wait...
        </p>
      </div>
    );

  return (
    <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
      <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-lg p-6">
        <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
          <div className="px-6 py-10 rounded-xl shadow-lg relative">
            <img
              src={productDetails?.thumbnail}
              alt={productDetails?.title}
              className="w-4/5 rounded object-cover"
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center">
            {productDetails?.images?.length ? (
              productDetails?.images.map((imageItem) => (
                <div className="rounded-xl p-4 shadow-md" key={imageItem}>
                  <img
                    src={imageItem}
                    alt="produtDetails"
                    className="w-24 cursor-pointer"
                  />
                </div>
              ))
            ) : (
              <h2>no product details</h2>
            )}
          </div>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-extrabold text-[#333333]">
            {productDetails?.title}{" "}
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            <p className="text-xl font-bold">{productDetails?.price} </p>
          </div>
          <div>
            <button
              onClick={() => handletoGoCart(productDetails)}
              disabled={
                productDetails ?
                cartItems.findIndex((item) => item.id === productDetails.id) >
                -1 : false
              }
              className="disabled:opacity-60 mt-5 min-w-[200px] px-4 py-3 border border-[#333] bg-transparent text-sm font-semibold rounded-md"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
