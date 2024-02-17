import React from 'react';

type ContainerProps = {
    children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="flex flex-col justify-between w-full min-h-screen bg-black">
            {children}
        </div>
    );
};

export default Container;