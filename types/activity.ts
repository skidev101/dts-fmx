export type ActivityWithUser = {
  id: string;
  type: string;
  entity: string;
  entityId: string;
  createdAt: string | Date;
  user: {
    id: string;
    username: string;
    email: string;
  };
};
