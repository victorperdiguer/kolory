import React from 'react';

export const LockedColorsContext = React.createContext({
    lockedColors: [] as number[],
    handleLockColor: (color: number, deleted?: boolean) => {},
});