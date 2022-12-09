import React from 'react';

const Image = (props) => {
  return (
    <img
      className='image'
      src={require('../../imgs/tomatoMe.png').default}
      alt='no-face'
    />
  );
};

export default Image;
