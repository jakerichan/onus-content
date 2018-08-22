import React from 'react';
import { GetContent, SetContent } from '../../../../../index';
import list from '../list.json';

export default ({ match }) => {
  const item = list.find(({ id }) => id === match.params.item);

  return (
    <div>
      <SetContent id='heading' priority={2}>
        <h1>{item.label}</h1>
      </SetContent>

      <GetContent id='heading' />
      <p>{item.description}</p>
      <hr />
    </div>
  );
};
