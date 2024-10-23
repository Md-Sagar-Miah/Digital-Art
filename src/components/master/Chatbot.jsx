"use client"
import React, { useState } from 'react'



const Chatbot = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [qa, setQA] = useState([]);
    const [question, setQuestion] = useState("")
    const [isGenarating, setIsGenerating] = useState(false)

    const handleChat = async (e) => {
        e.preventDefault();
        setIsGenerating(true)
        const res = await fetch("/api/ai", {
            method: "POST",
            body: JSON.stringify({ question: question })
        })
        const data = await res.json()
        setQA(
            [
                ...qa,
                {
                    question,
                    answer: data["answer"]
                }
            ]
        )
        setQuestion("")
        setIsGenerating(false);
    }

    return (
        <>
            <button className={`open-button z-50 h-16 w-16 ${isVisible ? "block" : "hidden"}`} onClick={() => setIsVisible(!isVisible)}> <img className='' src='/bot.png' alt='Chat'></img></button>

            <div className={`chat-popup h-fit sm:w-[300px] md:w-[550px] bg-green-100 z-50 ${isVisible ? " hidden" : "block"}`} id="myForm">
                <div className='flex justify-between mx-2 mt-2 bg-white rounded-full px-4'>
                    <h1 className=' text-2xl font-bold '>Chat</h1>
                    <button type="button" className="btn cancel font-bold text-red-600" onClick={() => setIsVisible(!isVisible)}>X</button>
                </div>

                <div className='h-40 md:h-[300px] overflow-y-scroll scrollbar-hide bg-white p-2 mx-2 mt-2 border-2 border-slate-400 relative'>
                    {qa.length > 0 && <>
                        {
                            qa.map((item, index) => {
                                return (
                                    <div key={index} className=' flex flex-col w-full text-lg '>
                                        <p className='text-end bg-blue-400 my-2 p-2 ms-auto rounded-xl'>{item.question}</p>
                                        <span className='flex'>
                                            <img className='h-10 w-10 me-1' src="/bot.png" alt="img" />
                                            <p className=' text-start bg-red-300 p-2 me-auto  rounded-xl'>{item.answer}</p>
                                        </span>

                                    </div>
                                )
                            })
                        }
                    </>}
                    {
                        isGenarating && <img className='h-10 w-10 font-semibold absolute bottom-10 right-1/2 animate-spin z-10' src="/loading.png" alt="img" />
                    }

                </div>
                <form className="form-container p-[10px]">

                    <textarea onChange={(e) => setQuestion(e.target.value)} value={question} className=' bg-red-50 border' placeholder="Type question.." name="msg" required></textarea>

                    {isGenarating ? <button type="button" class="bg-green-200 w-full h-10 flex justify-center space-x-1" disabled>

                        <img className='h-10 w-10 font-semibold animate-spin' src="/loading.png" alt="img" />

                        <span className=' my-auto animate-pulse font-semibold'>Processing...</span>
                    </button>
                        : <button onClick={handleChat} type="submit" className="btn">Send</button>}
                </form>
            </div>

        </>
    )
}

export default Chatbot
