import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageNavigation from '../component/PageNavigation'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
const FoodPage = () => {
    const params = useParams()
    const [foodDetails, setFoodDetails] = useState([])
    const getFoodDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/food/getFood/${params.id}`)
            if (res.data.success) {
                setFoodDetails(res.data.data.food)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getFoodDetails()
    }, [])

    console.log(foodDetails)
    return (
        <div className="pt-[16vh]">
            <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
                <div className="container mx-auto">
                    <PageNavigation title={foodDetails?.name} />

                    <div className="grid grid-cols-1 md:grid-cols-2 pb-14 gap-8">
                        <div className="bg-red-200/[.3] border rounded-md mb-5 p-4">
                            <img src={foodDetails?.foodImage} alt="" className="w-full h-[25rem] cursor-pointer" />
                        </div>

                        <div className="bg-red-200/[.3] border rounded p-8 text-black mb-5">
                            <div className="text-2xl mb-2 font-bold text-[#f54748]">
                                {foodDetails?.name}
                            </div>
                            <div className="text-2xl mb-2 font-bold text-yellow-500">
                                Price :  Rs.{foodDetails?.price}
                            </div>
                            <div className="text-xl text-justify text-black mb-6">
                                {foodDetails?.description}
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="text-2xl font-bold text-[#f54748]">
                                    Quantity
                                </div>
                                <span className="flex items-center space-x-4">
                                    <div className="bg-red-500 relative p-4 cursor-pointer rounded-full text-white">
                                        <AiOutlineMinus className=' font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' size={20} />
                                    </div>
                                    <span className="text-red-500 px-6 py-2 bg-slate-50 text-lg font-medium">
                                        1
                                    </span>
                                    <div className="bg-red-500 relative p-4 cursor-pointer rounded-full text-white">
                                        <AiOutlinePlus className=' font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' size={20} />
                                    </div>
                                </span>

                            </div>
                            <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:gap-5 sm:mx-auto sm:justify-center">
                                <button className="bg-white active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-[#f54748]"> Favorite</button>
                                <button className="bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white">add to cart</button>

                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-4 pb-14 md:grid-cols-2 grid-cols-2 gap-8">
                        <div className="bg-[#f54748] py-4 text-center text-white font-semibold">
                            Catagory : {foodDetails?.catagory}
                        </div>
                        <div className="bg-[#f54748] py-4 text-center text-white font-semibold">
                            Weight : {foodDetails?.weight} kg
                        </div>
                        <div className="bg-[#f54748] py-4 text-center text-white font-semibold">
                            Location : Mathura
                        </div>
                        <div className="bg-[#f54748] py-4 text-center text-white font-semibold">
                            Location : Mathura
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodPage