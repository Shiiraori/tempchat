import React, { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth } from '../../firebase/firebase';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  getDoc,
  doc,
  orderBy,
  query
} from "firebase/firestore";

// component edit
import ClotheEdit from './ClotheEdit';

const ClotheList = () => {
  const [clothe, setClothe] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // read
        const unsubscribe = onSnapshot(
          query(
            collection(db, `/clothe`),
            orderBy("date", "desc")),
          (snapshot) => {
            setClothe(snapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            }));
          }
        );

        return () => unsubscribe();
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  // delete a clothe using the firebase.delete function
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, `/clothe`, id));
      toast.success("Clothe deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <table className="table table-striped table-bordered table-dark">
          <thead className="">
            <tr className="text-center">
              <th>Clothe</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {clothe.map((clothe) => (
              <tr key={clothe.id}>
                <td>{clothe.ClotheName}</td>
                <td className="text-wrap">{clothe.ClotheDescription}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    <ClotheEdit clothe={clothe} />
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(clothe.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClotheList;
