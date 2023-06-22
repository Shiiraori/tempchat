import React, { useState } from 'react';
import { db, auth } from '../../firebase/firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { toast } from 'react-toastify';

const ClotheForm = () => {
  const [clotheName, setClotheName] = useState('');
  const [clotheDescription, setClotheDescription] = useState('');
  const [showModal, setShowModal] = useState(false);

  const AddClothe = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, `/clothe`), {
        ClotheName: clotheName,
        ClotheDescription: clotheDescription,
        date: Date.now(),
      });
      setClotheName('');
      setClotheDescription('');
      setShowModal(false);

      toast.success('Added Clothe')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="row align-items-center">
        <div className="col-3">
          <button
            type="button"
            className="btn btn-primary pl-3"
            onClick={() => setShowModal(true)}
          >
            Add Clothe
          </button>
        </div>
        <div className="col-6 text-center">
          <h4>Clothe List</h4>
        </div>
      </div>
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{
          display: showModal ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title texttexttext">Add Clothe</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={AddClothe}>
                <div className="form-group">
                <label htmlFor="mn" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mn"
                    placeholder="Clothe"
                    required
                    value={clotheName}
                    onChange={(e) => setClotheName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="md" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="md"
                    placeholder="Clothe Description"
                    required
                    value={clotheDescription}
                    onChange={(e) => setClotheDescription(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Add Clothe
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default ClotheForm;
