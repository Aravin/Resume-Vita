export default function DeleteModal(prop: any) {
  return <>
      <div id="delete-modal" className="modal modal-open">
        <div className="modal-box">
          <p className="text-2xl">Delete Item </p>
          <p>Are you sure want to delete?</p>
          <div className="modal-action">
            <button className="btn btn-error" onClick={() => prop.delete(prop.index)}>Yes, Delete</button>
            <button className="btn" onClick={prop.close}>Close</button>
          </div>
        </div>
      </div>
  </>
}