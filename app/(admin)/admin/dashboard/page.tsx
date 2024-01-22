import { getCurrentUser } from "@/actions/user";
import SuperAdminDashContent from "@/components/superadmin/SuperAdminDashContent";

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  if (!user.seller) return null;

  return (
    <>
      <SuperAdminDashContent />
    </>
  );
};

export default page;
