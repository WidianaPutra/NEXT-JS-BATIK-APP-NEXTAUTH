import { useSession } from "next-auth/react";
import axios from "axios";

export const AdminProtect = async (req: unknown) => {
  const { data: session, status } = useSession();

  const ress = await axios.get(`/api/user/${session?.user?.email}`);

  if (ress.data.data.role === "admin") {
    return true;
  }
  return false;
};
