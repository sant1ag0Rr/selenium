import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setEditData } from "../../../redux/adminSlices/actions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Button } from "@mui/material";
import { Header } from "../components";
import toast, { Toaster } from "react-hot-toast";
import { DataGrid } from "@mui/x-data-grid";

import Box from "@mui/material/Box";
import { showVehicles } from "../../../redux/user/listAllVehicleSlice";
import {
  clearAdminVehicleToast,
} from "../../../redux/adminSlices/adminDashboardSlice/StatusSlice";

function AllVehicles() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddVehicleClicked } = useSelector((state) => state.addVehicle);

  const [allVehicles, setAllVehicles] = useState([]);
  const { adminEditVehicleSuccess, adminAddVehicleSuccess, adminCrudError } =
    useSelector((state) => state.statusSlice);

  //show vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("/api/admin/showVehicles", {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          setAllVehicles(data);
          dispatch(showVehicles(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchVehicles();
  }, [isAddVehicleClicked]);

  //delete a vehicle
  const handleDelete = async (vehicle_id) => {
    try {
      setAllVehicles(allVehicles.filter((cur) => cur._id !== vehicle_id));
      const res = await fetch(`/api/admin/deleteVehicle/${vehicle_id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("eliminado", {
          duration: 800,

          style: {
            color: "white",
            background: "#c48080",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //edit vehicles
  const handleEditVehicle = (vehicle_id) => {
    dispatch(setEditData({ _id: vehicle_id }));
    navigate(`/adminDashboard/editProducts?vehicle_id=${vehicle_id}`);
  };

  const columns = [
    {
      field: "image",
      headerName: "Imagen",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          style={{
            width: "50px",
            height: "40px",
            borderRadius: "5px",
            objectFit: "cover",
          }}
          alt="vehicle"
        />
      ),
    },
    {
      field: "registeration_number",
      headerName: "Número de Registro",
      width: 150,
    },
    { field: "company", headerName: "Compañía", width: 150 },
    { field: "name", headerName: "Nombre", width: 150 },
    {
      field: "edit",
      headerName: "Editar",
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handleEditVehicle(params.row.id)}>
          <ModeEditOutlineIcon />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Eliminar",
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.row.id)}>
          <DeleteForeverIcon />
        </Button>
      ),
    },
  ];

  const rows = allVehicles
    .filter(
      (vehicle) => vehicle.isDeleted === "false" && vehicle.isAdminApproved
    )
    .map((vehicle) => ({
      id: vehicle._id,
      image: vehicle.image[0],
      registeration_number: vehicle.registeration_number,
      company: vehicle.company,
      name: vehicle.name,
    }));

  //edit success
  useEffect(() => {
    if (adminEditVehicleSuccess) {
      toast.success("éxito");
    }
    else if (adminAddVehicleSuccess) {
      toast.success("éxito");
    }
    else if(adminCrudError){
     toast.error("error")
    }
  }, [adminEditVehicleSuccess, adminAddVehicleSuccess,adminCrudError,dispatch]);

  useEffect(() => {
    const clearNotificationsTimeout = setTimeout(() => {
      dispatch(clearAdminVehicleToast());
    }, 3000);
  
    return () => clearTimeout(clearNotificationsTimeout);
  }, [adminEditVehicleSuccess, adminAddVehicleSuccess, adminCrudError, dispatch]);

  return (
    <>

      {adminEditVehicleSuccess ? <Toaster /> : ''} 
        {adminAddVehicleSuccess ? <Toaster /> : ''}
        {adminCrudError ? <Toaster/> : ""}     
        
        
      <div className="max-w-[1000px]  d-flex   justify-end text-start items-end p-10">
        <Header title="Todos los Vehículos" />
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 8,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              ".MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "&.MuiDataGrid-root": {
                border: "none",
              },
            }}
          />
        </Box>
      </div>
    </>
  );
}

export default AllVehicles;
