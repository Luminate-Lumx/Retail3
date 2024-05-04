import styled from 'styled-components';

export const Container = styled.a`
  text-decoration: none;
`;

export const ContainerButton = styled.button`
  text-decoration: none;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  background-color: var(--blue);
  width: 100%;
  color: white;
  padding: 5px 15px 5px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 22px;

  // Desktops
  @media (max-width: 1919px) {
    font-size: 16px;
  }
`;

export const IconImage = styled.div`
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
