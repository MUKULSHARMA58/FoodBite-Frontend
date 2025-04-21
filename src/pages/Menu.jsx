import React, { useEffect, useState } from 'react'
import { useFoodContext } from '../../context/foodContext'
import axios from 'axios'
import { FaHeart, FaStar } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useCartContext } from '../../context/cardContext'

const Menu = () => {
    const { food, setFood } = useFoodContext()
    const [active, setActive] = useState(0)
    const [value, setValue] = useState('all')
    const catagory = [
        {
            id: 0,
            name: 'All',
            value: 'all'
        },
        {
            id: 1,
            name: 'Rice',
            value: 'Rice'
        },
        {
            id: 2,
            name: 'Desert',
            value: 'Desert'
        },
        {
            id: 3,
            name: 'Drinks',
            value: 'Drinks'
        },
        {
            id: 4,
            name: 'Fruits',
            value: 'Fruits'
        },
        {
            id: 5,
            name: 'Chicken',
            value: 'Chicken'
        },
        {
            id: 6,
            name: 'Fish',
            value: 'Fish'
        },
    ]
    const handleBtn = (btn) => {
        setActive(btn.id)
        setValue(btn.value)
    }

    const params = useParams()
    const getFoods = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/food/getAllFoods?category=${value}`)
            if (res.data.success) {
                setFood(res.data.data.food)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFoods()
    }, [value])


    const { addToCart } = useCartContext()

    return (
        <div className="pt-[16vh]">
            <div className="container mx-auto py-8">
                <div className="p-5 mb-14">
                    <div className="flex flex-wrap justify-center mb-8 gap-5">
                        {
                            catagory?.map(btn => (
                                <button className={active === btn.id ? "text-xl px-4 py-3 text-center text-white bg-red-500 border-red-500 border-2 rounded-sm justify-center font-medium " : "text-xl px-4 py-3 text-red-500 border-red-500 border-2 font-medium"} onClick={() => {
                                    handleBtn(btn)
                                }}>{btn.name}</button>
                            ))
                        }
                    </div>
                    <div className="grid py-6 gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                        {food?.map((curElem) => (
                            <div className="food-card bg-red-500/10  rounded-xl flex flex-col cursor-pointer items-center p-5">
                                <div className="relative mb-3">
                                    <Link to={`/menu/${curElem?._id}`}>
                                        <img src={curElem?.foodImage} alt="" className='h-64' srcset="" />
                                    </Link>
                                    <div className="absolute top-2 left-2">
                                        <button className="shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-5 rounded-full relative">
                                            <FaHeart className=' absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' />
                                        </button>
                                    </div>

                                    <div className=" absolute bottom-2 right-2">
                                        <button className=" shadow-sm bottom-4 border-white text-white bg-[#fdc55e] cursor-pointer p-3 h-14 w-14 text-xl font-bold rounded-full relative">
                                            <div className="absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Rs.{curElem?.price}</div>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-4 mb-3 items-center">
                                    <p className="text-lg text-center font-bold text-[#f54748]">
                                        {curElem?.name}
                                    </p>
                                    <div className="flex text-sm space-x-2 cursor-pointer">
                                        <span className=" font-normal text-[#fdc55e]">4.3</span>
                                        <FaStar size={16} className='text-[#fdc55e]' />
                                        <span className=" font-medium">({curElem?.reviews?.length})</span>
                                    </div>

                                </div>
                                <button className=" bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white" onClick={()=>addToCart(curElem)}> order now</button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Menu



