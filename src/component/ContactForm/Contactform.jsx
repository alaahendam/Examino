import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "../ContactForm/Contactform.css";

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form className="contact">
      <div>
        <input {...register("User Name")} placeholder="User Name" required />
        {/* {errors.firstName && <p>{errors.firstName.message}</p>} */}
      </div>
      <div style={{ marginBottom: 10 }}>
        <input
          {...register("Email Adress")}
          placeholder="Email Adress"
          required
          type="email"
        />
        {/* {errors.lastName && <p>{errors.lastName.message}</p>} */}
      </div>
      <div>
        <input type="" {...register("object")} placeholder="object" required />
        {/* {errors.age && <p>{errors.age.message}</p>} */}
      </div>
      <div>
        <textarea
          type="text"
          placeholder="Write a comment..."
          name="content"
          required
        />
      </div>
      <input
        value="SEND"
        className="submitt"
        type="submit"
        style={{
          background: "linear-gradient(100deg,#A840D1, #56D1D4)",
          color: "white",
          letterSpacing: "0.5em",
          cursor: "pointer",
          fontSize: "20px",
        }}
      />
    </form>
  );
}

export default ContactForm;
