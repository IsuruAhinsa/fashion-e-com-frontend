import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase/config";

const useFetchDocument = (collectionName, documentId) => {
  const [document, setDocument] = useState(null);

  const getDocument = () => {
    onSnapshot(doc(db, collectionName, documentId), (doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      setDocument(obj);
    });
  };

  useEffect(() => {
    getDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { document };
};

export default useFetchDocument;
