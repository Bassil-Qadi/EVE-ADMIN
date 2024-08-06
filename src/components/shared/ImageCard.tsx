import { useState } from 'react';
import classNames from 'classnames';

const ImageCard = ({ src, alt }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={classNames('transition-transform duration-300', {
        'w-full h-auto': isExpanded,
        'w-1/4 p-2': !isExpanded,
      })}
      onClick={handleClick}
    >
      <img src={src} alt={alt} className="w-full h-auto" />
    </div>
  );
};

export default ImageCard;
