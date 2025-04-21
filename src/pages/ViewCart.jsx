import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCartContext } from "../../context/cardContext";
import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

const ViewCart = () => {
    const { cartItems, removeItem, addToCart } = useCartContext();
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + shippingPrice;
    const { user } = useUserContext();
    // const handlePush = () => {
    //     router.push("/login");
    // };
    return (
        <>
            <div className="pt-14">
                <div
                    className={
                        cartItems.length === 0 ? "bg-gray-100 h-96" : "bg-gray-100"
                    }
                >
                    <div className="container mx-auto py-6">
                        <div className="w-full bg-white px-10 py-5 text-black rounded-md">
                            <div className="flex justify-between border-b pb-8">
                                <h1 className="font-semibold text-2xl">My watch list</h1>
                                <h2 className="font-semibold text-2xl">
                                    {cartItems.length} Items
                                </h2>
                            </div>
                            <div className="flex mt-10 mb-5">
                                <h3 className="font-semibold text-gray-900 text-xs uppercase w-2/5">
                                    Product Details
                                </h3>
                                <h3 className="font-semibold text-center text-gray-900 text-xs uppercase w-1/5 ">
                                    Seller
                                </h3>
                                <h3 className="font-semibold text-center text-gray-900 text-xs uppercase w-1/5 ">
                                    Price
                                </h3>
                                <h3 className="font-semibold text-center text-gray-900 text-xs uppercase w-1/5 ">
                                    Total Price
                                </h3>
                            </div>
                            {cartItems.map((food) => {
                                return (
                                    <FavoriteFoods
                                        key={food.id}
                                        food={food}
                                        removeItem={removeItem}
                                        Length={cartItems.length}
                                    />
                                );
                            })}

                            <div
                                className={
                                    cartItems.length === 0
                                        ? "mx-auto hidden  items-end justify-center px-6 flex-col"
                                        : "mx-auto  flex items-end justify-center px-6 flex-col"
                                }
                            >
                                <div className="text-right  mb-2 font-semibold text-blue-900">
                                    Shipping : {shippingPrice}
                                </div>

                                <div className="text-right  mb-2 font-semibold text-blue-900">
                                    Total Price : {totalPrice}
                                </div>
                                <Link to="/order">
                                    <button className="btn flex-end text-white hover:bg-red-600 hover:border-red-600 border-red-500 btn-sm bg-red-500">
                                        Check out
                                    </button>
                                </Link>
                                {/* {user?.data.user ? (
                                    <Link href="/order">
                                        <button className="btn flex-end text-white hover:bg-red-600 hover:border-red-600 border-red-500 btn-sm bg-red-500">
                                            Check out
                                        </button>
                                    </Link>
                                ) : (
                                    <button
                                        className="btn flex-end text-white hover:bg-red-600 hover:border-red-600 border-red-500 btn-sm bg-red-500"
                                    // onClick={handlePush}
                                    >
                                        Check out
                                    </button>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewCart;

const FavoriteFoods = ({ food }) => {
    const { cartItems, removeItem, addToCart } = useCartContext();

    return (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex w-2/5">
                <div className="w-20">
                    <img className="h-20" src={food.foodImage} alt="" />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{food.name}</span>
                    <span className="flex items-center space-x-4">
                        <div
                            className="shadow-sm text-white bg-red-500 hover:bg-red-700  cursor-pointer p-4  rounded-full  relative"
                            onClick={() => removeItem(food)}
                        >
                            <AiOutlineMinus className="absolute text-xl font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " />
                        </div>
                        <span className="text-red-500 px-3 py-2 bg-slate-50 text-lg font-medium">
                            {food.qty}
                        </span>
                        <div
                            className="shadow-sm text-white bg-red-500 hover:bg-red-700  cursor-pointer p-4  rounded-full  relative"
                            onClick={() => addToCart(food)}
                        >
                            <AiOutlinePlus className="absolute text-xl font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " />
                        </div>
                    </span>

                    {/* <div
						className="font-semibold cursor-pointer hover:text-red-500 text-gray-500 text-xs"
						onClick={() => removeItem(food)}
					>
						Remove
					</div> */}
                </div>
            </div>
            <div className="flex justify-center w-1/5 cursor-pointer">
                <span className="font-bold text-sm">{food.catagory}</span>
            </div>
            <span className="text-center  w-1/5 font-semibold text-sm">
                {food.price} X {food.qty}
            </span>
            <span className="text-center w-1/5 font-semibold text-sm">
                {food.qty * food.price}
            </span>
        </div>
    );
};