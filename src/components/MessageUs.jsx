import React from 'react';

const MessageUs = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-lg">Message us</h1>
      <form
        action={handleSubmit}
        className="text-gray-700 md:w-[80%] w-full flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Your Name"
          className="w-full"
          required
          onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Your Email Address"
          className="w-full"
          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Your Mobile Number"
          className="w-full"
          required
          onChange={(e) => setUserForm({ ...userForm, mobile: e.target.value })}
        />
        <textarea
          name=""
          id=""
          rows="4"
          placeholder="Message"
          onChange={(e) =>
            setUserForm({ ...userForm, message: e.target.value })
          }
        ></textarea>
        <button
          type="submit"
          className="bg-gray-700 text-gray-300 rounded-lg self-auto md:self-center md:px-10 font-bold text-2xl p-4"
        >
          Send{' '}
        </button>
      </form>
    </div>
  );
};

export default MessageUs;
