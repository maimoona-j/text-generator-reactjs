import React from 'react'

export default function Contact() {
  return (
    <>
      <div className="container bg-white py-20 text-center"id='container'>
        <h2 className="text-blueviolet text-3xl mb-8">Contact Us</h2>
        <form id="contact-form" className='flex flex-col items-center'>
          <input type="text" name="name" className='w-full py-2 px-4 mb-4' placeholder="Your Name" required />
          <input type="email" className="w-full py-2 px-4 mb-4" name="email" placeholder="Your Email" required />
          <textarea
          className="w-full py-2 px-4 mb-4"
            name="message"
            placeholder="Your Message"
            required
          ></textarea>
          <button className="bg-green-700 text-white border-none py-2 px-6 rounded-lg font-bold transition duration-300 hover:bg-lightgray hover:text-blueviolet hover:border-2 hover:border-blueviolet" type="submit">Send Message</button>
        </form>
      </div>
    </>
  )
}
