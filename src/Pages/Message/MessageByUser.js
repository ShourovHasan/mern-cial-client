import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';
import Loading from '../SharedPages/Loading/Loading';
import AddMessage from './AddMessage';
import MessageCard from './MessageCard';

const MessageByUser = () => {
    const oppositeUserDetails = useLoaderData();
    const { user } = useContext(AuthContext);

    useTitle('MessageByUser');


    const url = `https://mern-cial-server.vercel.app/addMessage/${oppositeUserDetails?.email}`;
    const { data: messageOppositeUsers = [], isLoading } = useQuery({
        queryKey: ['messageOppositeUsers'],
        queryFn: async () => {
            const res = await fetch(url)
            const data = await res.json();
            return data;
        }
    })
    const { myUser, oppositeUser } = messageOppositeUsers;
    if (isLoading) {
        return <Loading></Loading>
    }

    // console.log(oppositeUser);
    // console.log(messageOppositeUsers);
    const oppositeMessages = myUser.filter(msg => msg?.oppositeUserEmail === user?.email);
    const myMessages = oppositeUser.filter(msg => msg?.myEmail === user?.email);
    console.log('myMessages', myMessages);
    console.log('oppositeMessages', oppositeMessages);


    return (
        <div className="card div_align neumorphism_Banner_Card lg:w-1/2 md:w-2/3 mx-auto my-5 mb-80">
            <div>
                <AddMessage
                    oppositeUser={oppositeUserDetails}
                ></AddMessage>
            </div>
            <div className='card-body px-10'>
                <>
                    {myMessages.length ?
                        myMessages.map(myLMessage =>
                            <MessageCard
                                key={myLMessage._id}
                                myLMessage={myLMessage}
                            ></MessageCard>
                        )
                        :
                        ''
                    }
                </>
                <>
                    {oppositeMessages.length ?
                        oppositeMessages.map(oppositeMessage =>
                            <MessageCard
                                key={oppositeMessage._id}
                                oppositeMessage={oppositeMessage}
                            ></MessageCard>
                        )
                        :
                        ''
                    }
                </>
            </div>
        </div>
    );
};

export default MessageByUser;