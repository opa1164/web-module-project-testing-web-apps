import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{ //done
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> { //done
    render(<ContactForm/>);
    const header = screen.queryByText("Contact Form");

    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => { //done
    render(<ContactForm/>);
    const FirstName = screen.getByLabelText('First Name*');
    userEvent.type(FirstName, "not");
    const error = screen.getAllByTestId('error');
    const errorl = error.length === 1;
    expect(errorl).toBeTruthy();

});

test('renders THREE error messages if user enters no values into any fields.', async () => { //done
    render(<ContactForm/>);
    const Submit = screen.getByRole('button');
    userEvent.click(Submit);
    const errors = screen.getAllByTestId('error');
    const errorl = errors.length === 3;
    expect(errorl).toBeTruthy();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => { //done
    render(<ContactForm/>);
    const FirstName = screen.getByLabelText('First Name*');
    const LastName = screen.getByLabelText('Last Name*');
    const Submit = screen.getByRole('button');

    userEvent.type(FirstName, "working");
    userEvent.type(LastName, "working");
    userEvent.click(Submit);


    const error = screen.getAllByTestId('error');
    const errorl = error.length === 1;
    expect(errorl).toBeTruthy();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => { //done
    render(<ContactForm/>);
    const Email = screen.getByLabelText('Email*');
    userEvent.type(Email, "not an email");
    const error = screen.queryByText(/email must be a valid email address/i);
    expect(error).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => { //done
    render(<ContactForm/>);
    const Submit = screen.getByRole('button');
    userEvent.click(Submit);
    const error = screen.queryByText(/lastName is a required field/i);
    expect(error).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {//done
    render(<ContactForm/>);
    const FirstName = screen.getByLabelText('First Name*');
    const LastName = screen.getByLabelText('Last Name*');
    const Email = screen.getByLabelText('Email*');

    const Submit = screen.getByRole('button');


    userEvent.type(FirstName, "working");
    userEvent.type(LastName, "working");
    userEvent.type(Email, "working@work.wrk");
    userEvent.click(Submit);

    const displayName = screen.queryByTestId('firstnameDisplay');
    const displayLName = screen.queryByTestId('lastnameDisplay');
    const displayMail = screen.queryByTestId('emailDisplay');
    const displayMsg = screen.queryByTestId('messageDisplay');

    expect(displayName).toBeInTheDocument();
    expect(displayLName).toBeInTheDocument();
    expect(displayMail).toBeInTheDocument();
    expect(displayMsg).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {//done
    render(<ContactForm/>);
    const FirstName = screen.getByLabelText('First Name*');
    const LastName = screen.getByLabelText('Last Name*');
    const Email = screen.getByLabelText('Email*');
    const Message = screen.getByLabelText('Message');

    const Submit = screen.getByRole('button');

    userEvent.type(FirstName, "working");
    userEvent.type(LastName, "working");
    userEvent.type(Email, "working@work.wrk");
    userEvent.type(Message, "working");
    userEvent.click(Submit);

    const displayName = screen.queryByTestId('firstnameDisplay');
    const displayLName = screen.queryByTestId('lastnameDisplay');
    const displayMail = screen.queryByTestId('emailDisplay');
    const displayMsg = screen.queryByTestId('messageDisplay');

    expect(displayName).toBeInTheDocument();
    expect(displayLName).toBeInTheDocument();
    expect(displayMail).toBeInTheDocument();
    expect(displayMsg).toBeInTheDocument();
});