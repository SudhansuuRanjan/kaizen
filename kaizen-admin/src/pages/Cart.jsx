import { useState, useEffect } from 'react'
import { db } from '../firebase.config'
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const Cart = () => {

  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: "",
    status: "active",
    participants: "",
    price: "",
    venue: "",
    members: [],
    description: "",
    rulebook: "",
    category: "Dance",
    prize: "",
  });

  const [image, setImage] = useState(null);
  const [sponsorImage, setImageSponsor] = useState(null);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  }

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0])
  }

  const handleImageSponsor = (e) => {
    setImageSponsor(e.target.files[0]);
    console.log(e.target.files[0])
  }

  const storeImage = async (image) => {
    const storage = getStorage();
    const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
    const storageRef = ref(storage, 'images/' + filename);
    await uploadBytesResumable(storageRef, image);
    const url = await getDownloadURL(storageRef);
    return url;
  }

  // upload data to firestore
  const uploadData = async (e) => {
    e.preventDefault();
    const url = await storeImage(image);
    const urlSponsor = await storeImage(sponsorImage);
    setFormData((prevState) => ({
      ...prevState,
      image: url,
      sponsorImage: urlSponsor,
    }));
    try {
      await addDoc(collection(db, "events"), formData);
      toast.success("Event added successfully");
      data();
    } catch (error) {
      toast.error(error.message);
      console.log(formData);
    }
  }

  const data = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.log(error)
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className="bg-[url('/images/list-bg.png')] bg-repeat-y  min-h-screen bg-center bg-cover pt-16 flex relative">
      <div className="bg-[#E9CC7E] border-img2  bg-opacity-10 backdrop-blur-sm rounded-xl lg:w-[80%] md:w-[95%] w-[95%] bg-center m-auto mt-16 h-fit ">
        <div className="flex relative items-center justify-center m-[auto] my-[-1.5rem] border-img1 w-[50%] h-12 bg-[#400000] bg-opacity-70 backdrop-blur-sm">
          <p className='text-2xl font-bold text-yellow-200 px-5'>Publish Event</p>
        </div>

        <div className='flex flex-col items-center flex-wrap justify-evenly gap-5 mt-16 mb-16 w-[100%]'>

          <form className='w-[100%]' onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center gap-3">
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Name</label>
                <input id="name" onChange={handleChange} value={formData.name} type="text" className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">

                {image && <img src={URL.createObjectURL(image)} alt="event" className="w-[50%] h-32 border-dashed border border-yellow-400 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />}
                <input id="image" onChange={handleImage} type="file" className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                {/* <label className="text-xl font-bold text-yellow-200">Event Image</label> */}
                {sponsorImage && <img src={URL.createObjectURL(sponsorImage)} alt="event" className="w-[50%] h-32 border-dashed border border-yellow-400 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />}
                <input id="image" onChange={handleImageSponsor} type="file" className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Status</label>
                <select id="status" onChange={handleChange} value={formData.status} className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 ">
                  <option value="Upcoming">Upcoming</option>
                  <option value="Active">Active</option>
                  <option value="Ended">Ended</option>
                </select>
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Category</label>
                <select id="category" onChange={handleChange} value={formData.category} className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 ">
                  <option value="Academics">Academics</option>
                  <option value="Dance">Dance</option>
                  <option value="Drama">Drama</option>
                </select>
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Price</label>
                <input id="price" onChange={handleChange} value={formData.price} type="number" className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Venue</label>
                <input id="venue" onChange={handleChange} value={formData.venue} type="text" className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Participants</label>
                <input id="participants" onChange={handleChange} value={formData.participants} type="number" min={0} className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Description</label>
                <textarea id="description" onChange={handleChange} value={formData.description} className="w-[50%] h-[10rem] border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event RuleBook</label>
                <textarea id="rulebook" onChange={handleChange} value={formData.rulebook} className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Prizes</label>
                <textarea id="prize" onChange={handleChange} value={formData.prize} className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <button type='submit' className="w-[50%] h-12 bg-yellow-200 rounded-md m-auto text-yellow-900" onClick={uploadData}>Add Event</button>
            </div>
          </form>


        </div>

      </div>
    </div>
  )
}

export default Cart