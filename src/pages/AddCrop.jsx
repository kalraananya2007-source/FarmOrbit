import './AddCrop.css';
function AddCrop() {
  return (
    <div className="add-crop">
      <h1>Add Crop</h1>

      <form>
        <label>Crop Name</label>
        <input type="text" />

        <label>Crop Type</label>
        <input type="text" />

        <label>Field Location</label>
        <input type="text" />

        <label>Planting Date</label>
        <input type="date" />

        <button type="submit">Add Crop</button>
      </form>
    </div>
  );
}

export default AddCrop;