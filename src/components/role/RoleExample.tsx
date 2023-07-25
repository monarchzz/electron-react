import { FragmentType, useFragment } from 'renderer/gql/fragment-masking';
import RoleFragment from 'renderer/services/graphql/fragments/role';

function Role(props: { role: FragmentType<typeof RoleFragment> }) {
  const role = useFragment(RoleFragment, props.role);

  return <div>{role?.name}</div>;
}

export default Role;
