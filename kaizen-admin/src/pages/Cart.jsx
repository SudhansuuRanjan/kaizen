import { useState } from 'react'
import { db } from '../firebase.config'
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const categories = [
  {
    name: "Literary",
    id: 1,
  },
  {
    name: "Cultural",
    id: 2,
  },
  {
    name: "Arts",
    id: 3,
  },
  {
    name: "Informals",
    id: 4,
  },
  {
    name: "Sports",
    id: 5,
  },
  {
    name: "Academics",
    id: 6,
  }
]


const Cart = () => {

  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: "",
    status: "Active",
    participants: "",
    price: "",
    description: "",
    rulebook: "",
    category: "Literary",
    prize: "",
    sponsorName: "",
    tagline: "",
    contacts: [],
  });

  const [contactData, setContactData] = useState({
    name: "",
    contact: ""
  });

  const [image, setImage] = useState(null);
  const [sponsorImage, setImageSponsor] = useState(null);
  const [disabled, setDisabled] = useState(false);


  const slugify = str =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

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
    setDisabled(true);
    const url = await storeImage(image);
    const data = formData;
    data.image = url;
    if (sponsorImage) {
      const urlSponsor = await storeImage(sponsorImage);
      data.sponsor = urlSponsor;
    } else {
      data.sponsor = "";
    }
    data.id = slugify(formData.name);
    try {
      await addDoc(collection(db, "events"), data);
      toast.success("Event added successfully");
      setFormData({
        name: "",
        status: "active",
        participants: "",
        price: "",
        description: "",
        rulebook: "",
        category: "Dance",
        prize: "",
        sponsorName: "",
        tagline: "",
        contacts: [],
        minMem:0,
      })
      setImage(null);
      setImageSponsor(null);
      // data();
    } catch (error) {
      toast.error(error.message);
      // console.log(formData);
    }
    setDisabled(false);
  }

  const handleContactChange = (e) => {
    setContactData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  }

  const createContact = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      contacts: [...prevState.contacts, contactData]
    }));
    setContactData({
      name: "",
      contact: ""
    });
  }

  const deleteContact = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      contacts: prevState.contacts.filter((contact, i) => i !== index)
    }));
  }

  return (
    <div className="bg-[url('/images/list-bg.png')] bg-repeat-y  min-h-screen bg-center bg-cover pt-16 flex relative">
      <div className="bg-[#E9CC7E] border-img2  bg-opacity-10 backdrop-blur-sm rounded-xl lg:w-[80%] md:w-[95%] w-[95%] bg-center m-auto mt-16 h-fit ">
        <div className="flex relative items-center justify-center m-[auto] my-[-1.5rem] border-img1 w-[50%] h-12 bg-[#400000] bg-opacity-70 backdrop-blur-sm">
          <p className='text-2xl font-bold text-yellow-200 px-5'>Publish Event</p>
        </div>

        <div className='flex flex-col items-center flex-wrap justify-evenly gap-5 mt-16 mb-16 w-[100%]'>

          <form className='w-[100%]' onSubmit={uploadData}>
            <div className="flex flex-col justify-center gap-3">
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Name</label>
                <input id="name" required onChange={handleChange} value={formData.name} type="text" className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2" placeholder='Byte World' />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Tagline</label>
                <input id="tagline" required onChange={handleChange} value={formData.tagline} type="text" className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2" placeholder='Be the Change' />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Poster</label>
                {image && <img src={URL.createObjectURL(image)} alt="event" className="w-[50%] h-32 border-dashed border border-yellow-400 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />}
                <input id="image" required onChange={handleImage} type="file" className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Sponsor Name</label>
                <input placeholder='Unacademy' id="sponsorName" onChange={handleChange} value={formData.sponsorName} className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Sponsor Logo</label>
                {sponsorImage && <img src={URL.createObjectURL(sponsorImage)} alt="event" className="w-[50%] h-32 border-dashed border border-yellow-400 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />}
                <input id="image" onChange={handleImageSponsor} type="file" className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Status</label>
                <select id="status" required onChange={handleChange} value={formData.status} className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 ">
                  <option value="Upcoming">Upcoming</option>
                  <option value="Active">Active</option>
                  <option value="Ended">Ended</option>
                </select>
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Category</label>
                <select id="category" required onChange={handleChange} value={formData.category} className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 ">
                  {
                    categories.map((cat, idx) => (
                      <option key={idx} value={cat.name}>{cat.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Price</label>
                <input min={0} placeholder='200' id="price" required onChange={handleChange} value={formData.price} type="number" className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Minimum Members</label>
                <input min={0} placeholder='200' id="minMem" required onChange={handleChange} value={formData.minMem} type="number" className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Participants</label>
                <input placeholder='4' id="participants" required onChange={handleChange} value={formData.participants} type="number" min={0} className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Description</label>
                <textarea placeholder='bla bla bla...' id="description" required onChange={handleChange} value={formData.description} className="w-[50%] h-[10rem] border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event RuleBook</label>
                <input placeholder='https://www.google.com' type="url" id="rulebook" required onChange={handleChange} value={formData.rulebook} className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5">
                <label className="text-xl font-bold text-yellow-200">Event Prizes</label>
                <input placeholder='20K' id="prize" required onChange={handleChange} value={formData.prize} className="w-[50%] h-12 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
              </div>
              <div className="flex flex-col items-center justify-center gap-5 ">
                <div className='w-[100%] flex flex-col items-center gap-2'>
                  <label className="text-xl font-bold text-yellow-200">Event Contact</label>
                  <input placeholder='Name' id="name" onChange={handleContactChange} value={contactData.name} className="w-[50%] h-10 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
                  <input placeholder='+917352304847' id="contact" onChange={handleContactChange} value={contactData.contact} className="w-[50%] h-10 border-2 border-yellow-200 rounded-md bg-yellow-800 bg-opacity-30 px-2 " />
                  <button onClick={createContact} className="w-[50%] h-10 bg-yellow-300 rounded-md m-auto text-yellow-900">
                    Add Contact
                  </button>
                </div>
              </div>
              {
                formData.contacts.map((contact, id) => (
                  <div key={id} className="flex flex-col items-center justify-center gap-1">
                    <div className="w-[50%] h-10 rounded-md bg-yellow-800 bg-opacity-30 px-2 ">
                      Name: {contact.name}
                    </div>
                    <div className="w-[50%] h-10 rounded-md bg-yellow-800 bg-opacity-30 px-2 ">
                      Contact: {contact.contact}
                    </div>
                    <button className="bg-pink-500 w-[10rem] py-2 rounded-xl" onClick={() => deleteContact(id)}>Delete</button>
                  </div>
                ))
              }
              <button type='submit' disabled={disabled} className="w-[50%] h-12 bg-yellow-200 rounded-md m-auto text-yellow-900 mt-5">{
                disabled ? 'Uploading Event' : 'Submit'
              }</button>
            </div>
          </form>


        </div>

      </div>
    </div>
  )
}

export default Cart