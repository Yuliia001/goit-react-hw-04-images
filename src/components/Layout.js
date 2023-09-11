import styled from 'styled-components';

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
  box-sizing: border-box;
  width: 100vw;
  overflow-x: hidden;
}

,
::before,
::after {
  box-sizing: inherit;
`;
