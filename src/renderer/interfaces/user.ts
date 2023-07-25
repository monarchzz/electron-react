import Attachment from './attachment';
import Role from './role';

interface User {
  id: string;
  address?: string;
  avatar?: Attachment;
  dateOfBirth: string;
  email: string;
  emailConfirmed: boolean;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  role: Role;
}

export default User;
