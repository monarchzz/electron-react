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
      emailConfirmed
      address
      dateOfBirth
      avatar {
        ...AttachmentFragment
      }
      roles {
        ...RoleFragment
      }
    }
  }
`);

const useGetProfile = () => {
  return useQuery({
    query: profileQuery,
  });
};

export default useGetProfile;
