import { TagObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

interface Tag extends TagObject {
  name: string;
  description?: string;
}

const authTag: Tag = {
  name: 'Auth',
};
const userTag: Tag = {
  name: 'User',
};
const adminTag: Tag = {
  name: 'Admin',
};

const eventTag: Tag = {
  name: 'Event',
};

export default {
  authTag,
  userTag,
  adminTag,
  eventTag,
};
