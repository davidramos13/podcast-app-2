import { Global } from '@emotion/react';
import { Fragment } from 'react';
import tw, { css, theme, GlobalStyles as BaseStyles } from 'twin.macro';

const customStyles = css({
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
  },
});

const GlobalStyles = () => (
  <Fragment>
    <BaseStyles />
    <Global styles={customStyles} />
  </Fragment>
);

export default GlobalStyles;
