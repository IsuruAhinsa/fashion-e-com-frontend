import React from "react";
import { Link } from "react-router-dom";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { deleteDoc, doc } from "firebase/firestore";
import db, { storage } from "../../firebase/config";
import { deleteObject, ref } from "firebase/storage";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const ProductRow = ({ product }) => {
  
  const confirmDelete = (event, id, imageURL) => {
    event.preventDefault();
    Confirm.show(
      "Delete Product?",
      "Really!, Do you want delete this product? Can't undo",
      "Delete",
      "Cancel",
      () => {
        deleteProduct(id, imageURL);
      },
      () => {
        console.log("Delete Cancel");
      }
    );
  };

  const deleteProduct = (id, imageURL) => {
    const docRef = doc(db, "products", id);
    deleteDoc(docRef).then(
      () => {
        // delete image
        const imageRef = ref(storage, imageURL);
        deleteObject(imageRef);
        Notify.success("Product Deleted Succesfully!");
      },
      (error) => {
        Notify.failure(error.message);
      }
    );
  };

  return (
    <tr>
      <td className="px-6 py-4">
        <img className="w-10" src={product.imageURL} alt={product.name} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {product.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${(product.price).toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.brand}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {product.description}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-6">
        <Link className="text-indigo-600 hover:text-indigo-900" to={`add/${product.id}`}>Edit</Link>

        <div
          onClick={(e) => confirmDelete(e, product.id, product.imageURL)}
          className="text-red-600 hover:text-red-900 inline-block hover:cursor-pointer"
        >
          Delete
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
