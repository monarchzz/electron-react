import { graphql } from 'renderer/gql';

const RoleFragment = graphql(`
  fragment RoleFragment on RolePayload {
    id
    name
    description
  }
`);

export default RoleFragment;
