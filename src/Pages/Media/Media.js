import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useTitle from '../../hooks/useTitle';
import Loading from '../SharedPages/Loading/Loading';
import PostsCard from '../SharedPages/postsCard/PostsCard';

const Media = () => {
    useTitle('Media');
    const url = `https://mern-cial-server.vercel.app/posts`;
    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['posts'],
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
        <div className=''>
            <h2 className='text-center text-primary text-4xl my-10'>Some Popular Posts</h2>
            <div className='my-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-4 mx-auto'>
                {
                    posts.map(post => <PostsCard
                        key={post._id}
                        post={post}
                    ></PostsCard>)
                }
            </div>
        </div>
    );
};

export default Media;