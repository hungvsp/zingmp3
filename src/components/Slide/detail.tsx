import React from 'react';

type PropsType = {
  src: string;
};

const Detail: React.FC<PropsType> = (props) => {
  const { src } = props;
  return <img src={src} alt="" />;
};
export default Detail;
