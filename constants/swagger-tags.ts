import { TagObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

interface Tag extends TagObject {
  name: string;
  description?: string;
}

const auth: Tag = {
  name: 'Auth',
};
const user: Tag = {
  name: 'User',
};
const admin: Tag = {
  name: 'Admin',
};

const event: Tag = {
  name: 'Event',
};

export default {
  auth,
  user,
  admin,
  community: event,
};
