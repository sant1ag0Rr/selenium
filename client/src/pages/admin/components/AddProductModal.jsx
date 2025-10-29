import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { addVehicleClicked } from "../../../redux/adminSlices/actions";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import {
  setModelData,
  setCompanyData,
  setLocationData,
  setDistrictData,
} from "../../../redux/adminSlices/adminDashboardSlice/CarModelDataSlice";
import { MenuItem } from "@mui/material";
import { setWholeData } from "../../../redux/user/selectRideSlice";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IoMdClose } from "react-icons/io";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {  setLoading, setadminAddVehicleSuccess, setadminCrudError } from "../../../redux/adminSlices/adminDashboardSlice/StatusSlice";

// TextField component moved outside of parent component
const CustomTextField = (props) => <TextField {...props} />;

export const fetchModelData = async (dispatch) => {
  try {
    const res = await fetch("/api/admin/getVehicleModels", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();

      //getting models from data
      const models = data
        .filter((cur) => cur.type === "car")
        .map((cur) => cur.model);
      dispatch(setModelData(models));

      //getting comapnys from data
      const brand = data
        .filter((cur) => cur.type === "car")
        .map((cur) => cur.brand);
      const uniqueBrand = brand.filter((cur, index) => {
        return brand.indexOf(cur) === index;
      });
      dispatch(setCompanyData(uniqueBrand));

      //getting locations from data
      const locations = data
        .filter((cur) => cur.type === "location")
        .map((cur) => cur.location);
      dispatch(setLocationData(locations));

      //getting districts from data
      const districts = data
        .filter((cur) => cur.type === "location")
        .map((cur) => cur.district);
      const uniqueDistricts = districts.filter((cur, idx) => {
        return districts.indexOf(cur) === idx;
      });
      dispatch(setDistrictData(uniqueDistricts));

      //setting whole data
      const wholeData = data.filter((cur) => cur.type === "location");
      dispatch(setWholeData(wholeData));
    } else {
      return "no data found";
    }
  } catch (error) {
    console.log(error);
  }
};

const AddProductModal = () => {
  const { register, handleSubmit, control , reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAddVehicleClicked } = useSelector((state) => state.addVehicle);
  const { modelData, companyData, locationData, districtData } = useSelector(
    (state) => state.modelDataSlice
  );
  const {loading} = useSelector(state => state.statusSlice)

  useEffect(() => {
    fetchModelData(dispatch);
    dispatch(addVehicleClicked(true))
  }, []);

  const onSubmit = async (addData) => {
   
    try {
      const img = [];
      for (const file of addData.image) {
        img.push(file);
      }
      const formData = new FormData();
      formData.append("registeration_number", addData.registeration_number);
      formData.append("company", addData.company);
      for (const file of img) {
        formData.append(`image`, file); // Append each file with a unique key
      }
      formData.append("name", addData.name);
      formData.append("model", addData.model);
      formData.append("title", addData.title);
      formData.append("base_package", addData.base_package);
      formData.append("price", addData.price);
      formData.append("description", addData.description);
      formData.append("year_made", addData.year_made);
      formData.append("fuel_type", addData.fuelType);
      formData.append("seat", addData.Seats);
      formData.append("transmition_type", addData.transmitionType);
      formData.append("insurance_end_date", addData.insurance_end_date.$d);
      formData.append("registeration_end_date", addData.Registeration_end_date.$d);
      formData.append("polution_end_date", addData.polution_end_date.$d);
      formData.append("car_type", addData.carType);
      formData.append("location", addData.vehicleLocation);
      formData.append("district", addData.vehicleDistrict
      );
   

      let tostID;
      if (formData) {
        tostID = toast.loading("saving...", { position: "bottom-center" });
        dispatch(setLoading(true))
      }
      const res = await fetch("/api/admin/addProduct", {
        method: "POST",
        body:formData
      });

      if (!res.ok) {
        toast.error("error");
        toast.dismiss(tostID);
        dispatch(setLoading(false))
      }
      if (res.ok) {
        dispatch(setadminAddVehicleSuccess(true));
        toast.dismiss(tostID)
        dispatch(setLoading(false))
      }

      reset();
    } catch (error) {
      dispatch(setadminCrudError(true))
      console.log(error);
    }
    dispatch(addVehicleClicked(false));
    navigate("/adminDashboard/allProduct");
  };

  const handleClose = () => {
    navigate("/adminDashboard/allProduct");
  };

  return (
    <>
    {loading  ? <Toaster/> : null }
      {isAddVehicleClicked && (
        <div>
          <button onClick={handleClose} className="relative left-10 top-5">
            <div className="padding-5 padding-2 rounded-full bg-slate-100 drop-shadow-md hover:shadow-lg hover:bg-blue-200 hover:translate-y-1 hover:translate-x-1 ">
              <IoMdClose style={{ fontSize: "30" }} />
            </div>
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white -z-10 max-w-[1000px] mx-auto">
              <Box
                sx={{
                  "& .MuiTextField-root": {
                    m: 4,
                    width: "25ch",
                    color: "black", // Set text color to black
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black", // Set outline color to black
                    },
                    "@media (max-width: 640px)": {
                      width: "30ch",
                    },
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    required
                    id="registeration_number"
                    label="registeration_number"
                    {...register("registeration_number")}
                  />

                  <Controller
                    control={control}
                    name="company"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        id="company"
                        select
                        label="Compañía"
                        error={Boolean(field.value == "")}
                      >
                        {companyData.map((cur, idx) => (
                          <MenuItem value={cur} key={`company-${cur}-${idx}`}>
                            {cur}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  ></Controller>

                  <TextField
                    required
                    id="name"
                    label="Nombre"
                    {...register("name")}
                  />

                  <Controller
                    control={control}
                    name="model"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        id="model"
                        select
                        label="Modelo"
                        error={Boolean(field.value == "")}
                      >
                        {modelData.map((cur, idx) => (
                          <MenuItem value={cur} key={`model-${cur}-${idx}`}>
                            {cur}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  ></Controller>

                  <TextField id="title" label="Título" {...register("title")} />
                  <TextField
                    id="base_package"
                    label="Paquete Base"
                    {...register("base_package")}
                  />
                  <TextField
                    id="price"
                    type="number"
                    label="Precio"
                    {...register("price")}
                  />

                  <TextField
                    required
                    id="year_made"
                    type="number"
                    label="Año de Fabricación"
                    {...register("year_made")}
                  />
                  <Controller
                    control={control}
                    name="fuelType"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        id="fuel_type"
                        select
                        label="Tipo de Combustible"
                        error={Boolean(field.value == "")}
                      >
                        <MenuItem value={"petrol"}>Gasolina</MenuItem>
                        <MenuItem value={"diesel"}>Diesel</MenuItem>
                        <MenuItem value={"electirc"}>Eléctrico</MenuItem>
                        <MenuItem value={"hybrid"}>Híbrido</MenuItem>
                      </TextField>
                    )}
                  ></Controller>
                </div>

                <div>
                  <Controller
                    name="carType"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        id="car_type"
                        select
                        label="Tipo de Auto"
                        error={Boolean(field.value === "")} // Add error handling for empty value
                      >
                        <MenuItem value="sedan">Sedán</MenuItem>
                        <MenuItem value="suv">SUV</MenuItem>
                        <MenuItem value="hatchback">Hatchback</MenuItem>
                      </TextField>
                    )}
                  />

                  <Controller
                    control={control}
                    name="Seats"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        id="seats"
                        select
                        label="Seats"
                        error={Boolean(field.value === "")}
                      >
                        <MenuItem value={"5"}>5</MenuItem>
                        <MenuItem value={"7"}>7</MenuItem>
                        <MenuItem value={"8"}>8</MenuItem>
                      </TextField>
                    )}
                  ></Controller>

                  <Controller
                    control={control}
                    name="transmitionType"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        id="transmittion_type"
                        select
                        label="transmittion_type"
                        error={Boolean(field.value == "")}
                      >
                        <MenuItem value={"automatic"}>automatic</MenuItem>
                        <MenuItem value={"manual"}>manual</MenuItem>
                      </TextField>
                    )}
                  ></Controller>

                  <Controller
                    control={control}
                    name="vehicleLocation"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        id="vehicleLocation"
                        select
                        label="vehicleLocation"
                        error={Boolean(field.value == "")}
                      >
                        {locationData.map((cur, idx) => (
                          <MenuItem value={cur} key={`location-${cur}-${idx}`}>
                            {cur}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  ></Controller>

                  <Controller
                    control={control}
                    name="vehicleDistrict"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        id="vehicleDistrict"
                        select
                        label="vehicleDistrict"
                        error={Boolean(field.value == "")}
                      >
                        {districtData.map((cur, idx) => (
                          <MenuItem value={cur} key={`district-${cur}-${idx}`}>
                            {cur}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  ></Controller>

                  <TextField
                    id="description"
                    label="description"
                    multiline
                    rows={4}
                    sx={{
                      width: "100%",
                      "@media (min-width: 1280px)": {
                        // for large screens (lg)
                        minWidth: 565,
                      },
                    }}
                    {...register("description")}
                  />
                </div>
                <div>
                  <Controller
                    name="insurance_end_date"
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          {...field}
                          label="Fecha de Vencimiento del Seguro"
                          inputFormat="MM/dd/yyyy" // Customize the date format as per your requirement
                          value={field.value || null} // Ensure value is null if empty string or undefined
                          onChange={(date) => field.onChange(date)}
                          textField={CustomTextField}
                        />
                      </LocalizationProvider>
                    )}
                  />

                  <Controller
                    control={control}
                    name="Registeration_end_date"
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          {...field}
                          label="Fecha de Vencimiento del Registro"
                          inputFormat="MM/dd/yyyy" // Customize the date format as per your requirement
                          value={field.value || null} // Ensure value is null if empty string or undefined
                          onChange={(date) => field.onChange(date)}
                          textField={CustomTextField}
                        />
                      </LocalizationProvider>
                    )}
                  ></Controller>

                  <Controller
                    control={control}
                    name="polution_end_date"
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          {...field}
                          label="Fecha de Vencimiento de la Contaminación"
                          inputFormat="MM/dd/yyyy" // Customize the date format as per your requirement
                          value={field.value || null} // Ensure value is null if empty string or undefined
                          onChange={(date) => field.onChange(date)}
                          textField={CustomTextField}
                        />
                      </LocalizationProvider>
                    )}
                  ></Controller>

                  {/* editing for image is not done yet , default value for image is also not done yet */}

                  {/* file upload section */}
                  <div className="flex flex-col items-start justify-center lg:flex-row gap-10 lg:justify-between lg:items-start   ml-7 mt-10">
                    <div className="max-w-[300px] sm:max-w-[600px]">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 "
                        htmlFor="insurance_image"
                      >
                        Subir imagen del seguro
                      </label>
                      <input
                        className="block w-full p-2 text-sm text-gray-50 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-black focus:outline-none dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="user_avatar_help"
                        id="insurance_image"
                        type="file"
                        multiple
                        {...register("insurance_image")}
                      />
                    </div>

                    <div className="max-w-[300px] sm:max-w-[600px]">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 "
                        htmlFor="rc_book_image"
                      >
                        Subir imagen del libro RC
                      </label>
                      <input
                        className="block w-full p-2  text-sm text-gray-50 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-black focus:outline-none dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="user_avatar_help"
                        id="rc_book_image"
                        type="file"
                        multiple
                        {...register("rc_book_image")}
                      />
                    </div>
                    <div className="max-w-[300px] sm:max-w-[600px]">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 "
                        htmlFor="polution_image"
                      >
                        Subir imagen de contaminación
                      </label>
                      <input
                        className="block w-full p-2 text-sm text-gray-50 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-black focus:outline-none dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-900"
                        aria-describedby="user_avatar_help"
                        id="polution_image"
                        type="file"
                        multiple
                        {...register("polution_image")}
                      />
                    </div>

                    <div className="max-w-[300px] sm:max-w-[600px]">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 "
                        htmlFor="image"
                      >
                        Subir imagen del vehículo
                      </label>
                      <input
                        className="block w-full p-2 text-sm text-gray-50 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-black focus:outline-none dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-900"
                        aria-describedby="user_avatar_help"
                        id="image"
                        type="file"
                        multiple
                        {...register("image")}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex justify-start items-center ml-7 mb-10">
                  <Button variant="contained"  type="submit">
                    Enviar
                  </Button>
                </div>
              </Box>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddProductModal;
