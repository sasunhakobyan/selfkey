interface ModalProps {
    image: string;
    message: string;
    close?: () => void;
}

const ModalMessage = (props: ModalProps) => {
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-90">
            <div className="bg-transparent p-6 rounded-lg shadow-lg text-center animate-endlessPopIn">
                <img src={props.image} alt="Logo" className="mx-auto h-24 w-auto" />
                <p className="mt-4 text-2xl font-semibold text-white">{props.message}</p>
                {
                    props.close && (
                        <button
                            className="mt-4 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                            onClick={props.close}
                        >
                            Close
                        </button>
                    )
                }
            </div>
        </div>
    );
}

export default ModalMessage;
