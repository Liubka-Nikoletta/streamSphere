interface ButtonProps{
    name: string,
    type?: "submit" | "reset" | "button",
    size?: "sm" | "md" | "lg" | "full",
    variant?: "primary" | "secondary",
    onClick?: () => void,
}

const Button = ({name, type="button", variant="primary", size="md"}: ButtonProps) => {
    const sizes = {
        sm: "px-2 py-1 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        full: "w-full py-2.5 text-sm",
        fit: "w-fit px-6 py-2.5 text-sm"
    };

    const variants = {
        primary: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20",
        secondary: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10"
    };

    return (
        <button
            type={type}
            className={`flex items-center justify-center gap-2 rounded-md font-bold transition-all active:scale-95 ${sizes[size]} ${variants[variant]}`}
        >
            {name}
        </button>
    );
}

export default Button;