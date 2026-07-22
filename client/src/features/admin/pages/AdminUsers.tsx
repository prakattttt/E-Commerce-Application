import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { fadeUp } from "../../../animations";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { getUsers } from "../api/admin.api";
import type { IUser } from "../types/users.types";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import { deleteUser } from "../api/admin.api";
import DeletePopup from "../../../components/common/DeletePopup";
import { toast } from "sonner";

const AdminUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);

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

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await deleteUser(selectedUser._id);

      toast.success(response.message);

      setUsers(users.filter((u) => u._id !== selectedUser._id));
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeletePopupOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <>
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
            <UserCard
              key={user._id}
              user={user}
              index={index}
              onDeleteClick={(user) => {
                setSelectedUser(user);
                setDeletePopupOpen(true);
              }}
            />
          ))}
        </div>
      </motion.section>
      <DeletePopup
        open={deletePopupOpen}
        itemName={selectedUser?.name ?? ""}
        itemType="User"
        onClose={() => {
          setDeletePopupOpen(false);
          setSelectedUser(null);
        }}
        onDelete={handleDeleteUser}
      />
    </>
  );
};

export default AdminUsers;
