import React, { useEffect, useState } from "react";
import { PageHeader } from "../../components/admin/PageHeader";
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import db, { storage } from "../../firebase/config";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Notify } from "notiflix";
import { useSelector } from "react-redux";

const productInitialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  description: "",
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.product.products);
  const exsistProduct = products.find((item) => item.id === id);

  const detectForm = (id, form1, form2) => {
    if (id === "new") {
      return form1;
    }
    return form2;
  };

  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...productInitialState }, exsistProduct);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();

  const productConfig = {
    name: product.name,
    imageURL: product.imageURL,
    price: Number(product.price),
    category: product.category,
    brand: product.brand,
    description: product.description,
    createdAt: serverTimestamp(),
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const handleInputChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    // Create a storage reference from our storage service
    const storageRef = ref(storage, `products/${Date.now()}${file.name}`);

    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setUploadProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused!");
            break;
          case "running":
            console.log("Upload is running!");
            break;
          case "error":
            console.log("Error");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          //console.log("File available at", downloadURL);
        });
      }
    );
  };

  const addProduct = (event) => {
    event.preventDefault();

    try {
      addDoc(collection(db, "products"), productConfig);

      setProduct(productInitialState);

      Notify.success("Product Added!");

      navigate("/admin/products");
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  const updateProduct = (event) => {
    event.preventDefault();
    if (product.imageURL !== exsistProduct.imageURL) {
      const storageRef = ref(storage, exsistProduct.imageURL);
      deleteObject(storageRef);
    }
    try {
      setDoc(doc(db, "products", id), {
        ...productConfig,
        editedAt: Timestamp.now().toDate(),
      });
      Notify.success("Product Updated Successfully!");
      navigate("/admin/products");
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  return (
    <>
      <PageHeader
        title={detectForm(id, "Add Product", "Edit Product")}
        btnTitle="Back to Products"
        link="/admin/products"
      />

      <form onSubmit={detectForm(id, addProduct, updateProduct)}>
        <div className="w-4/5 mt-5 shadow sm:overflow-hidden sm:rounded-md shadow-purple-500/50 mx-auto">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div>
              <label
                htmlFor="product-name"
                className="block text-sm font-medium text-gray-700"
              >
                Product name
              </label>
              <input
                type="text"
                name="name"
                id="product-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                value={product.name}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              {uploadProgress === 0 ? null : (
                <div className="w-11/12 lg:w-2/6 mx-auto mb-2">
                  <div className="flex justify-between items-center pb-2 flex-col">
                    <p className="text-xs text-indigo-700 dark:text-indigo-400 font-bold">
                      {uploadProgress < 100
                        ? `Uploading ${uploadProgress}`
                        : `${uploadProgress} % Complete`}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div
                      className="w-full bg-indigo-700 h-1 rounded-tl rounded-bl mr-1"
                      style={{ width: `${uploadProgress}` }}
                    />
                  </div>
                </div>
              )}
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  className="file:mr-4 file:py-2 file:px-4
									file:rounded-full file:border-0
									file:text-sm file:font-mono file:cursor-pointer
									file:bg-violet-50 file:text-violet-700
									hover:file:bg-violet-100"
                  onChange={(e) => handleImageChange(e)}
                />
                <input type="hidden" name="imageURL" value={product.imageURL} />
              </div>
              {product.imageURL === "" ? null : (
                <div className="mt-1 flex items-center">
                  <a
                    className="text-blue-700 underline hover:text-blue-500"
                    href={product.imageURL}
                  >
                    {product.imageURL}
                  </a>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="product-price"
                className="block text-sm font-medium text-gray-700"
              >
                Product Price
              </label>
              <input
                min={0}
                type="number"
                name="price"
                id="product-price"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                value={product.price}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div>
              <label
                htmlFor="product-category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="product-category"
                name="category"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                value={product.category}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="" disabled>
                  Choose Product Category
                </option>
                {categories.map((category, index) => (
                  <option
                    key={index}
                    value={category.replace("-", " ").toUpperCase()}
                  >
                    {category.replace("-", " ").toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700"
              >
                Brand
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                value={product.brand}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Product Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  placeholder="Type Description..."
                  value={product.description}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Brief description of your product. URLs are hyperlinked.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 px-4 py-3 text-right sm:px-6">
            <button
              disabled={detectForm(id, uploadProgress < 100, false)}
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-75 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {detectForm(id, "Save", "Update")}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
