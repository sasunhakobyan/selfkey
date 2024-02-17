const FormButton = (props: { title: string }) => {
    return (
        <button
            type="submit"
            className="mt-4 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
            {props.title}
        </button>
    )
}

export default FormButton;