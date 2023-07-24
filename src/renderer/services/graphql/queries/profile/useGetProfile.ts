import { graphql } from 'renderer/gql';
import { useQuery } from 'urql';

export const profileQuery = graphql(`
  query Profile {
    profile {
      id
      lastName
      firstName
      email
      phoneNumber
      gender
    }
  }
`);

const useGetProfile = () => {
  const [result, reexecuteQuery] = useQuery({
    query: profileQuery,
  });

  return [result, reexecuteQuery];
};

export default useGetProfile;
