import '@mui';

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    hover: string;
    third: string;
    dimmed: string;
  }
  interface PaletteOptions {
    third?: PaletteColorOptions;
  }

  interface Pallete {
    third: PalleteColor;
  }
}

declare module '@mui/material' {
  interface TextFieldPropsColorOverrides {
    third;
  }

  interface ButtonPropsColorOverrides {
    dimmed;
    third;
    transparentButton;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    mobile: true;
  }
}
