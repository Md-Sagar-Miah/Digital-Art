import React from 'react'

const loading = () => {
    const loop = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    return (
        <section classNameName='mx-1 sm:mx-4 md:mx-8 lg:mx-20 px-2'>
            <div classNameName="border shadow rounded-md p-4 max-w-full w-full mx-auto mb-4">
                <div className="animate-pulse flex space-x-4">

                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>

                {
                    loop.map((item) => {
                        return (
                            <div key={item} className="border shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                <div className="animate-pulse flex space-x-4">
                                    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                                    <div className="flex-1 space-y-6 py-1">
                                        <div className="h-2 bg-slate-200 rounded"></div>
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                            </div>
                                            <div className="h-2 bg-slate-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="border shadow rounded-md p-4 max-w-full w-full mx-auto mt-4">
                <div className="animate-pulse flex space-x-4">

                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default loading
