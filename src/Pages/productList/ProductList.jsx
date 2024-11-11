import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import ProductTile from "../../Components/productTile";
import { Bars } from "react-loading-icons";

function ProductList() {
  const { listProducts, loading } = useContext(ShoppingCartContext);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Bars stroke="red" className="text-center" />
      </div>
    );

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-extralight text-gray-950 sm:text-4xl">
            Featured Products
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
          {listProducts && listProducts.length > 0 ? (
            listProducts.map((singleProduct) => (
              <ProductTile
                key={singleProduct.id}
                singleProduct={singleProduct}
              />
            ))
          ) : (
            <h3>No products to show off</h3>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
