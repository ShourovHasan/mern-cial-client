import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const ResetPassword = () => {
    const { resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleResetPassword = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        // console.log(email);

        resetPassword(email)
            .then(() => {
                toast.success('Check your inbox and spam email for reset password');
                form.reset();
                navigate('/login');
            })
            .catch((error) => {
                console.error(error.message);
            })
    }
    return (
        <div className='flex justify-center my-32'>
            <form onSubmit={handleResetPassword} className='flex flex-col p-10 rounded-lg shadow-xl lg:w-1/2'>
                <h3 className='mb-3 text-3xl text-center'>Reset Password</h3>
                <input type="email" name='email' placeholder="your email" className="w-full mb-3 input input-bordered" required />
                <input type="submit" value="reset password" className='btn' />
            </form>
        </div>
    );
};

export default ResetPassword;