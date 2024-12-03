"use client"
import { memo, useState } from 'react';

interface IChild {
    id: number;
    name: string;
}

export interface IData {
    id: number;
    name: string;
    child: IChild[]
}

interface IProps {
    datas: IData[]
}

const LeftFilters = (props: IProps) => {
    const [cateId, setCateId] = useState<number>(0);
    const { datas } = props;

    return (

        <>
            <div className='overflow-hidden transition-all duration-300 ease-in-out flex flex-col mt-2 mb-2'>
                {
                    datas && datas.map((data: any, index: number) => {
                        return (
                            <div className='flex flex-col' key={data?.id + index.toString()}>
                                {
                                    data.name && (
                                        <p className='font-roboto text-xs text-[grey] mt-2 mb-2'>
                                            {data.name}
                                        </p>
                                    )
                                }
                                {
                                    data.child.map((dataChild: IChild, index: number) => {
                                        return (
                                            <div key={dataChild.id + index.toString()} className="inline-flex items-center mt-2 mb-2">
                                                <label
                                                    className="relative flex items-center mr-2 rounded-full cursor-pointer"
                                                    data-ripple-dark="true"
                                                >
                                                    <input
                                                        onChange={() => {
                                                            if (dataChild.id === cateId) {
                                                                setCateId(0)
                                                            } else {
                                                                setCateId(dataChild.id);
                                                            }
                                                        }}
                                                        type="checkbox"
                                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#1967D2] checked:bg-[#1967D2] checked:before:bg-[#1967D2]"
                                                        id="checkbox-1"
                                                        checked
                                                    />
                                                    {
                                                        cateId === dataChild.id ? (
                                                            <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-3.5 w-3.5"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                        clipRule="evenodd"
                                                                    ></path>
                                                                </svg>
                                                            </div>
                                                        ) : null
                                                    }
                                                </label>
                                                <p className={dataChild.id === cateId ? "text-[#1967D2]" : ""}>
                                                    {dataChild.name}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            {
                cateId !== 0 ? <div className='cursor-pointer'>
                    <p className='text-[grey] hover:text-[#2F75D6] font-roboto'>{"Clear"}</p>
                </div> : null
            }
        </>
    )
}

export default memo(LeftFilters);