import React from 'react';

type Props = {
  isAdd: boolean,
  setIsAdd: (isAdd: boolean) => void,
};

export const AddButton: React.FC<Props> = ({ isAdd, setIsAdd }) => {
  return (
    <button onClick={() => setIsAdd(!isAdd)}>
      {isAdd ? 'Назад' : 'Додати'}
    </button>
  );
};
