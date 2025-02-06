

export function CreateTestForm(){
    return <div className="w-full flex justify-center items-center mt-12 pb-20">
        <div className="bg-white w-8/10 rounded-md shadow-2xl">
            <div className="text-center text-2xl font-medium">Create New Test</div>

            <div className="h-full flex flex-col mt-8">
                <div className="mx-44">
                <div className="grid grid-cols-2 justify-center items-center my-6 mx-48">
                    <div className="mr-6">Unique Id:- </div>
                    <div  className="mr-6 border-b-orange-600 border-b-2 text-center">
                        123456
                    </div>
                </div>
                <div className="grid grid-cols-2 justify-center items-center my-6 mx-48">
                    <div className="mr-6">Test Name</div>
                    <div  >
                        <input type="text" className="mr-6 border-2  px-12 rounded border-orange-600" placeholder="example-test"/>
                    </div>
                </div>
                <div className="grid grid-cols-2 justify-center items-center my-6 mx-48">
                    <div className="mr-6">Create test Password</div>
                    <div  >
                        <input type="password" className="mr-6 border-2  px-12 rounded border-orange-600" />
                    </div>
                </div>
                <div className="grid grid-cols-2 justify-center items-center my-6 mx-48">
                    <div className="mr-6">confirm test Password</div>
                    <div  >
                        <input type="password" className="mr-6 border-2  px-12 rounded border-orange-600"/>
                    </div>
                </div>
                <div className="grid grid-cols-2 justify-center items-center my-6 mx-48">
                    <div className="mr-6">No of questions</div>
                    <div  >
                        <input type="number" className="mr-6 border-2  px-12 rounded border-orange-600" placeholder="10"/>
                    </div>
                </div>
                    <div className="flex justify-center items-center">
                    <button className="rounded bg-green-600 text-white text-xl px-16 my-10">Create Test</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}