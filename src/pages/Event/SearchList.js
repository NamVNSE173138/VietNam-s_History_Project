import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function SearchList() {
    
    const [search, setSearch] = useState('');
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event"
            );
            setEvents(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <div className='SearchList'>
            <Container>
                <h1 className='text-center mt-4'>Event List</h1>
                <Form>
                    <InputGroup className='my-3'>
                        <Form.Control
                        onChange={(e) => setSearch(e.target.value)} 
                        placeholder='Search Event'
                        />
                    </InputGroup>
                </Form>
                <Table>
                    <thread>
                        <tr>
                            <th>Event Name</th>
                            <th>Location</th>
                            <th>Description</th>
                            <th>Timeline</th>
                        </tr>
                    </thread>
                    <tbody>
                        {events
                            .filter((event) => {
                                return search.toLowerCase() === ''
                                ? event
                                : event.eventName.toLowerCase().includes(search);
                        })
                        .map((event) => (
                            <tr key={event.eventID}>
                                <td>{event.eventName}</td>
                                <td>{event.location}</td>
                                <td>{event.description}</td>
                                <td>{event.timeline}</td>
                            </tr>
                        ))}
                        
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default SearchList;