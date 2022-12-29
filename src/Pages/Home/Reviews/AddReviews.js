import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../SharedPages/Loading/Loading';

const AddReviews = ({ post, refetch }) => {
    const { user } = useContext(AuthContext);
    const date = format(new Date(), "PPpp");
    // const url = `https://mern-cial-server.vercel.app/reviews/${post?._id}`;
    // const { data: reviews = [], isLoading } = useQuery({
    //     queryKey: ['reviews'],
    //     queryFn: async () => {
    //         const res = await fetch(url)
    //         const data = await res.json();
    //         return data;
    //     }
    // })
    const url2 = `https://mern-cial-server.vercel.app/users/${user?.email}`;
    const { data: userDetails = [] } = useQuery({
        queryKey: ['userDetails'],
        queryFn: async () => {
            const res = await fetch(url2)
            const data = await res.json();
            return data;
        }
    })

    const handleReviews = event => {
        event.preventDefault();
        const form = event.target;
        const reviewerEmail = userDetails?.email;
        const reviewerName = userDetails?.displayName;
        const reviewerPhotoURL = userDetails?.photoURL;
        const reviewerFeedback = form.review.value;

        const reviews = {
            postId: post._id,
            reviewerName: reviewerName,
            reviewerEmail: reviewerEmail,
            reviewerPhotoURL: reviewerPhotoURL,
            reviewerFeedback: reviewerFeedback,
            publishedTime: date
        }
        // console.log(reviews);
        fetch('https://mern-cial-server.vercel.app/addReviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reviews)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    // toast.success('Reviews Successfully Added');
                    refetch();
                    form.reset();
                    // navigate(`/service/${_id}`)
                }
            })
            .catch(error => console.error(error));
    }

    // if (isLoading) {
    //     return <Loading></Loading>
    // }
    return (
        <div className='mx-auto bg-base-200 rounded-xl w-11/12 py-5'>
            {/* <h2 className='pt-10 text-3xl text-center text-blue-600'>Add your valuable feedback</h2> */}
            <form onSubmit={handleReviews} className='px-5 '>
                <textarea name="review" className="w-full mt-2 bg-white textarea textarea-ghost" placeholder="add your valuable comment "></textarea>
                <div className="mt-3 text-xl card-actions">
                    <input type='submit' className='w-full bg-blue-600 btn text-white' value='Add Comment'></input>
                </div>
            </form>
        </div>
    );
};

export default AddReviews;