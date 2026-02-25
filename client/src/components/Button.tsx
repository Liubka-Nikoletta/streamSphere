interface ButtonProps{
    name: string,
    type?: "submit" | "reset" | "button",
    size?: "sm" | "md" | "lg" | "full",
    onClick?: () => void,
}

const Button = ({name, type="button", size="md"}: ButtonProps) => {
    const sizes = {
        sm: "px-2 py-1 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        full: "w-full py-2.5 text-sm"
    };

    return (
        <button
            type={type}
            className={`flex w-full justify-center rounded-md bg-(--color-accent) ${sizes[size]} text-sm/6 font-semibold text-white hover:bg-red-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900`}
        >
            {name}
        </button>
    );
}

export default Button;