import { Outlet } from "react-router-dom";
import { DataProvider } from "../context/DataContext";

const PrivateLayout = () => {
  return (
    <DataProvider>
      <Outlet />
    </DataProvider>
  );
};

export default PrivateLayout;
