import { createSelector } from '@reduxjs/toolkit';

export const getSelector = (key, subKey) =>
  createSelector(
    (state) => state,
    (state) => state?.[key]?.[subKey] ?? null
  );
