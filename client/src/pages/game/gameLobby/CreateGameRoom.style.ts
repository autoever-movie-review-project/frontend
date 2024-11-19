import styled from 'styled-components';

export const CreateGameRoomForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;
  margin: 10px 20px;
`;

export const CreateGameInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #f2f2f2;
  margin-top: 20px;
`;

export const StepperWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StepperDownButton = styled.div<{ $Number: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  width: 60px;
  height: 60px;
  font-size: 24px;
  border-radius: 5px;
  cursor: pointer;
  background: ${({ $Number }) => $Number === 2 && 'lightgrey'};
`;

export const StepperUpButton = styled.div<{ $Number: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  width: 60px;
  height: 60px;
  font-size: 24px;
  border-radius: 5px;
  cursor: pointer;
  background: ${({ $Number }) => $Number === 8 && 'lightgrey'};
`;

export const StepperNumber = styled.input`
  display: flex;
  border: none;
  width: 20px;
  font-size: 24px;
  font-weight: 600;
  color: #f2f2f2;
  background-color: transparent;
  text-align: center;
  cursor: default;

  &:focus {
    outline: none;
  }
`;
