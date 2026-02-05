export const setPermissions = (userRole) => {
  return {
    canEdit: userRole === "super_admin",
    canDelete: userRole === "super_admin" || userRole === "admin",
    canChangeStatus: userRole === "super_admin" || userRole === "admin",
    canCreate: userRole !== "guest",
  };
};
