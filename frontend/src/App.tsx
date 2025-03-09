import { useState, useEffect } from "react";
import { Button, Radio, TextField, FormHelperText, FormControlLabel, FormControl, FormLabel, RadioGroup } from "@mui/material";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import axios from "axios";


export default function VehicleRentalForm() {

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wheels: 0,
    typeId: "",
    vehicleId: "",
    dates: { startDate: new Date(), endDate: new Date() }
  });

  const [errors, setErrors] = useState({});
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/vehicles/types")
      .then((res) => setVehicleTypes(res.data));
  }, []);

  useEffect(() => {
    if (formData.typeId) {
      axios.get(`http://localhost:5000/vehicles/${formData.typeId}`)
        .then((res) => setVehicles(res.data));
    }
  }, [formData.typeId]);

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    } else if (step === 2) {
      if (!formData.wheels) newErrors.wheels = "Please select the number of wheels";
    } else if (step === 3) {
      if (!formData.typeId) newErrors.typeId = "Please select a vehicle type";
    } else if (step === 4) {
      if (!formData.vehicleId) newErrors.vehicleId = "Please select a vehicle";
    } else if (step === 5) {
      if (!formData.dates.startDate || !formData.dates.endDate)
        newErrors.dates = "Please select a valid date range";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (step === 5) {
      axios
        .post("http://localhost:5000/booking", {
          userName: `${formData.firstName} ${formData.lastName}`,
          vehicleId: formData.vehicleId,
          startDate: formData.dates.startDate,
          endDate: formData.dates.endDate
        })
        .then(() => alert("Booking Confirmed!"))
        .catch(() => alert("Vehicle already booked for selected dates"));
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <form className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Octalogic Vehicle Booking Service</h2>
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <TextField
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              error={!!errors.firstName}
              helperText={errors.firstName}
              fullWidth
            />
            <TextField
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              error={!!errors.lastName}
              helperText={errors.lastName}
              fullWidth
            />
          </div>
        )}

        {step === 2 && (
          <FormControl fullWidth>
            <FormLabel>Choose Wheels</FormLabel>
            <RadioGroup
              value={formData.wheels}
              onChange={(e) => setFormData({ ...formData, wheels: Number(e.target.value) })}
            >
              <FormControlLabel value={2} control={<Radio />} label="2 Wheels" />
              <FormControlLabel value={4} control={<Radio />} label="4 Wheels" />
            </RadioGroup>
            {errors.wheels && <FormHelperText error>{errors.wheels}</FormHelperText>}
          </FormControl>
        )}

        {step === 3 && (
          <FormControl fullWidth>
            <FormLabel>Select Vehicle Type</FormLabel>
            <RadioGroup
              value={formData.typeId}
              onChange={(e) => setFormData({ ...formData, typeId: e.target.value })}
            >
              {vehicleTypes
                .filter((v) => v.wheels === formData.wheels)
                .map((type) => (
                  <FormControlLabel key={type.id} value={type.id} control={<Radio />} label={type.name} />
                ))}
            </RadioGroup>
            {errors.typeId && <FormHelperText error>{errors.typeId}</FormHelperText>}
          </FormControl>
        )}

        {step === 4 && (
          <FormControl fullWidth>
            <FormLabel>Select Vehicle</FormLabel>
            <RadioGroup
              value={formData.vehicleId}
              onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
            >
              {vehicles
                .filter((v) => v.typeId == formData.typeId)
                .map((vehicle) => (
                  <FormControlLabel key={vehicle.id} value={vehicle.id} control={<Radio />} label={vehicle.name} />
                ))}
            </RadioGroup>
            {errors.vehicleId && <FormHelperText error>{errors.vehicleId}</FormHelperText>}
          </FormControl>
        )}

        {step === 5 && (
          <div className="flex flex-col">
            <FormLabel>Select Date Range</FormLabel>
            <DateRangePicker
              ranges={[
                {
                  startDate: formData.dates.startDate,
                  endDate: formData.dates.endDate,
                  key: "selection",
                },
              ]}
              onChange={(ranges) =>
                setFormData({
                  ...formData,
                  dates: {
                    startDate: ranges.selection.startDate,
                    endDate: ranges.selection.endDate,
                  },
                })
              }
            />
            {errors.dates && <FormHelperText error>{errors.dates}</FormHelperText>}
          </div>
        )}


        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button variant="outlined" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          {step < 5 ? (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="contained" color="success" onClick={handleNext}>
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
