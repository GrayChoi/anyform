import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { view as Builder } from './builder'
import { view as Forms } from './forms'
import { view as welcome } from './welcome';

export default (
  <Route path="/">
    <IndexRoute component={welcome} />
    <Route path="forms(/:category)" component={Forms} />
    <Route path="build(/:formId)" component={Builder} />
  </Route>
);