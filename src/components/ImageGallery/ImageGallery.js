import { ImageItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ListGallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ListGallery>
      {images.map(image => (
        <ImageItem key={image.id} image={image} onImageClick={onImageClick} />
      ))}
    </ListGallery>
  );
};
