import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';
import Lottie from "lottie-react";
import lottieLogin from '../../../src/assets/login_register.json';

const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, googleSignIn, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    let navigate = useNavigate();
    useTitle('Register');

    const handleRegister = data => {
        const { email, password, displayName } = data;
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    handleSignUp(email, password, displayName, imgData.data.url);
                }
            })
        // console.log(data);
        setSignUpError('');

    }

    const handleSignUp = (email, password, displayName, photoURL) => {
        createUser(email, password)
            .then(result => {
                // const user = result.user;
                // toast.success('User Created Successfully');
                const userInfo = {
                    displayName: displayName
                }
                handleUpdateUser(userInfo, email, photoURL);
                // console.log(user);
            })
            .catch(error => {
                setSignUpError(error.message);
            })
    }
    const handleUpdateUser = (userInfo, email, photoURL) => {
        updateUser(userInfo)
            .then(() => {
                // console.log('Update user');
                saveUser(userInfo.displayName, email, photoURL)
            })
            .catch(error => {
                setSignUpError(error.message);
            })
    }

    const saveUser = (displayName, email, photoURL) => {
        const user = { displayName, email, photoURL };
        // console.log(user);
        fetch('https://mern-cial-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    toast.error(data.message);
                    toast.success('User Login Successfully');
                    return navigate('/');
                }
                else {
                    toast.success('User Created Successfully');
                    return navigate('/');
                }
                // console.log('Save user', data);
            })
    }
    const handleSignInWithGoogle = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);

                saveUser(user.displayName, user.email, user.photoURL);
                // navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error.message);
                setSignUpError(error.message);
            })
    }

    return (
        <div className="mb-10 hero lg:h-[800px] md:h-[800px] mx-auto">
            <div className="flex-col gap-20 mx-auto hero-content lg:flex-row md:flex-row">
                <div className="text-center lg:w-1/3 lg:text-left md:w-1/3">
                    <Lottie loop={true} animationData={lottieLogin} />
                </div>
                <div className='px-5 rounded-lg  shadow-neutral neumorphism_Banner_Card py-7 lg:w-[385px] md:w-[335px]'>
                    <h2 className='mb-5 text-xl text-center'>Sign Up</h2>
                    <form onSubmit={handleSubmit(handleRegister)} className=''>
                        {/* <Header /> */}
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("displayName", {
                                required: "full name is required"
                            })} type="text" placeholder="full name" className="w-full input input-bordered" />
                            {errors.displayName && <p className='ml-4 text-red-500'>{errors.displayName.message}</p>}
                        </div>
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input  {...register("email", {
                                required: "email address is required"
                            })} type="email" placeholder="email" className="w-full input input-bordered" />
                            {errors.email && <p role="alert" className='ml-4 text-red-600'>{errors.email?.message}</p>}
                        </div>
                        <div className="w-full mt-2 form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input  {...register("password", {
                                required: "password is required",
                                minLength: { value: 6, message: 'password at least 6 characters' },
                                maxLength: 20,
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: 'password must have Uppercase, lowercase, number and Special characters' }
                            })} type="password" placeholder="password" className="w-full input input-bordered " />
                            {errors.password && <p role="alert" className='ml-4 text-red-600'>{errors.password?.message}</p>}
                        </div>
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input  {...register("img", {
                                required: "Photo is required"
                            })} type="file" placeholder="Upload Your Photo" className="w-full file-input file-input-bordered" />
                            {errors.img && <p role="alert" className='ml-4 text-red-600'>{errors.img?.message}</p>}
                        </div>
                        <input type="submit" className='w-full pb-0 mt-5 mb-0 text-white btn bg-gradient-to-r from-secondary to-primary' value='Sign Up' />
                        <div>
                            {
                                signUpError &&
                                <p className='ml-4 text-red-500'>{signUpError}</p>
                            }
                        </div>
                    </form>
                    <div className="flex flex-col w-full border-opacity-50">
                        <div className="grid w-full h-20 py-0 my-0 card rounded-box place-items-center"><p>Already have an account? <Link to='/login' className='text-primary'>Please Login</Link></p>
                        </div>
                        <div className="py-0 my-0 divider">OR</div>
                        <div className="grid h-20 py-0 my-0 card rounded-box place-items-center"><button onClick={handleSignInWithGoogle} className='w-full btn btn-outline'>CONTINUE WITH GOOGLE</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;