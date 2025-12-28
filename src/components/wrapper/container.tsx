const ContainerWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto px-4 lg:px-20 py-4 max-w-7xl container">
      {children}
    </div>
  );
};

export default ContainerWrapper;
