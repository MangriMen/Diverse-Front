import '@mui';

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    third: string;
    dimmed: string;
    like: string;
    border: string;
  }

  interface PaletteOptions {
    dimmed?: PaletteColorOptions;
    third?: PaletteColorOptions;
    transparentButton?: PaletteColorOptions;
  }

  interface Palette {
    dimmed: PaletteColor;
    third: PaletteColor;
    transparentButton: PaletteColor;
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

  interface IconButtonPropsColorOverrides {
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
