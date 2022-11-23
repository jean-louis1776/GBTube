import React from 'react';

export const uploadErrorMessage = ({ errors, type }) => {
  return (
    errors[type] && (
      <p style={{ color: 'red' }}>
        {errors[type]?.message || `Ошибка в ${type}`}
      </p>
    )
  );
};
