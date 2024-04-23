import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function Test() {
  const loader = useLoaderData();

  // Kiểm tra xem loader có dữ liệu không
  if (!loader || !loader.data || !loader.data.categories) {
    return <div>Loading...</div>;
  }

  const { categories } = loader.data;

  return (
    <div>
      <h1>Danh sách các loại dịch vụ</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name} - Type: {category.type || 'Unknown'}
          </li>
        ))}
      </ul>
    </div>
  );
}
