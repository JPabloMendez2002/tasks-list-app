import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBBtn
} from 'mdb-react-ui-kit';

export const Footer = () => {
    return (
        <>
            <hr />
            <MDBFooter className='bg-light text-center text-white'>
                <MDBContainer className='p-4 pb-0'>
                    <section className='mb-4'>
                        <MDBBtn
                            floating
                            className='m-1'
                            style={{ backgroundColor: '#ac2bac' }}
                            href='https://www.instagram.com/pablomendezpoveda?igsh=MTlvZjJ2NzI3MThzOQ%3D%3D&utm_source=qr'
                            role='button'
                            target='_blank'
                        >
                            <MDBIcon fab icon='instagram' />
                        </MDBBtn>

                        <MDBBtn
                            floating
                            className='m-1'
                            style={{ backgroundColor: '#0082ca' }}
                            href='https://www.linkedin.com/in/jose-pablo-mendez-poveda'
                            role='button'
                            target='_blank'
                        >
                            <MDBIcon fab icon='linkedin-in' />
                        </MDBBtn>

                        <MDBBtn
                            floating
                            className='m-1'
                            style={{ backgroundColor: '#333333' }}
                            href='https://github.com/JPabloMendez2002'
                            role='button'
                            target='_blank'
                        >
                            <MDBIcon fab icon='github' />
                        </MDBBtn>
                    </section>
                </MDBContainer>

                <div className='text-center p-3 bg-dark'>
                    © 2024 Copyright. Developed By: José Pablo Méndez Poveda.
                </div>
            </MDBFooter>
        </>
    );
}