
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const { signIn, signInGoogle, user, forgetPassword } = useContext(AuthContext)
    const [loginError, setLoginError] = useState("")
    const [loginUserEmail, setLoginUserEmail] = useState('')

    const [token] = useToken(loginUserEmail)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }
    const handleLogin = data => {
        console.log(data)

        setLoginError('');
        signIn(data.email, data.password)

            .then(result => {
                const user = result.user;
                console.log(user)
                setLoginUserEmail(data.email)
                navigate('/')

            })
            .catch(err => {
                console.log(err.message)
                setLoginError(err.message)
            })

    }

    const handleReset = (loginUserEmail) => {
        // forgetPassword(loginUserEmail)
        console.log(loginUserEmail)

    }
    const handleGoogleLogin = () => {
        signInGoogle()
            .then(result => {
                const user = result.user;
                console.log(user)
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='h-[800px]  flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">email</span>
                        </label>
                        <input type="text" {...register("email", { required: 'Email Address is required' })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" {...register("password", { required: 'Password is required', minLength: { value: 6, message: 'Password must be 6 character or longer' } })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        <label className="label"><button onClick={() => handleReset()} className="label-text">Forget Password</button></label>
                    </div>

                    <input className='btn btn-accent w-full' value='login' type="submit" />
                    {
                        loginError && <p className='text-red-600'>{loginError}</p>}
                </form>
                <p>New to doctor Portal <Link className='text-primary' to='/signUp'>Create New Account</Link> </p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleLogin} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;