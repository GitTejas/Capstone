import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function NewForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required').email('Invalid email'),
    }),
    onSubmit: (values) => {
      console.log('Form values:', values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          className={`w-full px-4 py-2 border ${
            formik.errors.name ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
        {formik.errors.name && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className={`w-full px-4 py-2 border ${
            formik.errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
        {formik.errors.email && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        Submit
      </button>
    </form>
  );
}

export default NewForm;
