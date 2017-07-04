import React from 'react'
import { Route } from 'react-router'
import { view as Builder } from './builder'
import { view as Forms } from './forms'

export default (
  <Route path="/">
    <Route path="forms(/:category)" component={Forms} />
    <Route path="build" component={Builder} />
  </Route>
);