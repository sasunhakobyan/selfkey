interface ModalProps {
    image: string;
    message: string;
}

const Modal = (props: ModalProps) => {
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-90">
            <div className="bg-transparent p-6 rounded-lg shadow-lg text-center animate-endlessPopIn">
                <img src={props.image} alt="Logo" className="mx-auto h-24 w-auto" />
                <p className="mt-4 text-2xl font-semibold text-white">{props.message}</p>
            </div>
        </div>
    );
}

export default Modal;
