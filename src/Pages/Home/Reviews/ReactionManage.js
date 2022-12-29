import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillLike } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';
import { AuthContext } from '../../../contexts/AuthProvider';

const ReactionManage = ({ post }) => {
    const { user } = useContext(AuthContext);

    const url = `https://mern-cial-server.vercel.app/reviewReaction/${post._id}`;
    const { data: reactions = [], refetch } = useQuery({
        queryKey: ['reactions'],
        queryFn: async () => {
            const res = await fetch(url)
            const data = await res.json();
            return data;
        }
    })
    // console.log('reactions', reactions.length);
    const url2 = `https://mern-cial-server.vercel.app/users/${user?.email}`;
    const { data: userDetails = [] } = useQuery({
        queryKey: ['userDetails'],
        queryFn: async () => {
            const res = await fetch(url2)
            const data = await res.json();
            return data;
        }
    })

    // const [like, setLike] = useState(reactions.length);

    const handleReactions = () => {
        // setIsLiked(!isLiked);
        const reaction = {
            postId: post._id,
            like: 1,
            reviewerEmail: userDetails?.email,
            reviewerName: userDetails?.displayName,
            reviewerPhotoURL: userDetails?.photoURL,
        }

        fetch(`https://mern-cial-server.vercel.app/reviewReaction`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reaction)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    return toast.error(`${data.message}`);
                }

                // setLike(like);
                const reactionUpdate = {
                    like: reactions.length + 1
                }
                console.log(reactionUpdate);
                fetch(`https://mern-cial-server.vercel.app/postsReaction/${post._id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(reactionUpdate)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            // toast.success('User updated successfully!')
                        }

                    })
                // if (data.matchedCount > 0) {
                //     // setLike(like + 1);
                // }

                // console.log(data);
                refetch();
            })
            .catch(err => console.error(err.message))
    }

    return (
        <div className='flex'>
            <p className='text-3xl text-blue-600 flex'>
                <span onClick={() => handleReactions(post._id)}><AiFillLike></AiFillLike></span>
                <span onClick={() => handleReactions(post._id)}><FcLike></FcLike></span>
            </p>
            <p className='text-xl ml-1'>{reactions.length} {(reactions.length === 0 || reactions.length === 1) ? 'people' : 'peoples'} like</p>
        </div>
    );
};

export default ReactionManage;