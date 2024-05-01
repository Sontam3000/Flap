import React, {useState, useEffect} from 'react';
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";
import axios from 'axios';


function FCard() {
    const scrollbarStyles = {
        WebkitOverflowScrolling: 'touch', // Optional: Improve scrolling smoothness      
      };
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
      axios.get('http://localhost:3001/admin/users')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    };

    const handleStatus = (userId, newStatus) => {
      axios.post(`http://localhost:3001/admin/users/${userId}`, { status: newStatus })
        .then(response => {
          console.log(response.data.message);
          alert('Updated Successfully');
          fetchUsers(); // Refresh user data after update
        })
        .catch(error => {
          console.error('Error changing status:', error);
          alert('Error changing status. Please try again.');
        });
    };
  

    useEffect(() => {
      fetchUsers();
    }, []);
  return (
   <>
    <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Registered User/ Card Request</CardTitle>
              </CardHeader>
              <CardBody>
                <Table style={scrollbarStyles} responsive>
                  <thead className='tableHead'>
                    <tr>
                      <th>User Name</th>
                      <th>Full Name</th>
                      <th>Contact</th>
                      <th>Email</th>
                      <th>Organization</th>
                      <th>Status</th>
                      <th className="">Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                 {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td>
                        {user.firstname}&nbsp;
                        {user.middlename? user.middlename : ''}
                        {user.lastname}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      <td>{user.organization}</td>
                      <td>{user.reg_flag !== '0'? 
                        (<span className='px-1' style={{backgroundColor:'#66FF99', color:'black'}}>Active</span>) 
                        : 
                        (<span className='px-1' style={{backgroundColor:'Red', color:'white'}}>Inactive</span>)
                      }</td>
                      <td style={{ display: 'flex' }}>
                        {user.reg_flag === '0' ?
                          ( 
                            <i onClick={() => handleStatus(user._id, '1')}  
                              style={{ fontSize: 22, cursor: 'pointer' }} 
                              className="nav-link btn-rotate fas fa-check text-success edeButton">
                            </i> 
                          ) :
                          ( 
                            <i onClick={() => handleStatus(user._id, '0')} 
                              style={{ fontSize: 22, cursor: 'pointer' }} 
                              className="nav-link btn-rotate fas fa-window-minimize text-danger edeButton">
                            </i> 
                          )
                        }
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      {/*  */}
   </>
  )
}

export default FCard;
