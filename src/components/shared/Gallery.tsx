import ImageCard from './ImageCard';

const Gallery = ({ images }: any) => {

  return (
    <div className="flex flex-wrap -mx-2">
      {images.map((image: { src: any; alt: any; }, index: any) => (
        <ImageCard key={index} src={image.src} alt={image.alt} />
      ))}
    </div>
  );
};

export default Gallery;
