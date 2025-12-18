"use client"

import { useEffect, useState } from "react"
import { api, type Product, type Category } from "@/lib/api"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@workspace/ui/components/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Card, CardContent } from "@workspace/ui/components/card"
import { toast } from "sonner"
import { X, Plus, Image as ImageIcon, ArrowRight, ArrowLeft } from "lucide-react"
import { ImageUpload } from "@/components/ui/image-upload"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  
  // Wizard State
  const [step, setStep] = useState(1)
  const [images, setImages] = useState<string[]>([])
  const [currentImageUrl, setCurrentImageUrl] = useState("")

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    sku: "",
    categoryId: "",
    stock: "0",
    description: "",
  })

  // Category Form State
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await api.getProducts()
      if (response.success) {
        setProducts(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch products", error)
      toast.error("Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await api.getCategories()
      if (response.success) {
        setCategories(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch categories", error)
      toast.error("Failed to fetch categories")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      await api.deleteProduct(id)
      toast.success("Product deleted successfully")
      fetchProducts()
    } catch (error) {
      console.error("Failed to delete product", error)
      toast.error("Failed to delete product")
    }
  }

  const handleAddImage = () => {
    if (!currentImageUrl) return
    // Basic URL validation
    try {
      new URL(currentImageUrl)
      setImages([...images, currentImageUrl])
      setCurrentImageUrl("")
    } catch {
      toast.error("Please enter a valid URL")
    }
  }

  const handleRemoveImage = (urlToRemove: string) => {
    setImages(images.filter((url) => url !== urlToRemove))
  }

  const handleNextStep = () => {
    // Validate Step 1
    if (!formData.name || !formData.slug || !formData.price || !formData.sku || !formData.categoryId) {
      toast.error("Please fill in all required fields")
      return
    }
    setStep(2)
  }

  const handleSubmit = async () => {
    // Validate Step 2
    if (images.length < 4) {
      toast.error("Please add at least 4 images")
      return
    }

    try {
      await api.createProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: images,
        imageUrl: images[0], // Set primary image
      })
      toast.success("Product created successfully")
      setIsDialogOpen(false)
      resetForm()
      fetchProducts()
    } catch (error) {
      console.error("Failed to create product", error)
      toast.error("Failed to create product")
    }
  }

  const handleCreateCategory = async () => {
    if (!categoryForm.name || !categoryForm.slug) {
      toast.error("Name and Slug are required")
      return
    }

    try {
      const response = await api.createCategory(categoryForm)
      if (response.success) {
        toast.success("Category created successfully")
        await fetchCategories()
        setFormData({ ...formData, categoryId: response.data.id })
        setIsCategoryDialogOpen(false)
        setCategoryForm({ name: "", slug: "", description: "" })
      }
    } catch (error) {
      console.error("Failed to create category", error)
      toast.error("Failed to create category")
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      price: "",
      sku: "",
      categoryId: "",
      stock: "0",
      description: "",
    })
    setImages([])
    setStep(1)
    setCurrentImageUrl("")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            
            {/* Steps Indicator */}
            <div className="flex items-center justify-center mb-6">
              <div className={`flex items-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}>1</div>
                <span className="ml-2 font-medium">Details</span>
              </div>
              <div className={`w-16 h-0.5 mx-4 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
              <div className={`flex items-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}>2</div>
                <span className="ml-2 font-medium">Images</span>
              </div>
            </div>

            <div className="space-y-6">
              {step === 1 && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Product Name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="product-slug"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      placeholder="SKU-123"
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="0"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="category">Category</Label>
                    <div className="flex gap-2">
                      <Select 
                        value={formData.categoryId} 
                        onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" title="Add New Category">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create New Category</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <Label htmlFor="cat-name">Name</Label>
                              <Input
                                id="cat-name"
                                value={categoryForm.name}
                                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                                placeholder="Category Name"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cat-slug">Slug</Label>
                              <Input
                                id="cat-slug"
                                value={categoryForm.slug}
                                onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                                placeholder="category-slug"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cat-desc">Description</Label>
                              <Input
                                id="cat-desc"
                                value={categoryForm.description}
                                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                                placeholder="Optional description"
                              />
                            </div>
                            <Button onClick={handleCreateCategory} className="w-full">
                              Create Category
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Product description..."
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Label htmlFor="imageUrl">Add by URL</Label>
                      <Input
                        id="imageUrl"
                        value={currentImageUrl}
                        onChange={(e) => setCurrentImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddImage()
                          }
                        }}
                      />
                    </div>
                    <Button onClick={handleAddImage} type="button" variant="secondary">
                      <Plus className="w-4 h-4 mr-2" /> Add URL
                    </Button>
                  </div>

                  <div className="pt-4">
                    <Label className="mb-2 block">Product Images</Label>
                    <ImageUpload
                      value={images}
                      onChange={setImages}
                      onRemove={handleRemoveImage}
                      maxFiles={10}
                      bucketName="CrestSports"
                    />
                  </div>
                  
                  <div className="text-sm text-muted-foreground text-right">
                    {images.length} / 4 required images
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="mt-6">
              {step === 1 ? (
                <Button onClick={handleNextStep} className="w-full sm:w-auto">
                  Next Step <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button onClick={handleSubmit} disabled={images.length < 4}>
                    Create Product
                  </Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.category?.name || product.categoryId}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No products found
                </TableCell>
              </TableRow>
            )}
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
