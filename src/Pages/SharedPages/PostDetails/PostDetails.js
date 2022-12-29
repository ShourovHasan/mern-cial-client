import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import Reviews from '../../Home/Reviews/AddReviews';
import ReviewDetails from '../../Home/Reviews/ReviewDetails';
import useTitle from '../../../hooks/useTitle';

const PostDetails = () => {
    const post = useLoaderData()[0];
    const { _id, postDescription, postPicture, postTime, userName, userPhoto } = post;
    // console.log(post);
    useTitle('PostDetails');
    return (
        <div className="card div_align neumorphism_Banner_Card lg:w-1/2 md:w-2/3 mx-auto my-5">
            <div className='flex justify-between'>
                <div className='flex my-3 ml-3'>
                    <figure className='mb-4 mr-3'>
                        <img src={userPhoto} className='w-14 rounded-full' alt="Shoes" />
                    </figure>
                    <div>
                        <h2 className="card-title text-2xl">
                            {userName}
                        </h2>
                        <small><p>{postTime}</p></small>
                    </div>
                </div>
                <div className='mr-5 my-auto text-neutral'>
                    <Link to='/'>
                        <FaHome className='text-2xl'></FaHome>
                    </Link>
                </div>
            </div>
            <p className='text-lg mb-3 ml-3'>{postDescription}</p>
            <figure className='div-wrapper'>
                <img src={postPicture} className='w-full' alt="Shoes" />
            </figure>
            <div className="card-body px-2">
                <ReviewDetails post={post}></ReviewDetails>
            </div>
        </div>
    );
};

export default PostDetails;