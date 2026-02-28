export default function ErrorMessage({ message }) {
  return (
    <div className="alert alert-danger text-center my-4">
      {message || "Something went wrong"}
    </div>
  );
}
