import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface RequestFormProps {
  onSubmit: () => void;
  submitted: boolean;
}

const RequestForm: React.FC<RequestFormProps> = ({
  onSubmit,
  submitted = false,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log("Submitted request form data:", formData);
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          className="border rounded"
          autoComplete="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border rounded"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="message">Your message: </label>
        <textarea
          id="message"
          name="message"
          placeholder="Type your request here..."
          className="border rounded"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit" disabled={submitted} className="w-full mt-4">
        Send request
      </button>
    </form>
  );
};

export default RequestForm;
