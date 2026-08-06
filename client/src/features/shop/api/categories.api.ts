import axios from "../../../api/axios";

export const getCategories = async () => {
  const { data } = await axios.get("/categories");

  return data;
};

export const getCategoryBySlug = async (slug: string) => {
  const { data } = await axios.get(`/categories/${slug}`);

  return data;
};
