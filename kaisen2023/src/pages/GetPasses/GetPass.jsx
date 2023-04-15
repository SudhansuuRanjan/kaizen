import React, { useState } from 'react'
import { db } from '../../firebase.config'
import { collection, addDoc } from 'firebase/firestore'

const GetPass = () => {

    const [formData, setFormData] = useState({
        email: '',
        subject: '',
        text: '',
        html: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const mailRef = collection(db, "mail");
        let data = {
            to: [formData.email],
            message: {
                subject: formData.subject,
                text: formData.text,
                html: formData.html
            }
        }
        addDoc(mailRef, data);
        setFormData({
            email: '',
            subject: '',
            text: '',
            html: ''
        })
    }

    return (
        <div className='pt-16'>
            <h1>Get Pass</h1>
            <form onSubmit={handleSubmit} className='flex gap-5 flex-col'>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className='text-gray-700' value={formData.email} type="text" id="email" placeholder="Email" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="subject">Subject</label>
                    <input className='text-gray-700' value={formData.subject} type="text" id="subject" placeholder="Subject" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="text">Text</label>
                    <input className='text-gray-700' value={formData.text} type="text" id="text" placeholder="Text" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="html">HTML</label>
                    <input className='text-gray-700' value={formData.html} type="text" id="html" placeholder="HTML" onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default GetPass;