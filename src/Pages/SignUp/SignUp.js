
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const { createUser, updateUser } = useContext(AuthContext)
    const [signUpError, setSignUpError] = useState('')
    const [createDUserEmail, setCreatedUserEmail] = useState()
    const [token] = useToken(createDUserEmail)
    const navigate = useNavigate()
    if (token) {
        navigate('/')
    }


    const handleSignUp = (data) => {

        setSignUpError('')
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                toast('user create a successfully...')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => { })
                    .catch(err => console.log(err))
                saveUser(data.name, data.email);
                console.log(user)
            })
            .catch(err => {
                console.log(err)
                setSignUpError(err.message)
            })
        const saveUser = (name, email) => {
            const user = { name, email };
            fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("save user", data);
                    setCreatedUserEmail(email)
                })
        }

        // console.log(data)
    }


    return (
        <div className='h-[800px]  flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl'>SignUp</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: 'Please Enter Your Name' })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">email</span>
                        </label>
                        <input type="email" {...register("email", { required: 'Email Address is required' })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be 6 character or longer' },
                            pattern: { value: /!@#$%^&*()_+"":{[]}``~~?||/, message: 'Password must be stronge' },
                        })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        {/* <label className="label"><span className="label-text">Forget Password</span></label> */}
                    </div>

                    <input className='btn btn-accent w-full mt-4' value='login' type="submit" />
                    {
                        signUpError && <p className='text-red-600'>{signUpError}</p>
                    }
                </form>
                <p>Already haven an Account <Link className='text-primary' to='/login'>Please login</Link> </p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;