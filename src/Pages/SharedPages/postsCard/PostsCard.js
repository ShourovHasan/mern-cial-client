import React from 'react';
import { Link } from 'react-router-dom';

const PostsCard = ({ post }) => {
    const { _id, postDescription, postPicture, postTime, userName, userPhoto } = post;
    // console.log(post);
    return (
        <div className="card div_align neumorphism_Banner_Card mb-5">
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
            
            <p className='text-lg mb-3 ml-3'>
                {
                    postDescription.length > 50 ?
                        <>{postDescription.slice(0, 50) + '...'}</>
                        :
                        <>{postDescription}</>
                }
            </p>

            <figure className='div-wrapper'>
                <img src={postPicture} alt="Shoes" />
            </figure>
            <div className="card-body">

                <Link to={`/posts/${_id}`} className=' btn btn-outline'>
                    See Details
                </Link>
            </div>
        </div>
    );
};

export default PostsCard;