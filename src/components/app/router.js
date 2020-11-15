import React from 'react';
import LoadableWrap from 'components/common/loadableWrap/LoadableWrap';

import index from 'components/index/router';

import notFound from 'components/notFound/router';
import systemError from 'components/systemError/router';

let routes = [
    ...(index(LoadableWrap)),
    ...(systemError(LoadableWrap)),
    ...(notFound(LoadableWrap))
];

export default routes;
