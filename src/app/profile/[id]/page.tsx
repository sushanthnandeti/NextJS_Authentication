
export default function userProfile( {params} : any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <p className="text-4xl"> Profile Page 
                <span className="p-2 rounded bg-blue-400"> {params.id}</span>
            </p>
        </div>
    )
}