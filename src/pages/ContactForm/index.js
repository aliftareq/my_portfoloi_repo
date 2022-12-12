import React, { useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { contactConfig } from "../../content_option";

const FORMSPARK_ACTION_URL = "https://submit-form.com/9EDhAJH8";

export const ContactME = () => {

    const [formData, setFormdata] = useState({
        loading: false,
        show: false,
        alertmessage: "",
        variant: "",
    });

    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        await fetch(FORMSPARK_ACTION_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                message,
            }),
        });
        setFormdata({
            loading: false,
            alertmessage: "Thank you for your messege , it has been sent successfully",
            variant: "success",
            show: true,
        });
        e.target.name.value = ''
        e.target.email.value = ''
        e.target.message.value = ''
    };


    return (
        <HelmetProvider>
            <Container>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{meta.title} | Contact</title>
                    <meta name="description" content={meta.description} />
                </Helmet>
                <Row className="mb-5 mt-3">
                    <Col lg="8">
                        <h1 className="display-4 mb-4">Contact Me</h1>
                        <hr className="t_border my-4 ml-0 text-left" />
                    </Col>
                </Row>
                <Row className="sec_sp">
                    <Col lg="12">
                        <Alert
                            //show={formData.show}
                            variant={formData.variant}
                            className={`rounded-0 co_alert ${formData.show ? "d-block" : "d-none"
                                }`}
                            onClose={() => setFormdata({ show: false })}
                            dismissible
                        >
                            <p className="my-0">{formData.alertmessage}</p>
                        </Alert>
                    </Col>
                    <Col lg="5" className="mb-5">
                        <h3 className="color_sec py-4">Get in touch</h3>
                        <address>
                            <strong>Email:</strong>{" "}
                            <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                                {contactConfig.YOUR_EMAIL}
                            </a>
                            <br />
                            <br />
                            {contactConfig.hasOwnProperty("YOUR_FONE") ? (
                                <p>
                                    <strong>Phone:</strong> {contactConfig.YOUR_FONE}
                                </p>
                            ) : (
                                ""
                            )}
                        </address>
                        <p>{contactConfig.description}</p>
                    </Col>
                    <Col lg="7" className="d-flex align-items-center">
                        <form onSubmit={onSubmit} className="contact__form w-100">
                            <Row>
                                <Col lg="6" className="form-group">
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Name"
                                        type="text"
                                        required
                                    />
                                </Col>
                                <Col lg="6" className="form-group">
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control rounded-0"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                        required
                                    />
                                </Col>
                            </Row>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="form-control rounded-0"
                                id="message"
                                name="message"
                                placeholder="Message"
                                rows="5"
                                required
                            ></textarea>
                            <br />
                            <Row>
                                <Col lg="12" className="form-group">
                                    <button className="btn ac_btn" type="submit">
                                        SEND
                                    </button>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </HelmetProvider>
    );
};
