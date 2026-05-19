import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { login } from '../../store/auth/auth.slice';
import LoginButton from './LandingButton.web';
import LoginInputField from './LandingInputField.web';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/store';

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  useEffect(() => {
    if (touched.email) {
      if (!emailInput) {
        setErrors((e) => ({
          ...e,
          email: 'Email is required',
        }));
      } else if (!emailInput.includes('@')) {
        setErrors((e) => ({
          ...e,
          email: 'Invalid email address',
        }));
      } else {
        setErrors((e) => ({ ...e, email: undefined }));
      }
    }

    if (touched.password) {
      if (!passwordInput) {
        setErrors((e) => ({
          ...e,
          password: 'Password is required',
        }));
      } else if (passwordInput && passwordInput.length < 8) {
        setErrors((e) => ({
          ...e,
          password: 'Password must be at least 8 characters',
        }));
      } else {
        setErrors((e) => ({ ...e, password: undefined }));
      }
    }

    if (touched.confirmPassword) {
      if (!confirmPasswordInput) {
        setErrors((e) => ({
          ...e,
          confirmPassword: 'Password confirmation is required',
        }));
      } else if (
        confirmPasswordInput &&
        passwordInput !== confirmPasswordInput
      ) {
        setErrors((e) => ({ ...e, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors((e) => ({ ...e, confirmPassword: undefined }));
      }
    }
  }, [touched.email, emailInput, passwordInput, confirmPasswordInput]);

  const validateData = () => {
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (errors.email || errors.password || errors.confirmPassword) {
      setFormError('Action failed.');
      return false;
    }
    setFormError(null);
    return true;
  };

  const onSubmitHandler = () => {
    if (!validateData()) return;

    setEmailInput('');
    setPasswordInput('');
    setConfirmPasswordInput('');
    setTouched({ email: false, password: false, confirmPassword: false });
    // dispatch(login({ email: emailInput, password: passwordInput }));
  };

  return (
    <View className='w-full h-auto flex-col justify-evenly items-center gap-6 pb-6'>
      <Text className='font-jetbrains-500 text-2xl'>Welcome</Text>
      <LoginInputField
        type='email'
        value={emailInput}
        onChange={(v) => {
          setEmailInput(v);
          setTouched((t) => ({ ...t, email: true }));
        }}
        error={touched.email ? errors.email : undefined}
      />
      <LoginInputField
        type='password'
        value={passwordInput}
        onChange={(v) => {
          setPasswordInput(v);
          setTouched((t) => ({ ...t, password: true }));
        }}
        error={touched.password ? errors.password : undefined}
      />
      <LoginInputField
        type='confirm-password'
        value={confirmPasswordInput}
        onChange={(v) => {
          setConfirmPasswordInput(v);
          setTouched((t) => ({ ...t, confirmPassword: true }));
        }}
        error={touched.confirmPassword ? errors.confirmPassword : undefined}
      />
      <View>
        <LoginButton title='Register' onPress={onSubmitHandler} />
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

export default RegisterForm;
