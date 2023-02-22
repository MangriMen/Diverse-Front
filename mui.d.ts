import '@mui';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    third?: PaletteOptions['primary'];
  }

  interface Pallete {
    third?: Pallete['primary'];
  }
}
