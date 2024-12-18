// eslint-disable-next-line no-unused-vars
import React,{createContext,useState} from 'react'

export const DonHangContext = createContext()

// eslint-disable-next-line react/prop-types
export default function DonHangProvider({ children }) {
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [workDays, setWorkDays] = useState(Array(7).fill(false));
  const [repeatWeekly, setRepeatWeekly] = useState(false);
  const [repeatCount, setRepeatCount] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [nhanViens, setNhanViens] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeSelectionSuccess, setEmployeeSelectionSuccess] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [petPreference, setPetPreference] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [dichVus, setDichVus] = useState([]);
  const [searchResult, setSearchResult] = useState('');
  const [serviceOptions, setServiceOptions] = useState({
    laundry: false,
    cooking: false,
    equipmentDelivery: false,
    vacuumCleaning: false,
  });
  return (
    <DonHangContext.Provider
  value={{
    searchValue,
    setSearchValue,
    selectedDuration,
    setSelectedDuration,
    workDays,
    setWorkDays,
    repeatWeekly,
    setRepeatWeekly,
    repeatCount,
    setRepeatCount,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    openDialog,
    setOpenDialog,
    showSnackbar,
    setShowSnackbar,
    totalPrice,
    setTotalPrice,
    nhanViens,
    setNhanViens,
    selectedEmployee,
    setSelectedEmployee,
    employeeSelectionSuccess,
    setEmployeeSelectionSuccess,
    selectedPlace,
    setSelectedPlace,
    serviceOptions,
    setServiceOptions,
    petPreference,
    setPetPreference,
    selectedAdditionalServices,
  setSelectedAdditionalServices,
  searchResult, 
  setSearchResult,
  dichVus, 
  setDichVus
  }}
>
  {children}
</DonHangContext.Provider>
  )
}