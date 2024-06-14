import React from 'react'

export default function Alert({ error, showAlert, closeAlert, }) {

  return (
    <>
      <div className={`alert alert-danger mt-4 d-flex align-items-center justify-content-between ${showAlert}`} role="alert">
        <div className="text-content">
          Error {error}
        </div>
        <buttun className="close-btn btn btn-outline-danger " onClick={closeAlert}>Close</buttun>
      </div>
    </>
  )
}
