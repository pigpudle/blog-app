import React from 'react';
import { BarLoader } from 'react-spinners';
import { css } from '@emotion/react';

const override = css`
  display: block;
  width: 100%;
`;

function Loader() {
    return (<div className="w-100">
        <BarLoader height={4} color="#007bff" css={override} className="text" />
    </div>)
}

export default Loader;