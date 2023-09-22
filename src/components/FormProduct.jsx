import { useEffect, useRef, useState } from 'react';
import { addProduct, updateProduct } from '@services/api/products';
import { useRouter } from 'next/navigation';

export default function FormProduct({ setOpen, setAlert, product }) {
  const formRef = useRef(null);
  const [valorSelect, setValorSelect] = useState('');
  const router = useRouter();

  const options = [
    { id: 1, label: 'Clothes' },
    { id: 2, label: 'Electronics' },
    { id: 3, label: 'Ursula' },
    { id: 4, label: 'Toys' },
    { id: 34, label: 'Animals' },
    { id: 5, label: 'Others' },
  ];

  const optionElements = options.map((option) => (
    <option key={option.id} value={option.id}>
      {option.label}
    </option>
  ));
  useEffect(() => {
    setValorSelect(product?.category?.id ?? '')
  }, [product]);
  // (product?.category?.id);
  // <option value="1">Clothes</option>
  // <option value="2">Electronics</option>
  // <option value="3">Furniture</option>
  // <option value="4">Toys</option>
  // <option value="5">Others</option>
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      title: formData.get('title'),
      price: parseInt(formData.get('price')),
      description: formData.get('description'),
      categoryId: parseInt(formData.get('category')),
      //images: [formData.get('images').name],
      images: ['https://cdn11.bigcommerce.com/s-3stx4pub31/images/stencil/1280x1280/products/452/1210/guaymallen_blanco__99774.1657131398.jpg?c=2'],
    };
    console.log('data por aca')
    console.log(data)
    if (product) {
      updateProduct(product.id, data)
        .then((response) => {
          console.log('console.log(response)')
          console.log(response)
          router.push('/dashboard/products');

          setAlert({
            active: true,
            message: 'Product updated successfully',
            type: 'success',
            autoClose: false,
          });
        })
        .catch((error) => {
          setAlert({
            active: true,
            message: error.message,
            type: 'error',
            autoClose: false,
          });
        });
    } else {
      console.log('else')
      addProduct(data)
        .then(() => {
          setAlert({
            active: true,
            message: 'Product added successfully',
            type: 'success',
            autoClose: false,
          });
          setOpen(false);
        })
        .catch((error) => {
          setAlert({
            active: true,
            message: error.message,
            type: 'error',
            autoClose: false,
          });
          setOpen(false);
        });
    }

  };

  const handleChange = (event) => {
    setValorSelect(event.target.value);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                defaultValue={product?.title}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                defaultValue={product?.price}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              {/* TODO: check default value for this select */}
              <select
                id="category"
                name="category"
                autoComplete="category-name"
                value={valorSelect}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              >
                {optionElements}
              </select>
            </div>

            <div className="col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                autoComplete="description"
                rows="3"
                defaultValue={product?.description}
                className="form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6">
              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                  Cover photo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="images" name="images" type="file" defaultValue={product?.images} className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
