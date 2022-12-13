import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Contactform.css";
function ContactForm() {
  return (
    <div className="divform">
    <Form className="forM">
      <Row className="mb-4">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Control type="text" placeholder="User Name" required />
        </Form.Group>
      </Row>

      <Form.Group className="mb-4" controlId="formGridAddress1">
        <Form.Control placeholder="Email Address" type="email" required />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formGridAddress2">
        <Form.Control placeholder="Object" type="text" required />
      </Form.Group>

      <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          as="textarea"
          rows={6}
          placeholder="Your Message"
          type="text"
          required
        />
      </Form.Group>

      <Button
        className="btnForm"
        variant="primary"
        type="submit"
        style={{ width: "100%" }}
      >
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default ContactForm;
