import { Container, Nav, Navbar } from 'react-bootstrap';
import React from 'react';

const SiteNavbar = () => {
    return (
        <Navbar
            className='py-3'
            expand='lg'
            variant='dark'
            style={{ backgroundColor: 'var(--background-secondary)', width: '100%', position: 'fixed', zIndex: '10' }}
        >
            <Container fluid style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                <Navbar.Brand id='link-color' href='/'>
                    FLRP.DEV
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar-dark-example' />
                <Navbar.Collapse id='navbar-dark-example'>
                    <Nav className='ms-auto'>
                        <Nav.Link id='link-color' href='/'>
                            HOME
                        </Nav.Link>
                        <Nav.Link id='link-color' href='/blog'>
                            BLOG
                        </Nav.Link>
                        <Nav.Link id='link-color' href='https://ko-fi.com/flrp' target='_blank'>
                            DONATE
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default SiteNavbar;
