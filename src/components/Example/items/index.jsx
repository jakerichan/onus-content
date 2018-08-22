import React from 'react';
import { Route, Link } from 'react-router-dom';
import { SetContent } from '../../../../index';
import Item from './item';
import list from './list.json';

export default ({ match }) => (
  <div>
    <SetContent id="heading" priority={1}>
      <h1 key='items'>Items</h1>
    </SetContent>
    <ul>
      {list.map(({ label, id }) => (
        <li key={label}>
          <Link to={`${match.url}/${id}`}>{label}</Link>
        </li>
      ))}
    </ul>

    <hr />

    <Route path={`${match.path}/:item`} component={Item} />
  </div>
);
