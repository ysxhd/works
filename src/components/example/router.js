import React from 'react';

export default function(LoadableWrap){
    return [
        {
            name: 'example',
            path: '/example',
            exact: false,
            component: LoadableWrap({
                loader: () => import('./Example')
            }),
            routes: [
                {
                    name: 'sub1',
                    path: '/sub1',
                    exact: true,
                    component: LoadableWrap({
                        loader: () => import('./sub1/Sub1')
                    })
                },
                {
                    name: 'sub2',
                    path: '/sub2',
                    exact: true,
                    component: LoadableWrap({
                        loader: () => import('./sub2/Sub2')
                    })
                }
            ]
        }
    ];
}
