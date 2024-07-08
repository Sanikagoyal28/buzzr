"use client"

import CreateBuzzrForm from "@/components/Admin/Home/CreateBuzzrForm";
import Image from "next/image";
import { useState } from "react";

export default function CreateQuiz() {

    const profiles = [
        { image: "/player_profile/profile1.png", name: "Alice" },
        { image: "/player_profile/profile2.png", name: "Bob cdjk" },
        { image: "/player_profile/profile3.png", name: "Charlie" },
        { image: "/player_profile/profile4.png", name: "David" },
        { image: "/player_profile/profile5.jpg", name: "Eve" },
        { image: "/player_profile/profile6.png", name: "Frank" },
        { image: "/player_profile/profile7.jpg", name: "Grace" },
        { image: "/player_profile/profile9.jpg", name: "Hank" },
        { image: "/player_profile/profile10.jpg", name: "Ivy" },
        { image: "/player_profile/profile11.jpg", name: "Jack" },
        { image: "/player_profile/profile12.png", name: "Karen" }
    ];

    const [title, setTitle] = useState("")
    return <>
        <div className="flex flex-col w-full">
            <div className="py-4 px-8 flex justify-between">
                <Image
                    src="/logo.svg"
                    width={80}
                    height={80}
                    alt="Logo"
                />
            </div>
            <div className="flex md:py-12 md:px-8 mx-8 bg-white dark:bg-dark rounded-lg my-2 min-h-full overflow-auto">
                <div className="w-full md:w-1/2 px-4 sm:px-8 md:px-0 flex flex-col justify-center bg-white dark:bg-dark pt-4">
                    <p className="dark:text-white leading-[40px] sm:leading-[48px] md:leading-[56px] text-3xl sm:text-4xl md:text-5xl font-extrabold">Give your quiz title<br /> and description</p>
                    <CreateBuzzrForm setTitle={setTitle} />
                </div>
                <div className="w-1/2 bg-light-bg dark:bg-dark-bg p-8 min-h-full h-full overflow-y-auto rounded-3xl hidden md:block">
                    <p className="text-3xl italic font-extrabold dark:text-white mb-6 w-11/12">{title ? title : "Quiz Title"}</p>
                    <div className="flex flex-row gap-4 flex-wrap">
                        {profiles.map((file, index) => {
                            return <div key={index} className='border flex justify-between items-center w-fit gap-2 rounded-full p-2 bg-off-white dark:bg-off-dark text-dark dark:text-white text-lg'>
                                <Image
                                    src={`${file.image}`}
                                    width={50}
                                    height={50}
                                    alt="Profile"
                                    className="rounded-full h-8 w-8"
                                />
                                {file.name}
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    </>
}