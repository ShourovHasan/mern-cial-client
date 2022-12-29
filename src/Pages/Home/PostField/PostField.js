import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Lottie from "lottie-react";
import postImg from '../../../assets/post.json';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import Loading from '../../SharedPages/Loading/Loading';
import { useQuery } from '@tanstack/react-query';

const PostField = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    let navigate = useNavigate();
    const date = format(new Date(), "PPpp");

    const url = `https://mern-cial-server.vercel.app/users/${user?.email}`;
    const { data: userDetails = [], isLoading } = useQuery({
        queryKey: ['userDetails'],
        queryFn: async () => {
            const res = await fetch(url)
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }

    const handlePost = data => {
        if (!user?.email) {
            return navigate('/login');
        }
        // const { post } = data;
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // handleSignUp(email, password, displayName, imgData.data.url);
                    const post = {
                        userName: userDetails.displayName,
                        userEmail: userDetails.email,
                        userPhoto: userDetails.photoURL,
                        postTime: date,
                        postDescription: data.post,
                        postPicture: imgData?.data?.url,
                    }
                    fetch('https://mern-cial-server.vercel.app/post', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(result => {
                            // console.log(result);
                            toast.success(`post is added successfully`);
                            navigate('/media')
                        })
                }
            })
    }
    return (
        <div className="hero lg:h-[350px] md:h-[300px] mx-auto ">
            <div className="flex-col gap-20 mx-auto hero-content lg:flex-row md:flex-row">
                <div className="text-center lg:w-1/3 lg:text-left md:w-1/3 w-2/3">
                    <Lottie loop={true} animationData={postImg} />
                </div>
                <div className="px-5 rounded-lg  shadow-neutral neumorphism_Banner_Card py-7 lg:w-[385px] md:w-[315px] w-full">
                    <form onSubmit={handleSubmit(handlePost)} className=''>
                        {/* <Header /> */}
                        <div className="w-full form-control">
                            <textarea {...register("post", {
                                required: "post content is required"
                            })} type="post" placeholder="What's on your mind." className="textarea w-full textarea-bordered"></textarea>
                            {errors.post && <p role="alert" className='ml-4 text-red-500'>{errors.post?.message}</p>}
                        </div>
                        <div className="w-full form-control mt-2">
                            <input  {...register("img", {
                                required: "Photo is required"
                            })} type="file" placeholder="Upload Your Photo" className="w-full file-input file-input-bordered" />
                            {errors.img && <p role="alert" className='ml-4 text-red-600'>{errors.img?.message}</p>}
                        </div>
                        <input type="submit" className='w-full pb-0 mt-5 mb-0 text-white btn bg-gradient-to-r from-secondary to-primary' value='Post' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostField;