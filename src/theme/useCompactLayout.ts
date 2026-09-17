import { useWindowDimensions } from 'react-native';

export function useCompactLayout() {
  const { width, height, fontScale } = useWindowDimensions();
  return {
    width,
    height,
    compact: width < 375 || height < 700,
    stacked: width < 360 || fontScale > 1.3,
  };
}
