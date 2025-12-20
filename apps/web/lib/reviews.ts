import { supabase } from "./supabase";

export interface ProductReview {
  id: string;
  productId: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export async function fetchProductReviews(
  productId: string,
): Promise<ProductReview[]> {
  const { data, error } = await supabase
    .from("product_reviews")
    .select("id, product_id, name, rating, comment, created_at")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews", error);
    return [];
  }

  if (!data) return [];

  return data.map((item) => ({
    id: item.id,
    productId: item.product_id,
    name: item.name,
    rating: item.rating,
    comment: item.comment,
    createdAt: item.created_at,
  }));
}

export async function createProductReview(params: {
  productId: string;
  name: string;
  rating: number;
  comment: string;
}): Promise<ProductReview | null> {
  const { productId, name, rating, comment } = params;
  const trimmedName = name.trim();
  const trimmedComment = comment.trim();

  if (!trimmedName || !trimmedComment || rating < 1 || rating > 5) {
    throw new Error("Invalid review payload");
  }

  const { data, error } = await supabase
    .from("product_reviews")
    .insert({
      product_id: productId,
      name: trimmedName,
      rating,
      comment: trimmedComment,
    })
    .select("id, product_id, name, rating, comment, created_at")
    .single();

  if (error) {
    console.error("Error creating review", error);
    throw error;
  }

  return {
    id: data.id,
    productId: data.product_id,
    name: data.name,
    rating: data.rating,
    comment: data.comment,
    createdAt: data.created_at,
  };
}
