import { motion } from "framer-motion";
import { useState } from "react";

import { fadeUp } from "../../../animations";
import CategoryInfoForm from "../components/CategoryInfoForm";
import CategoryImageUpload from "../components/CategoryImageUpload";
import FormActions from "../components/FormActions";

const NewCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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

      <CategoryInfoForm
        name={name}
        onNameChange={setName}
        description={description}
        onDescriptionChange={setDescription}
      />

      <CategoryImageUpload />

      <FormActions cancelTo="/admin/categories" saveLabel="Save Category" />
    </motion.section>
  );
};

export default NewCategory;
