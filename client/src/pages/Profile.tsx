import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

import useAuth from "../features/auth/hooks/useAuth";
import ProfileHeader from "../features/profile/components/ProfileHeader";
import ProfileTabs from "../features/profile/components/ProfileTabs";
import SecondaryUi from "../features/profile/components/SecondaryUi";
import { container, item } from "../animations";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <SecondaryUi />;
  }

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="visible"
      className="mx-auto mt-10 max-w-7xl px-6 py-10"
    >
      <motion.div variants={item}>
        <ProfileHeader user={user} />
      </motion.div>

      <motion.div variants={item}>
        <ProfileTabs />
      </motion.div>

      <motion.div variants={item}>
        <Outlet />
      </motion.div>
    </motion.section>
  );
};

export default Profile;
