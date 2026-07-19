import { motion } from "framer-motion";
import { useState } from "react";

import { fadeUp } from "../../../animations";
import CategoryInfoForm from "../components/CategoryInfoForm";
import CategoryImageUpload from "../components/CategoryImageUpload";
import CategorySettingsForm from "../components/CategorySettingsForm";
import CategoryPreview from "../components/CategoryPreview";
import FormActions from "../components/FormActions";

const NewCategory = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [featured, setFeatured] = useState(false);

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
        slug={slug}
        onSlugChange={setSlug}
        description={description}
        onDescriptionChange={setDescription}
      />

      <CategoryImageUpload />

      <CategorySettingsForm
        status={status}
        onStatusChange={setStatus}
        featured={featured}
        onFeaturedChange={setFeatured}
      />

      <CategoryPreview name={name} description={description} />

      <FormActions cancelTo="/admin/categories" saveLabel="Save Category" />
    </motion.section>
  );
};

export default NewCategory;
