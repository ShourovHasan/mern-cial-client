import React from 'react';
import { TfiArrowCircleRight } from "react-icons/tfi";
import { Link } from 'react-router-dom';

const UserMessage = ({ user }) => {
    const {  photoURL,  email } = user;
    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex'>
                    <div className="avatar online mb-3">
                        <div className="w-12 rounded-full">
                            <img src={photoURL} alt='' />
                        </div>
                    </div>
                    <p className='text-2xl ml-5'>{user.displayName}</p>
                </div>
                <Link to={`/users/${email}`} className='text-3xl'>
                    <TfiArrowCircleRight></TfiArrowCircleRight>
                </Link>
            </div>
            <hr />
        </div>
    );
};

export default UserMessage;