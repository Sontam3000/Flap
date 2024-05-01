import React, { useState } from "react";
import { Card, CardHeader, CardBody, Row, CardTitle, FormGroup, Form, Input, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt from 'jsonwebtoken';
import '../../assets/css/style.css';

function ResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      try {
        const token = localStorage.getItem('token') || document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const decoded = jwt.decode(token);

        const response = await axios.post(`http://localhost:3001/user/reset-password/${decoded.userId}`, {
          oldPassword: oldPassword,
          newPassword: newPassword,
        });

        alert(response.data.message); // Show success message
        navigate('/user/dashboard');
      } catch (error) {
        console.error(error);
        setErrorMessage("Error updating password. Please try again."); // Display error message
      }
    } else {
      setErrorMessage("Passwords do not match."); // Set mismatch message
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md="6" style={{ margin: 'auto' }}>
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Reset Password</CardTitle>
            </CardHeader>
            <CardBody>
              {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="pr-1" md="12">
                    <FormGroup>
                      <label>Old Password</label>
                      <Input
                        value={oldPassword}
                        type="password"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>New Password</label>
                      <Input
                        value={newPassword}
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Confirm Password</label>
                      <Input
                        value={confirmPassword}
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="4">
                    <FormGroup>
                      <button style={{ marginTop: '0.8em', padding: '0.5em 0.8em', border: 'none', backgroundColor: '#1f4399', color: 'white' }}>Reset password</button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ResetPassword;
