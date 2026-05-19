import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { login } from '../../store/auth/auth.slice';
import LoginButton from './LandingButton.web';
import LoginInputField from './LandingInputField.web';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/store';

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [formError, setFormError] = useState<string | null>(null);

  const validateData = () => {
    const tempErrors: Record<string, string> = {};

    if (!emailInput) {
      tempErrors.email = 'Email is required';
    } else if (!emailInput.includes('@')) {
      tempErrors.email = 'Invalid email address';
    }

    if (!passwordInput) {
      tempErrors.password = 'Password is required';
    } else if (passwordInput.length < 8) {
      tempErrors.password = 'Password must be at least 8 characters';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const onSubmitHandler = () => {
    if (!validateData()) {
      setFormError('Action failed!');
      return;
    }
    setFormError(null);
    dispatch(login({ email: emailInput, password: passwordInput }));
  };

  return (
    <View className='w-full h-auto flex-col justify-evenly items-center gap-6 pb-6'>
      <Text className='font-jetbrains-500 text-2xl'>Welcome</Text>
      <LoginInputField
        type='email'
        value={emailInput}
        onChange={setEmailInput}
        error={errors.email}
        onSubmit={onSubmitHandler}
      />
      <LoginInputField
        type='password'
        value={passwordInput}
        onChange={setPasswordInput}
        error={errors.password}
        onSubmit={onSubmitHandler}
      />
      <View>
        <LoginButton title='Log in' onPress={onSubmitHandler} />
        <View className='min-h-[16px] mt-1'>
          {formError && (
            <Text className='text-xs text-red-500 font-jetbrains-300'>
              {formError}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default LoginForm;
