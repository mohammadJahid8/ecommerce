"use client"
import { memo, useState } from 'react';

const colors = [
    {
        id: "colors_1",
        color: "#7E7E7E"
    },
    {
        id: "colors_2",
        color: "#F7F7F7",
    },
    {
        id: "colors_3",
        color: "#825C41",
    },
    {
        id: "colors_4",
        color: "#191970",
    },
    {
        id: "colors_5",
        color: "#333333",
    },
    {
        id: "colors_6",
        color: "#FFD8D8",
    },
    {
        id: "colors_7",
        color: "#FF9578",
    },
    {
        id: "colors_8",
        color: "#BD10E0",
    },
    {
        id: "colors_9",
        color: "#D0021B",
    },
    {
        id: "colors_10",
        color: "#FF9578",
    },
    {
        id: "colors_11",
        color: "#BD10E0",
    },
    {
        id: "colors_12",
        color: "#D0021B",
    },

]

const ColorFilters = () => {
    const [colorChoose, setColorChoose] = useState<string>("");
    return (
        <>
            <div className='grid md:grid-cols-4 grid-cols-3 lg:grid-cols-5 gap-2 mt-2 mb-2'>
                {
                    colors.map((color, index) => {
                        return (
                            <div onClick={() => {
                                if (color.id === colorChoose) {
                                    setColorChoose("");
                                } else {
                                    setColorChoose(color.id)
                                }
                            }} className='cursor-pointer' key={color?.id + index.toString()} style={colorChoose === color.id ? { backgroundColor: color.color, width: 30, height: 30, borderRadius: 15, border: '2px solid #2F75D6' } : { backgroundColor: color.color, width: 30, height: 30, borderRadius: 15 }}>
                            </div>
                        )
                    })
                }
            </div>
            {
                colorChoose && <div className='cursor-pointer'>
                    <p className='text-[grey] hover:text-[#2F75D6] font-roboto'>{"Clear"}</p>
                </div>
            }
        </>
    )
}

export default memo(ColorFilters);