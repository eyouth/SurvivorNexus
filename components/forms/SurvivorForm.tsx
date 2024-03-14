import { useState, SetStateAction, useEffect } from "react";
import { format } from "date-fns";
import { isNullOrEmpty } from "@/helpers";

// Intital value.
const gender = ['male', 'female'];
const survivorStatus = ['false', 'true'];
const inventoryItems = [
  'Water',
  'Food',
  'Medication',
  'C-Virus Vaccine',
]

// Type form props
type SurvivorFormProps = {
  showModal: boolean;
  survivorsList: Survivor[];
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  setSurvivorsList: React.Dispatch<SetStateAction<Survivor[]>>;
}

type InputKeyField = keyof Survivor;

const SurvivorForm = (props: SurvivorFormProps) => {
  const {showModal, setShowModal, survivorsList, setSurvivorsList} = props;
  const [inventoryQuantity, setInventoryQuantity] = useState<number>(0);
  const [inventoryLists, setInventoryLists] = useState<InventoryItem[] | []>([])
  const [selectedItem, setSelectItemChange] = useState<string>();
  const [survivor, setSurvivor] = useState<Survivor>({
    name: '',
    age: 20,
    gender: '',
    last_location: {
      latitude: '',
      longitude: '',
    },
    inventory: [],
    infected: false,
    date_added: new Date
  });

  useEffect(() => {
    setSurvivor({
      ...survivor,
      ['inventory']: inventoryLists
    })
  },[inventoryLists])

  // Close the modal on cancel / X.
  const onClose = (e: React.MouseEvent<HTMLElement>) => {
    setShowModal(!showModal)
  }

  // On submit form
  const onAddSurvivor = () => {
    // Check for empty - unset input field
    for (const key in survivor) {
      if (Object.prototype.hasOwnProperty.call(survivor, key)) {
        const typedKey = key as InputKeyField;
        if(isNullOrEmpty(survivor[typedKey]) &&  typedKey !== 'date_added' ) {
          alert(`${typedKey.toUpperCase()} is empty`);
          return
        }
      }
    }
    // Check if name already exists, could be expand more for real application.
    const filterSurvivor = survivorsList.find(list => list.name === survivor.name)
    if(!isNullOrEmpty(filterSurvivor)) {
      alert(`${filterSurvivor?.name} already added...`)
      return;
    }

    // In a real application, add to storage like database, if response is success then add to the array lists.
    // Add to current survivor array lists.
    setSurvivorsList(prevState => [...prevState, survivor]);

  }

  // Capture input 
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    
    if(name === "latitude") {
      setSurvivor(prevSurvivor => ({
        ...prevSurvivor,
        ['last_location']: {
          ...prevSurvivor.last_location,
          latitude: value
        }
      }));
      return;
    }

    if(name === "longitude") {
      setSurvivor(prevSurvivor => ({
        ...prevSurvivor,
        ['last_location']: {
          ...prevSurvivor.last_location,
          longitude: value
        }
      }));
      return;
    }

    setSurvivor({
      ...survivor,
      [name]: value
    });

  }

  // Capture Select input 
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setSurvivor({
      ...survivor,
      [name]: value
    });
  }

  // Add inventory item to array
  const onClickAddItem = () => {
    if(inventoryLists?.length > 0 ) {
      setInventoryLists(prevItems => [...prevItems, {
        itemid: selectedItem,
        quantity: inventoryQuantity
      }]);
    } else {
      setInventoryLists([{
        itemid: selectedItem,
        quantity: inventoryQuantity
      }])
    }
  }

  return(
    <section className={`${showModal ? 'block' : 'hidden'} modal absolute h-screen w-full bg-gray-500 bg-opacity-[10%] left-0 top-0 flex items-center justify-center`}>
      <form className="w-full max-w-lg w-[400px] min-h-[333px] border bg-white p-6 rounded-xl">
        <div className="flex justify-between py-4 mb-2">
          <label className="text-[18px] leading-[24px]">Add Survivor</label>
          <button 
              type="button"
              onClick={(e) => onClose(e)}
            >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 1L1 15M15 15L1 1" stroke="#5F5F61" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-gray-700 text-xs font-normal mb-2" htmlFor="survivor-full-name">
              Full Name of Survivor
            </label>
            <input 
              type="text"
              defaultValue={survivor?.name}
              onChange={(e) => onInputChange(e)}
              name="name"
              className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="survivor-full-name" placeholder="Full Name" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-gray-700 text-xs font-normal mb-2" htmlFor="survivor-age">
              Age
            </label>
            <input 
              type="number"
              defaultValue={survivor?.age}
              onChange={(e) => onInputChange(e)}
              name="age"
              className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="survivor-age" placeholder="Age" />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-gray-700 text-xs font-normal mb-2" htmlFor="survivor-gender">
              Gender
            </label>
            <select               
              onChange={(e) => onSelectChange(e)}
              defaultValue={survivor?.gender}
              name="gender"
              className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="survivor-gender">
              <option>Gender</option>
              {gender.map(option => {
                return(
                  <option key={option} value={option}>{option}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-gray-700 text-xs font-normal mb-2" htmlFor="survivor-latitude">
              Latitude
            </label>
            <input 
              type="text"
              onChange={(e) => onInputChange(e)}
              defaultValue={survivor?.last_location.latitude}
              name="latitude"
              className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="survivor-latitude" placeholder="Latitude" />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-gray-700 text-xs font-normal mb-2" htmlFor="survivor-longitude">
              Longitude
            </label>
            <input 
              type="text"
              onChange={(e) => onInputChange(e)}
              defaultValue={survivor?.last_location.longitude}
              name="longitude"
              className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="survivor-longitude"  placeholder="Longitude" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-gray-700 text-xs font-normal mb-2" htmlFor="survivor-gender">
              Inventory
            </label>
            <select
              onChange={(e) => setSelectItemChange(e.target.value)}
              name="inventory_item"
              className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="survivor-gender">
              <option>Items</option>
              {inventoryItems.map(option => {
                return(
                  <option key={option} value={option}>{option}</option>
                )
              })}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-gray-700 text-xs font-normal mb-2" htmlFor="survivor-quantity">
              Quantity
            </label>
            <div className="flex gap-2">
              <input 
                type="number"
                onChange={(e) => setInventoryQuantity(parseInt(e.target.value))}
                defaultValue={inventoryQuantity}
                name="inventory_quantity"
                className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="survivor-quantity" placeholder="Quantity" />
              <button 
                type="button"
                className="flex gap-3 border border-gray-200 py-[10px] px-[12px] rounded-lg bg-gray-200"
                onClick={(e) => onClickAddItem()}>
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.0004 20.0999C15.3023 20.0999 19.6004 15.8018 19.6004 10.4999C19.6004 5.19797 15.3023 0.899902 10.0004 0.899902C4.69846 0.899902 0.400391 5.19797 0.400391 10.4999C0.400391 15.8018 4.69846 20.0999 10.0004 20.0999ZM10 4.5C10.6627 4.5 11.2 5.03726 11.2 5.7V8.7C11.2 9.03137 11.4686 9.3 11.8 9.3H14.8C15.4627 9.3 16 9.83726 16 10.5C16 11.1627 15.4627 11.7 14.8 11.7H11.8C11.4686 11.7 11.2 11.9686 11.2 12.3V15.3C11.2 15.9627 10.6627 16.5 10 16.5C9.33726 16.5 8.8 15.9627 8.8 15.3V12.3C8.8 11.9686 8.53137 11.7 8.2 11.7H5.2C4.53726 11.7 4 11.1627 4 10.5C4 9.83726 4.53726 9.3 5.2 9.3H8.2C8.53137 9.3 8.8 9.03137 8.8 8.7V5.7C8.8 5.03726 9.33726 4.5 10 4.5Z" fill="#312244"/>
                </svg>
                </button>
            </div>
          </div>
          <ul className="list-disc px-8 mt-4 w-full">
            {inventoryLists.map(item => {
              return(
                <li key={JSON.stringify(item)} className="py-2 border-b w-full flex justify-between">
                  <div className="flex gap-10 w-full">{item.quantity} - {item.itemid}</div> 
                  <button type='button' onClick={(e) => {
                    const itemToFind = JSON.stringify(item);
                    const filterInventoryLists = inventoryLists.filter(item => JSON.stringify(item) !== itemToFind)
                    setInventoryLists(filterInventoryLists)
                  }}>x</button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-gray-700 text-xs font-normal mb-2" htmlFor="survivor-gender">
              Infected
            </label>
            <select 
              onChange={(e) => onSelectChange(e)}
              name="infected"
              className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="survivor-gender">
              <option>Status</option>
              {survivorStatus.map(option => {
                return(
                  <option key={option} value={option}>{option}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="flex justify-evenly -mx-3 mb-6 gap-6 p-3">
          <button type="button" className="w-1/2 border px-4 py-2 rounded-lg" onClick={(e) => onClose(e)}>Cancel</button>
          <button type="button" className="w-1/2 border px-4 py-2 bg-[#3E1F47] text-white rounded-lg" onClick={(e) => onAddSurvivor()}>Add Survivor</button>
        </div>
      </form>
    </section>
  )
}

export default SurvivorForm;