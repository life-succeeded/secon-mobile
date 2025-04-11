// ExampleComponent.jsx

import React from 'react'

const ExampleComponent = () => {
    return (
        <div className="p-4">
            <h1 className="text-24-32-medium font-inter text-black-1">
                This is a heading with custom styles
            </h1>
            <p className="text-14-20-medium font-inter text-grey-1">
                This is a paragraph with custom styles.
            </p>
            <p className="text-14-20-regular font-inter text-blue-2">
                Another paragraph with different styles.
            </p>
            <p className="text-12-20-medium font-inter text-green-2">A smaller text example.</p>
        </div>
    )
}

export default ExampleComponent
