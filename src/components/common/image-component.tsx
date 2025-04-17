interface ImageComponentProps {
    src: string;
    alt: string;
    className?: string;
  }
  const ImageComponent = ({ src, alt, className }: ImageComponentProps) => {
    return (
      <div className={`rounded overflow-hidden  ${className}`}>
        <img className="w-full" src={src} alt={alt} />
      </div>
    );
  };
  
  export default ImageComponent;
  