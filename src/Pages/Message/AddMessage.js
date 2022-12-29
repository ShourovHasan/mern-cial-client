import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const AddMessage = ({ oppositeUser }) => {
    const { user } = useContext(AuthContext);
    const date = format(new Date(), "PPpp");

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
        const reviewerMessage = form.message.value;

        const message = {
            oppositeUserEmail: oppositeUser.email,
            oppositeUserName: oppositeUser.displayName,
            oppositeUserPhotoURL: oppositeUser.photoURL,
            myName: reviewerName,
            myEmail: reviewerEmail,
            myPhotoURL: reviewerPhotoURL,
            myMessage: reviewerMessage,
            publishedTime: date
        }
        // console.log(message);
        fetch('https://mern-cial-server.vercel.app/addMessage', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(message)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    // toast.success('Reviews Successfully Added');
                    // refetch();
                    form.reset();
                    // navigate(`/service/${_id}`)
                }
            })
            .catch(error => console.error(error));
    }
    return (
        <div className='mx-auto rounded-xl w-11/12 py-5'>
            {/* <h2 className='pt-10 text-3xl text-center text-blue-600'>Add your valuable feedback</h2> */}
            <form onSubmit={handleReviews} className='px-5 '>
                <textarea name="message" className="w-full mt-2 bg-white textarea textarea-ghost textarea-bordered" placeholder="write a message "></textarea>
                <div className="mt-3 text-xl card-actions">
                    <input type='submit' className='w-full bg-blue-600 btn text-white' value='Message'></input>
                </div>
            </form>
        </div>
    );
};

export default AddMessage;