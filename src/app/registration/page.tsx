"use client";
import { FunctionComponent, useContext, useState } from "react";
import { setUserAuthCookie } from "@/utils/cookieHandler";
import { useRouter } from "next/navigation";
import { RegistrationForm, RegistrationFormErrors } from "@/types/custom";
import { useAuthContext } from "../context/AuthContext/AuthProvider";

const Registration: FunctionComponent = () => {
  const router = useRouter();

  const { updateIsAuthorized } = useAuthContext()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordReenter: "",
  } as RegistrationForm);
  const [errors, setErrors] = useState({} as RegistrationFormErrors);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Check error values and reset errors for after submit
    if (Object.values(errors).join("").length !== 0) {
      setErrors({} as RegistrationFormErrors)
    }
  };

  const validateForm = () => {
    const errors: RegistrationFormErrors = {
      email: "",
      password: "",
      passwordReenter: "",
    };

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 7) {
      errors.password = "Please enter at least 7 characters";
    }
    // TODO: Password variation and requirement validation
    if (!formData.passwordReenter) {
      errors.passwordReenter = "Reenter password";
    }
    if (formData.password !== formData.passwordReenter) {
      errors.passwordReenter = "Password do not match";
    }

    return errors;
  };

  const fetchRegistration = async (userData: RegistrationForm) => {
    const response = await fetch("http://localhost:8080/api/registration", {
      method: "POST",
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })

    const json = await response.json();

    if (response.status === 200) {
      setUserAuthCookie(JSON.stringify(json))
      updateIsAuthorized(true)
      // Redirect to tasks page
      router.push('/tasks');
    } else {
      throw new Error(`API Request failed with ${response.status} (${response.statusText}); ${json}`)
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      passwordReenter: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    const formErrors = validateForm();
    const isValidForm = Object.values(formErrors).join("").length === 0
    if (isValidForm) {
      try {
        setLoading(true);
        // Make an API request to create the account
        await fetchRegistration({
          email,
          password
        } as RegistrationForm)
        setSuccessMessage("Registration success!");
      } catch (error: any) {
        // Handle API errors and set appropriate error messages in state
        console.error(error.message);
        setErrors({ ...formErrors, apiError: error.message });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const sharedInputClasses =
    "mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-gray-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 peer";
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden w-9/12">
      <div className="m-auto w-full rounded-md bg-white p-6 shadow-xl max-w-sm">
        <h1 className="text-center text-2xl text-gray-700">
          Create an account
        </h1>
        <p className="max-w-sm">{successMessage || errors.apiError}<br /></p>
        <form className="mt-6" onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={sharedInputClasses}
              placeholder=" "
              required
            />
            {/* {errors.email && <p className="max-w-sm">{errors.email}</p>} */}
            <span className="invisible mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:visible">
              Please enter a valid email address
            </span>
          </div>
          {/* PASSWORD */}
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={sharedInputClasses}
            />
            <p className="mt-2 text-sm text-red-500">
              {errors.password}
              <br />
            </p>
          </div>
          {/* PASSWORD MATCH */}
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Reenter Password
            </label>
            <input
              type="password"
              name="passwordReenter"
              value={formData.passwordReenter}
              onChange={handleChange}
              className={sharedInputClasses + " peer"}
            />
            <p className="mt-2 text-sm text-red-500">
              {errors.passwordReenter}
              <br />
            </p>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none "
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-xs font-light text-gray-700">
          {" "}
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="font-medium text-gray-600 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
