import React, { useState } from 'react';
import { Form , Segment, Container } from 'semantic-ui-react';

export default function ProfileDetail({ props, user, disconnect }) {
    const handleClick = e => {
        e.preventDefault();
        disconnect();
        props.history.push('/');
    }

    const handleSubmit = () => {
    }

    const handleChangeName = (e) => {
        user.name = e.target.value;
    }

    const handleChangeMail = (e) => {
        user.email = e.target.value;
    }

    return (
        <Segment>
            <Form class='ui form' onSubmit={handleSubmit}>
                <Form.Group unstackable widths={2}>
                <Container>
                    <Form.Input
                        fluid
                        label='Nom'
                        placeholder="Nom"
                        name='Name'
                        value={user.name}
                        onChange={handleChangeName} />
                    <Form.Input
                        fluid
                        label="Email"
                        placeholder="Email"
                        name="email"
                        value={user.email}
                        onChange={handleChangeMail} />
                </Container>
                </Form.Group>
                <Form.Group inline>
                    <Form.Button>
                        Enregistrer
                    </Form.Button>
                    <Form.Button>
                        Annuler
                    </Form.Button>
                </Form.Group>
            </Form>
        </Segment>
    );
}