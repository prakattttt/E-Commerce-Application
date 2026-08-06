import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { fadeUp } from "../../../animations";
import CategoryInfoForm from "../components/CategoryInfoForm";
import CategoryImageUpload from "../components/CategoryImageUpload";
import FormActions from "../components/FormActions";

import { updateCategory } from "../api/admin.api";

import { getCategoryBySlug } from "../../shop/api/categories.api";

import { getErrorMessage } from "../../../utils/getErrorMessage";

const EditCategory = () => {
  const { slug } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [existingImage, setExistingImage] = useState<
    | {
        url: string;
        publicId: string;
      }
    | undefined
  >();

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryBySlug(slug!);

        const category = response.category;

        setName(category.name);

        setExistingImage(category.image);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  const onSave = async () => {
    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("name", name);

      if (image) {
        formData.append("image", image);
      }

      const response = await updateCategory(formData, slug!);

      toast.success(response.message);

      navigate("/admin/categories");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-5xl space-y-8"
    >
      <div>
        <h1 className="font-display text-3xl font-bold">Edit Category</h1>

        <p className="mt-2 text-muted-foreground">
          Update category information.
        </p>
      </div>

      <CategoryInfoForm name={name} onNameChange={setName} />

      <CategoryImageUpload
        image={image}
        existingImage={existingImage}
        onImageChange={setImage}
      />

      <FormActions
        cancelTo="/admin/categories"
        saveLabel="Update Category"
        onSave={onSave}
        loading={submitting}
      />
    </motion.section>
  );
};

export default EditCategory;
