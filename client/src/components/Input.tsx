interface InputProps {
    id: string;
    name: string,
    label: string,
    type?: string,
    placeholder?: string,
    value: string,
    required?: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const Input = ({id, name, label, type="text", placeholder, required, value, onChange}: InputProps) => {
   return (
       <section>
           <label htmlFor={id} className="block text-sm/6 font-medium text-gray-100">{label}</label>
           <div className="mt-2">
               <input id={id}
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      value={value}
                      required={required}
                      onChange={onChange}
                      autoComplete="off"
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-red-900 sm:text-sm/6"/>
           </div>
       </section>
   );
}

export default Input;