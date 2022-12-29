import React from 'react';
import useTitle from '../../../hooks/useTitle';
import PostField from '../PostField/PostField';
import Top3Posts from '../Top3Posts/Top3Posts';

const Home = () => {
    useTitle('Home');
    return (
        <div>
            <PostField></PostField>
            <Top3Posts></Top3Posts>
        </div>
    );
};

export default Home;