import React from 'react';
import { colors as c } from '../theme';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
export type IconName =
  | 'repair'
  | 'scanner'
  | 'stain'
  | 'checklist'
  | 'facts'
  | 'calculator'
  | 'share'
  | 'back'
  | 'check'
  | 'photo'
  | 'trash';
export function Icon({
  name,
  color = c.muted,
  size = 22,
}: {
  name: IconName;
  color?: string;
  size?: number;
}) {
  const paths: Partial<Record<IconName, string>> = {
    repair:
      'M14 6a5 5 0 0 0-6 6L3 17a2.8 2.8 0 0 0 4 4l5-5a5 5 0 0 0 6-6l-3 3-4-4 3-3Z',
    scanner: 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M5 12h14',
    stain: 'M12 2S4 11 4 15a8 8 0 0 0 16 0c0-4-8-13-8-13Z',
    back: 'm14 5-7 7 7 7',
    check: 'm5 12 4 4L19 6',
    photo: 'M3 7h4l2-3h6l2 3h4v14H3V7m13 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0',
    trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7',
  };
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.65}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] && <Path d={paths[name]} />}
      {name === 'share' && (
        <>
          <Circle cx="18" cy="4" r="3" />
          <Circle cx="5" cy="12" r="3" />
          <Circle cx="18" cy="20" r="3" />
          <Path d="m8 10 7-4M8 14l7 4" />
        </>
      )}
      {name === 'facts' && (
        <>
          <Circle cx="12" cy="12" r="9" />
          <Path d="M12 11v6m0-10v.1" />
        </>
      )}
      {name === 'checklist' && (
        <>
          <Rect x="5" y="4" width="14" height="18" rx="2" />
          <Rect x="9" y="2" width="6" height="4" rx="1" />
          <Path d="M9 11h6m-6 5h6" />
        </>
      )}
      {name === 'calculator' && (
        <>
          <Rect x="5" y="2" width="14" height="20" rx="2" />
          <Path d="M8 5h8v4H8zM8 13h1m3 0h1m3 0h.1M8 17h1m3 0h1m3 0h.1" />
        </>
      )}
    </Svg>
  );
}
