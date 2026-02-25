import {useState} from 'react';
import api from '../api/axios';
import Input from '../components/Input.tsx'
import Button from "../components/Button.tsx";
import {Link} from "react-router-dom";

interface IRegisterFormData {
    userName: string;
    password: string;
    email: string;
}

const Register = () => {
    const [formData, setFormData] = useState<IRegisterFormData>({
        userName: '',
        password: '',
        email: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            await api.post('/users/createUser', formData);
           console.log('Successfully created user');
        }catch(error){
            console.log('Error creating user');
        }
    }

    return (
        <section className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-main-gradient">
            <section className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Registration</h1>
            </section>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form method="POST" onSubmit={handleSubmit} className="space-y-6">
                    <Input id="userName"
                           label="Name:"
                           name="userName"
                           placeholder="Enter your name"
                           value={formData.userName}
                           onChange={handleChange}/>
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
                       <Button name="Sign Up" type="submit"/>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Already have an account?{' '}
                    <Link to="/users/login" className="font-semibold text-red-400 hover:text-red-300">Log in</Link>
                </p>
            </div>
        </section>
    );
}

export default Register;