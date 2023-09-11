import { Oval } from 'react-loader-spinner';
import { WrapperLoader } from './Loader.styled';

export const Loader = () => {
  return (
    <WrapperLoader>
      <Oval
        height={80}
        width={80}
        color="#0710E9"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#0710E9"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </WrapperLoader>
  );
};
