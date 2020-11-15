import React from 'react';

export default function(LoadableWrap){
    return [
        {
            name: 'index',
            path: '/',
            exact: false,
            component: LoadableWrap({
                loader: () => import('./Index')
            })
        }
    ];
}
