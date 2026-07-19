import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { fadeUp } from "../../../animations";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { getUsers } from "../api/admin.api";
import type { IUser } from "../types/users.types";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";

const AdminUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        const response = await getUsers();
        setUsers(response.users);
      } catch (error) {
        getErrorMessage(error);
      }
    };

    run();
  }, []);

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <PageHeader
        title="Users"
        description="Manage all registered ShopSphere users."
      />

      <SearchBar placeholder="Search users..." className="max-w-md" />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {users.map((user, index) => (
          <UserCard key={user._id} user={user} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default AdminUsers;
