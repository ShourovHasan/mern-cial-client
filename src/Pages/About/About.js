import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';
import Loading from '../SharedPages/Loading/Loading';
import { FaEdit } from "react-icons/fa";

const About = () => {
    const { user } = useContext(AuthContext);
    useTitle('About Me');
    const navigate = useNavigate();

    const url2 = `https://mern-cial-server.vercel.app/users/${user?.email}`;
    const { data: userDetails = [], refetch, isLoading } = useQuery({
        queryKey: ['userDetails'],
        queryFn: async () => {
            const res = await fetch(url2)
            const data = await res.json();
            return data;
        }
    })
    const handleNavigate = () => {
        navigate('/updateUser');
    }
    if (isLoading) {
        // refetch();
        return <Loading></Loading>
    }
    return (
        <div className='w-full mx-auto my-12 lg:w-2/3 neumorphism_Banner_Card rounded-xl md:w-2/3'>
            <div onClick={handleNavigate} className='text-red-500 lg:text-4xl text-2xl flex justify-end my-0 py-0 pr-3 pt-3'>
                <FaEdit className='my-0 py-0'></FaEdit>
            </div>
            <h2 className='text-3xl text-blue-600 mb-7 flex justify-center my-0 py-0'>About me</h2>

            <form className='px-10 pb-10'>
                <div className="flex">
                    <div className=" mx-auto">
                        <img src={userDetails?.photoURL} className='w-32 rounded' alt='' />
                    </div>
                </div>
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="name" value={userDetails?.displayName} className="w-full input input-bordered" readOnly />
                </div>
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" value={userDetails?.email} className="w-full input input-bordered" readOnly />
                </div>

                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">Address</span>
                    </label>
                    <input type="text" placeholder="You have no address, please add by edit option" value={userDetails?.userAddress ? userDetails?.userAddress : "You have no address, please add by edit option"} className="w-full input input-bordered" readOnly />
                </div>

                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">School/College/University</span>
                    </label>
                    <input type="email" placeholder="email" value={userDetails?.institute ? userDetails?.institute : "You have no institute name, please add by edit option"} className="w-full input input-bordered" readOnly />
                </div>
            </form>
        </div>
    );
};

export default About;