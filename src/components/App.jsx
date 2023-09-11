import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { dataQuery } from './api';
import { Loader } from './Loader/Loader';
import { Button } from './ButtonLoadMore/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    async function getQuery() {
      if (!query || !page) return;

      try {
        setIsLoading(true);
        setError(false);

        const userQuery = await dataQuery(query, page);
        setImages(prevImages => [...prevImages, ...userQuery.hits]);
        setTotalImages(userQuery.totalHits);

        if (page === 1) {
          toast.success('Here is was we found for your request.');
        }
      } catch (error) {
        setError(true);
        toast.error('Oops! Something went wrong. Please reload the page.');
      } finally {
        setIsLoading(false);
      }
    }
    getQuery();
  }, [page, query]);

  const handleSubmit = evt => {
    evt.preventDefault();
    const userSearch = evt.target.elements.query.value.trim();
    if (!userSearch) {
      toast.error('Please enter your request.');
      return;
    }
    setQuery(userSearch);
    setImages([]);
    setPage(1);
    setTotalImages(0);

    evt.target.reset();
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <Layout>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {images.length !== totalImages && !isLoading && (
        <Button onClick={handleLoadMore} />
      )}
      {error && <p>There was an ERROR. Please try again later.</p>}
      <Toaster />
      {selectedImage && (
        <Modal closeModal={closeModal} selectedImage={selectedImage} />
      )}
      <GlobalStyle />
    </Layout>
  );
};
