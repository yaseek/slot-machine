export const getNextValue = (last, imagesLength) => last + 1 === imagesLength
    ? 0
    : last + 1
