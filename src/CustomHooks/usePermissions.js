import { useMemo } from "react";
import { useSelector } from "react-redux";
import { setPermissions } from "../config/permissions";

const usePermissions = () => {
  const user = useSelector((state) => state.invoices.userDummyData);

  const role = user?.role;

  const permissions = useMemo(() => {
    return setPermissions(role);
  }, [role]);

  return permissions;
};

export default usePermissions;
