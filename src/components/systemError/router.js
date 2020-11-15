import React from 'react';

export default function(LoadableWrap){
    return [
        {
            name: 'SystemError',
            path: '/systemError',
            exact: true,
            component: LoadableWrap({
                loader: () => import('./SystemError')
            })
        }
    ];
}
