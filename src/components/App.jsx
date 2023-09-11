import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { dataQuery } from './api';
import { Loader } from './Loader/Loader';
import { Button } from './ButtonLoadMore/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    error: false,
    selectedImage: null,
    totalImages: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      try {
        this.setState({ isLoading: true, error: false });
        const userQuery = await dataQuery(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...userQuery.hits],
          totalImages: userQuery.totalHits,
        }));
        if (this.state.page === 1) {
          toast.success('Here is was we found for your request.');
        }
      } catch (error) {
        this.setState({ error: true });
        toast.error('Oops! Something went wrong. Please reload the page.');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const userSearch = evt.target.elements.query.value.trim();
    if (!userSearch) {
      toast.error('Please enter your request.');
      return;
    }
    this.setState({
      query: userSearch,
      images: [],
      page: 1,
      totalImages: 0,
    });
    evt.target.reset();
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = image => {
    this.setState({ selectedImage: image });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, isLoading, selectedImage, totalImages } = this.state;
    return (
      <Layout>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.openModal} />
        )}
        {images.length !== totalImages && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
        <Toaster />
        {selectedImage && (
          <Modal closeModal={this.closeModal} selectedImage={selectedImage} />
        )}
        <GlobalStyle />
      </Layout>
    );
  }
}
