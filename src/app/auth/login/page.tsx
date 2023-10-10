"use client";
import { setUserAuthCookie } from "@/utils/cookieHandler";
import { FunctionComponent, useState } from "react";
import { useRouter } from "next/navigation";

interface LoginForm {
  email: string,
  password: string,
} 

interface LoginFormErrors extends LoginForm {
  apiError?: string
}

const Login: FunctionComponent = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  } as LoginForm);
  const [errors, setErrors] = useState({} as LoginFormErrors);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors: LoginFormErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const fetchAuthLogin = async (userData: LoginForm) => {
    const response = await fetch("http://localhost:8080/api/auth/login", {
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
    };
    const email = target.email.value;
    const password = target.password.value;

    const formErrors = validateForm();
    const isValidForm = Object.values(formErrors).join("").length === 0
    if (isValidForm) {
      try {
        setLoading(true);
        // Make an API request to create the account
        await fetchAuthLogin({
          email,
          password
        } as LoginForm)
        setSuccessMessage("Logging in!");
        // You may want to redirect the user to a login page or take other actions here
      } catch (error: any) {
        // Handle API errors and set appropriate error messages in state
        console.error("API Error:", error);
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
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <div className="m-auto w-full rounded-md bg-white p-6 shadow-xl lg:max-w-xl">
        <h1 className="text-center text-2xl text-gray-700">
          Sign in
        </h1>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errors.apiError && <p className="error-message">{errors.apiError}</p>}
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
            {/* {errors.email && <p className="error-message">{errors.email}</p>} */}
            <span className="mt-2 invisible text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:visible">
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

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none "
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-xs font-light text-gray-700">
          {" "}
          Don't have an account?{" "}
          <a
            href="/registration"
            className="font-medium text-gray-600 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
