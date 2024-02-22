export const ALL_PERMISSIONS = [
  // users
  "users:roles:write",
  "users:roles:delete",

  // posts
  "posts:write",
  "posts:delete",
] as const;

type TPermissions = Record<
  (typeof ALL_PERMISSIONS)[number],
  (typeof ALL_PERMISSIONS)[number]
>;

export const PERMISSIONS = ALL_PERMISSIONS.reduce((acc, permission) => {
  acc[permission] = permission;
  return acc;
}, {} as TPermissions);

export const APPLICATION_USER_PERMISSIONS = [
  PERMISSIONS["posts:write"],
  PERMISSIONS["posts:delete"],
];

export const SYSTEM_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  APPLICATION_USER: "APPLICATION_USER",
};
