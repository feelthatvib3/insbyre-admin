import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CreateCategoryPage } from 'pages/create-category';
import { CreateProductPage } from 'pages/create-product';
import { DashboardPage } from 'pages/dashboard';
import { EditCategoryPage } from 'pages/edit-category';
import { EditProductPage } from 'pages/edit-product';
import { LoginPage } from 'pages/login';

export function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/new/category" element={<CreateCategoryPage />} />
        <Route path="/new/product" element={<CreateProductPage />} />
        <Route path="/categories/:categoryId/edit" element={<EditCategoryPage />} />
        <Route path="/products/:productId/edit" element={<EditProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}
