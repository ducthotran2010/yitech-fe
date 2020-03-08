import { useState } from 'react';

import { LoginForm } from '../login-form';
import { RegisterForm } from '../register-form';
import { Floater } from './floater';

export const ComplexRegistration = () => {
  const [registered, setRegistered] = useState(false);
  return (
    <div className="relative flex justify-center items-center">
      <div
        className="m-auto z-10 ease-out duration-500 transition-all"
        style={{ width: 400 }}
      >
        {registered ? (
          <div>
            <RegisterForm />
            <div className="md:hidden block mt-4 text-base text-center">
              Have an account?&nbsp;
              <a className="text-blue-500" onClick={() => setRegistered(false)}>
                Login
              </a>
            </div>
          </div>
        ) : (
          <div>
            <LoginForm />
            <div className="md:hidden block mt-4 text-base text-center">
              Don't have an account?&nbsp;
              <a className="text-blue-500" onClick={() => setRegistered(true)}>
                Register
              </a>
            </div>
          </div>
        )}
      </div>
      <Floater registered={registered} setRegistered={setRegistered} />
    </div>
  );
};
