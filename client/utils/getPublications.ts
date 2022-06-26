import { gql } from '@apollo/client/core';
import { apolloClient } from './apollo-client';
import { prettyJSON } from './helpers';

const WHO_COLLECTED = `
  query($request: WhoCollectedPublicationRequest!) {
    whoCollectedPublication(request: $request) {
      items {
        address
      }
    }
  }
`;

export const whoCollectedRequest = (publicationId: string) => {
  return apolloClient.query({
    query: gql(WHO_COLLECTED),
    variables: {
      request: {
        publicationId,
      },
    },
  });
};

export const whoCollected = async (publicationId: string) => {
  const result = await whoCollectedRequest(publicationId);
  prettyJSON('who collected: result', result.data);

  return result.data;
};
