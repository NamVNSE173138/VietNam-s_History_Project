import React, { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

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
  const [modalOpen, setModalOpen] = useState(false);

  const [randomCode, setRandomCode] = useState("");
  const showModal = () => {
    setModalOpen(true);
  };
  const hideModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    fetchRandomCode();
  }, []);

  const fetchRandomCode = () => {
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

    fetch("https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user")
      .then((response) => response.json())
      .then((data) => {
        const userExists = data.some(
          (user) => user.userName === userName && user.email === userEmail
        );
        if (userExists) {
          const serviceId = "service_j84ttbj";
          const templateId = "template_iykoano";
          const userId = "7su-uLkZnI77BYXZ2";

          emailjs.sendForm(serviceId, templateId, form.current, userId).then(
            (result) => {
              navigate(
                `/changePass?userName=${encodeURIComponent(
                  userName
                )}&code=${encodeURIComponent(message)}`
              );
            },
            (error) => {
              console.log(error.text);
              console.error("Failed to send message!");
            }
          );
        } else {
          Modal.warning({
            title: "User Not Found",
            content: "User with the provided name and email does not exist!",
            onOk: hideModal,
            onCancel: hideModal,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
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
