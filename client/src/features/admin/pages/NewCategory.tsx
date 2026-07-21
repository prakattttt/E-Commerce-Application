import { motion } from "framer-motion";
import { useState } from "react";

import { fadeUp } from "../../../animations";
import CategoryInfoForm from "../components/CategoryInfoForm";
import CategoryImageUpload from "../components/CategoryImageUpload";
import FormActions from "../components/FormActions";
import { createCategory } from "../api/admin.api";
import { toast } from "sonner";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { useNavigate } from "react-router-dom";

const NewCategory = () => {
  const [name, setName] = useState("");
  const image = ""; //temporary image until image handling
  const navigate = useNavigate();

  const onSave = async () => {
    try {
      const response = await createCategory({ name, image });
      toast.success(response.message);
      navigate("/admin/categories");
    } catch (error) {
      getErrorMessage(error);
    }
  };

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-5xl space-y-8"
    >
      <div>
        <h1 className="font-display text-3xl font-bold">Add New Category</h1>

        <p className="mt-2 text-muted-foreground">
          Create a new category to organize your products.
        </p>
      </div>

      <CategoryInfoForm name={name} onNameChange={setName} />

      <CategoryImageUpload />

      <FormActions cancelTo="/admin/categories" saveLabel="Save Category" onSave={onSave} />
    </motion.section>
  );
};

export default NewCategory;
