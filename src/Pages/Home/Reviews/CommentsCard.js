import React from 'react';

const CommentsCard = ({ comment }) => {
    const { reviewerFeedback, reviewerName, reviewerPhotoURL, publishedTime } = comment;
    // console.log(comment);
    return (
        <div className="mx-auto mb-2 border shadow-xl card bg-base-100 neumorphism_Banner_Card">
            <div className='flex my-2 ml-3'>
                <figure className='mb-1 mr-3'>
                    <img src={reviewerPhotoURL} className='w-14 rounded-full' alt="Shoes" />
                </figure>
                <div>
                    <h2 className="card-title text-2xl">
                        {reviewerName}
                    </h2>
                    <small><p>{publishedTime}</p></small>
                </div>
            </div>
            <div className="card-body m-0 px-3 pt-0 pb-3">
                <p>{reviewerFeedback}</p>
            </div>
        </div>
    );
};

export default CommentsCard;