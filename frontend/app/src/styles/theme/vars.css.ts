import { createGlobalTheme } from '@vanilla-extract/css';
import { theme } from './theme';

export const vars = createGlobalTheme(':root', theme);
