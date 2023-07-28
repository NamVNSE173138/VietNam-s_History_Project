import React, { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import { CodeOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col } from "antd";
import { Link } from "react-router-dom";

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    fontWeight: "bold",
  },
  input: {
    padding: "8px",
    marginBottom: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  textarea: {
    padding: "8px",
    marginBottom: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    resize: "vertical",
  },
  submitButton: {
    padding: "8px 16px",
    backgroundColor: "#1890ff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

const ForgotPass = () => {
  const form = useRef();
  const navigate = useNavigate();

  const [randomCode, setRandomCode] = useState("");

  // Fetch a random code from the API
  useEffect(() => {
    fetchRandomCode();
  }, []);

  const fetchRandomCode = () => {
    // Replace the API endpoint with the actual URL of your mock API
    fetch("https://64890c550e2469c038fe9625.mockapi.io/VN_HS/code")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns an array of codes, get a random code from it
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomCode = data[randomIndex].code;
        setRandomCode(randomCode);
      })
      .catch((error) => {
        console.error("Failed to fetch random code:", error);
      });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const userName = form.current.username.value;
    const userEmail = form.current.email.value;
    const message = randomCode; // Use the fetched random code as the message

    if (!userEmail) {
      console.error("Recipient email address is empty!");
      return;
    }

    console.log("Form Data:", {
      user_name: userName,
      user_email: userEmail,
      message: message,
    });

    // Replace these with your actual service and template IDs
    const serviceId = "service_j84ttbj";
    const templateId = "template_iykoano";
    const userId = "7su-uLkZnI77BYXZ2";

    emailjs.sendForm(serviceId, templateId, form.current, userId).then(
      (result) => {
        // Rest of the function...
        navigate(`/changePass?userName=${encodeURIComponent(userName)}`);
      },
      (error) => {
        console.log(error.text);
        console.error("Failed to send message!");
      }
    );
  };

  return (
    <div style={styles.container}>
      <h1>Forgot Password</h1>
      <form ref={form} onSubmit={sendEmail} style={styles.form}>
        <label style={styles.label}>Name</label>
        <input type="text" name="username" style={styles.input} />
        <label style={styles.label}>Email</label>
        <input type="email" name="email" style={styles.input} />
        <input
          type="text"
          name="message"
          value={randomCode}
          style={{ display: "none" }}
          readOnly
        />
        <button type="submit" style={styles.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ForgotPass;
