const Spinner = ({ message = "Loading..." }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <div className="spinner-border text-success" role="status" />
      <p className="mt-3 mb-0">{message}</p>
    </div>
  );
};

export default Spinner;
