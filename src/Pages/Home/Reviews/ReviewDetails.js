import React, { useState } from 'react';
import { FcLike } from "react-icons/fc";
import { AiFillLike } from "react-icons/ai";
import AddReviews from './AddReviews';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../SharedPages/Loading/Loading';
import CommentsCard from './CommentsCard';
import ReactionManage from './ReactionManage';

const ReviewDetails = ({ post }) => {
    const url = `https://mern-cial-server.vercel.app/reviews/${post._id}`;
    const { data: comments = [], isLoading, refetch } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await fetch(url)
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='w-full'>
            <div className='flex justify-between  mb-3'>
                <ReactionManage
                    post={post}
                ></ReactionManage>
                <div>
                    <p className='text-xl'>
                        {comments.length} {(comments.length === 1 || comments.length === 0) ? 'comment' : 'comments'}
                    </p>
                </div>
            </div>
            <div>
                <AddReviews
                    post={post}
                    refetch={refetch}
                ></AddReviews>
            </div>
            <div className='mx-auto w-11/12 pt-5'>
                {
                    comments.map(comment => <CommentsCard
                        key={comment._id}
                        comment={comment}
                    ></CommentsCard>)
                }
            </div>
        </div>
    );
};

export default ReviewDetails;