import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryTable } from './category-table';
import { AddCategoryDialog } from './add-category-dialog';
import { EditCategoryDialog } from './edit-category-dialog';
import { DeleteCategoryDialog } from './delete-category-dialog';
import { AddSubcategoryDialog } from './add-subcategory-dialog';
import { Category } from '@/lib/types/category';
import { useToast } from '@/hooks/use-toast';

// Mock data - replace with actual API integration
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Electronic devices and accessories',
    imageUrl: 'https://example.com/electronics.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subcategories: [
      {
        id: '1-1',
        name: 'Smartphones',
        description: 'Mobile phones and accessories',
        imageUrl: 'https://example.com/smartphones.jpg',
        categoryId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddSubcategoryOpen, setIsAddSubcategoryOpen] = useState(false);
  const { toast } = useToast();

  const handleAddCategory = async (formData: FormData) => {
    try {
      // In a real app, you would make an API call here
      const newCategory: Category = {
        id: Math.random().toString(),
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        imageUrl: URL.createObjectURL(formData.get('image') as File),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        subcategories: [],
      };

      setCategories([...categories, newCategory]);
      setIsAddOpen(false);
      toast({
        title: 'Success',
        description: 'Category added successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add category',
        variant: 'destructive',
      });
    }
  };

  const handleEditCategory = async (formData: FormData) => {
    if (!selectedCategory) return;

    try {
      // In a real app, you would make an API call here
      const updatedCategory: Category = {
        ...selectedCategory,
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        imageUrl: formData.get('image') 
          ? URL.createObjectURL(formData.get('image') as File)
          : selectedCategory.imageUrl,
        updatedAt: new Date().toISOString(),
      };

      setCategories(categories.map(cat => 
        cat.id === selectedCategory.id ? updatedCategory : cat
      ));
      setIsEditOpen(false);
      setSelectedCategory(null);
      toast({
        title: 'Success',
        description: 'Category updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update category',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    try {
      // In a real app, you would make an API call here
      setCategories(categories.filter(cat => cat.id !== selectedCategory.id));
      setIsDeleteOpen(false);
      setSelectedCategory(null);
      toast({
        title: 'Success',
        description: 'Category deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete category',
        variant: 'destructive',
      });
    }
  };

  const handleAddSubcategory = async (formData: FormData) => {
    if (!selectedCategory) return;

    try {
      // In a real app, you would make an API call here
      const newSubcategory = {
        id: Math.random().toString(),
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        imageUrl: URL.createObjectURL(formData.get('image') as File),
        categoryId: selectedCategory.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updatedCategory = {
        ...selectedCategory,
        subcategories: [...selectedCategory.subcategories, newSubcategory],
      };

      setCategories(categories.map(cat => 
        cat.id === selectedCategory.id ? updatedCategory : cat
      ));
      setIsAddSubcategoryOpen(false);
      toast({
        title: 'Success',
        description: 'Subcategory added successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add subcategory',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">
            Manage your product categories and subcategories
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <CategoryTable
        categories={categories}
        onEdit={(category) => {
          setSelectedCategory(category);
          setIsEditOpen(true);
        }}
        onDelete={(category) => {
          setSelectedCategory(category);
          setIsDeleteOpen(true);
        }}
        onAddSubcategory={(category) => {
          setSelectedCategory(category);
          setIsAddSubcategoryOpen(true);
        }}
      />

      <AddCategoryDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSubmit={handleAddCategory}
      />

      <EditCategoryDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        category={selectedCategory}
        onSubmit={handleEditCategory}
      />

      <DeleteCategoryDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        category={selectedCategory}
        onConfirm={handleDeleteCategory}
      />

      <AddSubcategoryDialog
        open={isAddSubcategoryOpen}
        onOpenChange={setIsAddSubcategoryOpen}
        category={selectedCategory}
        onSubmit={handleAddSubcategory}
      />
    </div>
  );
}