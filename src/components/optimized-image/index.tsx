import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  role?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, width, height, className, role }) => {
  return (
    <Image
      src={src}
      alt={alt}
      role={role}
      width={width}
      height={height}
      className={className}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
    />
  );
};

export default OptimizedImage;