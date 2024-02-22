export const ALL_PERMISSIONS = [
  //users
  "users:roles:create",
  "users:roles:delete",
];

type TPermissions = Record<
  (typeof ALL_PERMISSIONS)[number],
  (typeof ALL_PERMISSIONS)[number]
>;

export const PERMISSIONS = ALL_PERMISSIONS.reduce((acc, permission) => {
  acc[permission] = permission;
  return acc;
}, {} as TPermissions);
