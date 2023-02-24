export const THEME_DEFAULT_OPTIONS = {
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        inputProps: { maxLength: 90 },
      },
    },
  },
};
