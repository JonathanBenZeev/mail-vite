import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});


function CustomInput(props) {
    return (
        <TextField {...props} id="outlined-basic" variant="outlined" />
    )
}


export function MyForm() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
    })



    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setUser(user => ({ ...user, [field]: value }))
    }

    const { firstName, lastName, email } = user
    return (
        <div>
            <h1>Signup</h1>
            <Formik
                initialValues={user}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log('user:', user)
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className='formik'>
                        <Field value={firstName} onInput={handleChange} as={CustomInput} name="firstName" id="firstName" label="firstName" />
                        {errors.firstName && touched.firstName && (
                            <div>{errors.firstName}</div>
                        )}
                        <Field value={lastName} onInput={handleChange} as={CustomInput} name="lastName" label="lastName" />
                        {errors.lastName && touched.lastName ? (
                            <div>{errors.lastName}</div>
                        ) : null}

                        <Field value={email} onInput={handleChange} as={CustomInput} name="email" type="email" label="email" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                        <Button variant="contained" type="submit">Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}