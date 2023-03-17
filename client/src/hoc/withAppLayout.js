import React from 'react';

import Header from '../components/_general/Header';

function withAppLayout(Component) {
    return function(props) {
        return (<>
            <Header className="mb-5" />
            <Component {...props} />
        </>);
    }
}

export default withAppLayout;