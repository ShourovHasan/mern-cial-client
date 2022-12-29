import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';
import Loading from '../SharedPages/Loading/Loading';

const UpdateUser = () => {
    const { user } = useContext(AuthContext);
    useTitle('Update User');

    const url2 = `https://mern-cial-server.vercel.app/users/${user?.email}`;
    const { data: userDetails = [], isLoading } = useQuery({
        queryKey: ['userDetails'],
        queryFn: async () => {
            const res = await fetch(url2)
            const data = await res.json();
            return data;
        }
    })

    const [uUsers, setUUsers] = useState(userDetails);
    // const { _id, displayName, email, photoURL, userAddress } = uUsers;
    const navigate = useNavigate();

    const handleUserUpdate = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...uUsers };
        newUser[field] = value;
        setUUsers(newUser);
    }

    const handleUpdateUsers = event => {
        event.preventDefault();
        // console.log(uUsers);
        fetch(`https://mern-cial-server.vercel.app/users/${userDetails._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(uUsers)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('User updated successfully!')
                    // console.log(data);
                    navigate('/about');
                }

            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='w-full mx-auto my-12 lg:w-2/3 neumorphism_Banner_Card rounded-xl md:w-2/3'>
            <h2 className='text-3xl pt-7 text-blue-600 mb-7 text-center'>Update User</h2>

            <form onSubmit={handleUpdateUsers} className='px-10 pb-10'>
                <div className="flex">
                    <div className=" mx-auto">
                        <img src={userDetails?.photoURL} className='w-32 rounded' alt='' />
                    </div>
                </div>
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="name" defaultValue={userDetails?.displayName} className="w-full input input-bordered" readOnly />
                </div>
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" defaultValue={userDetails?.email} className="w-full input input-bordered" readOnly />
                </div>

                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">Address</span>
                    </label>
                    <input onChange={handleUserUpdate} name='userAddress' type="text" placeholder="You have no address, please add by edit option" defaultValue={userDetails?.userAddress} className="w-full input input-bordered" />
                </div>

                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">School/College/University</span>
                    </label>
                    <input onChange={handleUserUpdate} name='institute' type="text" placeholder="You have no institute name, please add by edit option" defaultValue={userDetails?.institute} className="w-full input input-bordered" />
                </div>
                <div className="mt-3 text-xl card-actions">
                    <input type='submit' className='w-full bg-blue-600 btn text-white' value='Update User'></input>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;