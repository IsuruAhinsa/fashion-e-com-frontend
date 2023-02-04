import { useEffect, useState } from "react";
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import db from "../firebase/config";
import { Loading } from "notiflix/build/notiflix-loading-aio";

const useFetchCollection = (collectionName) => {
	const [data, setData] = useState([]);

	const getCollection = () => {
        Loading.standard();
        
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, orderBy("createdAt", "desc"));
        try {
            onSnapshot(q, (querySnapshot) => {
                // console.log(querySnapshot.docs);
                const allData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
    
                setData(allData);
                Loading.remove();
            })
        } catch (error) {
            Loading.remove();
            console.error(error.message);
        }
    };

	useEffect(() => {
		getCollection();
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { data };
};

export default useFetchCollection;