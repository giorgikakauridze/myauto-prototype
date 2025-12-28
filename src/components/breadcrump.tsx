const BreadCrumps = () => {
  return (
    <div className="flex text-secondary text-sm items-center gap-2">
      <div>მთავარი</div>
      <span className="font-light">{">"}</span>
      <div>ძიება</div>
      <span className="font-light">{">"}</span>
      <div className="text-primary">იყიდება</div>
    </div>
  );
};

export default BreadCrumps;
