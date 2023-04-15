import React, { useState } from 'react'
import { db } from '../../firebase.config'
import { collection, doc, getDoc, updateDoc, addDoc } from 'firebase/firestore'

const GetPass = () => {

    const [formData, setFormData] = useState({
        email: '',
        subject: '',
        body: '',
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
    }

    return (
        <div>
            <h1>Get Pass</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input value={formData.email} type="text" id="email" placeholder="Email" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="subject">Subject</label>
                    <input value={formData.subject} type="text" id="subject" placeholder="Subject" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="body">Body</label>
                    <input value={formData.body} type="text" id="body" placeholder="Body" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="html">HTML</label>
                    <input value={formData.html} type="text" id="html" placeholder="HTML" onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default GetPass;