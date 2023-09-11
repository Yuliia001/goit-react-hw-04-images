import { Image, WrapperItem } from './ImageGalleryItem.styled';

export const ImageItem = ({
  image: { webformatURL, largeImageURL, tags },
  onImageClick,
}) => {
  return (
    <WrapperItem>
      <Image
        src={webformatURL}
        alt={tags}
        onClick={() => onImageClick(largeImageURL)}
      />
    </WrapperItem>
  );
};
