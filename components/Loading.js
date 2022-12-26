const Loading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div
      className="position-fixed fixed-top h-100 w-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        fontWeight: 700,
        fontSize: 20,
        color: "white",
        zIndex: 9999,
      }}
    >
      <div className="spinner-border text-primary" role="status" />
    </div>
  );
};

export default Loading;
