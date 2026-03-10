import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";
import {useState} from "react";
import api from '../api/axios';
import {Link, useNavigate} from "react-router-dom";
import {useAuthCheck} from "../hooks/useAuthCheck.ts";
import toast from 'react-hot-toast';

interface ILoginFormData {
    password: string;
    email: string;
}

const Login = () => {
    const [formData, setFormData] = useState<ILoginFormData>({
        email: '',
        password: '',
    })

    const navigate = useNavigate();
    const {logIn} = useAuthCheck();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try{
            const response = await api.post("/users/login", formData);
            logIn(response.data.token);
            navigate("/");
        }catch(error){
            toast.error('Error logging in');
            console.log('Error logging in', error);
        }
    }

    return (
        <section className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-main-gradient">
            <section className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Login</h1>
            </section>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form method="POST" onSubmit={handleSubmit} className="space-y-6">
                    <Input id="email"
                           label="Email:"
                           name="email"
                           type="email"
                           placeholder="Enter your email"
                           value={formData.email}
                           onChange={handleChange}/>
                    <Input id="password"
                           label="Password:"
                           name="password"
                           type="password"
                           placeholder="Enter your password"
                           value={formData.password}
                           onChange={handleChange}/>
                    <div>
                        <Button name="Log in" type="submit" size="full"/>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/users/register" className="font-semibold text-red-400 hover:text-red-300">Sign Up</Link>
                </p>
            </div>
        </section>
    );
}

export default Login;