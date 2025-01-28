import React from "react";

function CustomLayout() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Headline */}
            <h1 className="text-3xl font-bold mb-6">Headline</h1>

            {/* Image Placeholder */}
            <div className="w-64 h-40 bg-gray-300 flex items-center justify-center mb-6">
                <p className="text-gray-500">Image goes here</p>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                    Click here
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                    Click here
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                    Click here
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                    Click here
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                    Click here
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                    Click here
                </button>
            </div>
        </div>
    );
}

export default CustomLayout;
