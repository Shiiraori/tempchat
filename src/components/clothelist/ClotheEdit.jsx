import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { db, auth } from '../../firebase/firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  getDoc,
  doc,
} from 'firebase/firestore';

const ClotheEdit = ({ clothe }) => {
  // console.log(clothe.id);
  // console.log(clothe.ClotheName);
  const [clotheName, setClotheName] = useState(clothe.ClotheName);
  const [clotheDescription, setClotheDescription] = useState(
    clothe.ClotheDescription
  );

  //edit function here
  const handleUpdate = async () => {
    try {
      const clotheRef = doc(
        db,
        `/clothe`,
        clothe.id
      );

      await updateDoc(clotheRef, {
        ClotheName: clotheName,
        ClotheDescription: clotheDescription,
      });

      toast.success('Updated Clothe');
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    const modal = document.getElementById(`id${clothe.id}`);
    const backdrop = document.getElementsByClassName('modal-backdrop')[0];

    modal.classList.remove('show');
    modal.style.display = 'none';
    backdrop.parentNode.removeChild(backdrop);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-info"
        data-toggle="modal"
        data-target={`#id${clothe.id}`}
      >
        Edit
      </button>

      <div className="modal" id={`id${clothe.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title text-dark">Edit Clothe</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="mn" className="form-label text-dark text-left">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mn"
                  placeholder="Name"
                  required
                  value={clotheName}
                  onChange={(e) => setClotheName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="md" className="form-label text-dark">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="md"
                  placeholder="Description"
                  required
                  value={clotheDescription}
                  onChange={(e) => setClotheDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update Clothe
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                aria-label="Close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClotheEdit;