import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useTitle from '../../hooks/useTitle';
import Loading from '../SharedPages/Loading/Loading';
import UserMessage from './UserMessage';

const Message = () => {
    useTitle('Message');

    const url = `https://mern-cial-server.vercel.app/users`;
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(url)
            const data = await res.json();
            return data;
        }
    })
    // console.log(users);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="card div_align neumorphism_Banner_Card lg:w-1/2 md:w-2/3 mx-auto my-5 mb-80">
            <div className='card-body px-10'>
                {
                    users.map(user => <UserMessage
                        key={user._id}
                        user={user}
                    ></UserMessage>)
                }
            </div>
        </div>
    );
};

export default Message;